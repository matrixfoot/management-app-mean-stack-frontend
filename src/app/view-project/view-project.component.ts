import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from '../models/Project.model';
import { ProjetService } from '../services/projet.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  public project: Project;
  public loading: boolean;
  public userId: string;
  public part: number;

  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private projetService: ProjetService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('new-project');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.projetService.getProjectById(params.id).then(
          (project: Project) => {
            this.loading = false;
            this.project = project;
          }
        );
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
        if (part >= 3) {
          this.userId = this.auth.userId;
        }
      }
    );
  }

  onGoBack() {
   
      this.router.navigate(['/all-projet']);
    
  }

  getNavigation(link, id){
      
    this.router.navigate([link + '/' + this.project._id]);
      
  }

  onDelete() {
    this.loading = true;
    this.projetService.deleteProject(this.project._id).then(
      () => {
        this.loading = false;
        
        this.router.navigate(['/all-projet']);
         
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }

}
