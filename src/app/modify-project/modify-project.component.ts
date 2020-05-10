import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../services/state.service';
import { ProjetService } from '../services/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { mimeType } from '../part-four/mime-type.validator';
import { Project } from '../models/Project.model';
@Component({
  selector: 'app-modify-project',
  templateUrl: './modify-project.component.html',
  styleUrls: ['./modify-project.component.scss']
})
export class ModifyProjectComponent implements OnInit {

  public projectForm: FormGroup;
  public project: Project;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private projetService: ProjetService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('form');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {
        this.projetService.getProjectById(params.id).then(
          (project: Project) => {
            this.project = project;
            this.projectForm = this.formBuilder.group({
              title: [project.title, Validators.required],
              chef: [project.chef, Validators.required],
              avancement: [project.avancement, Validators.required],
              blocage: [project.blocage, Validators.required],
              resteafaire: [project.resteafaire, Validators.required],
              pmo: [project.pmo, Validators.required],
              echeance: [project.echeance, Validators.required],
              pole: [project.pole, Validators.required],
              structure: [project.structure, Validators.required],
              file: [project.ficheUrl, Validators.required]
              
            });
            this.imagePreview = project.ficheUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const project = new Project();
    project._id = this.project._id;
    project.title = this.projectForm.get('title').value;
    project.chef = this.projectForm.get('chef').value;
    project.avancement = this.projectForm.get('avancement').value;
    project.blocage = this.projectForm.get('blocage').value;
    project.resteafaire = this.projectForm.get('resteafaire').value;
    project.pmo = this.projectForm.get('pmo').value;
    project.echeance = this.projectForm.get('echeance').value;
    project.pole = this.projectForm.get('pole').value;
    project.structure = this.projectForm.get('structure').value;
    project.ficheUrl = '';
    
    project.userId = this.userId;
    this.projetService.modifyProjectWithFile(this.project._id, project, this.projectForm.get('file').value).then(
      () => {
        this.projectForm.reset();
        this.loading = false;
        this.router.navigate(['/all-projet']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.projectForm.get('file').patchValue(file);
    this.projectForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.projectForm.get('file').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
