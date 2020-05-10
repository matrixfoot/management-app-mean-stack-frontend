import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../services/state.service';
import { ProjetService } from '../services/projet.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/Project.model';
import { mimeType } from '../part-four/mime-type.validator';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  public projectForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  
  public imagePreview: string;
  public errorMessage: string;
  fileUploaded = false; 

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private projetService: ProjetService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.projectForm = this.formBuilder.group({
      title: [null, Validators.required],
      chef: [null, Validators.required],
      avancement: [null, Validators.required],
      blocage: [null, Validators.required],
      resteafaire: [null, Validators.required],
      pmo: [null, Validators.required],
      echeance: [null, Validators.required],
      pole: [null, Validators.required],
      structure: [null, Validators.required],
      ficheUrlexterne: [null, Validators.required],
      file: [null]
    });
    this.userId = this.auth.userId;
    
  }

  onSubmit() {
    this.loading = true;
    const project = new Project();
    project.title = this.projectForm.get('title').value;
    project.chef = this.projectForm.get('chef').value;
    project.avancement = this.projectForm.get('avancement').value;
    project.blocage = this.projectForm.get('blocage').value;
    project.resteafaire = this.projectForm.get('resteafaire').value;
    project.pmo = this.projectForm.get('pmo').value;
    project.echeance = this.projectForm.get('echeance').value;
    project.pole = this.projectForm.get('pole').value;
    project.structure = this.projectForm.get('structure').value;
    project.ficheUrlexterne = this.projectForm.get('ficheUrlexterne').value;
    project.ficheUrl = '';
    project.userId = this.userId;
    this.projetService.createNewProjectWithFile(project, this.projectForm.get('file').value).then(
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
    this.projectForm.get('file').patchValue(file);
    this.projectForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.projectForm.get('file').valid) {
        this.imagePreview = reader.result as string;
        this.fileUploaded = true;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
    
  }
}
