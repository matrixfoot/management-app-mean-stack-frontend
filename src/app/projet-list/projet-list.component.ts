import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ProjetService } from '../services/projet.service';
import { Subscription } from 'rxjs';
import { Project } from '../models/Project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.scss']
})
export class ProjetListComponent implements OnInit, OnDestroy {

  public projet: Project[] = [];
  public part: number;
  public loading: boolean;

  private projetSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
              private projetService: ProjetService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.projetSub = this.projetService.projet$.subscribe(
      (projet) => {
        this.projet = projet;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.projetService.getProjet();
  }

  
    getNavigation(link, id){
      
        this.router.navigate([link + '/' + id]);
          
      }
  ngOnDestroy() {
    this.projetSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
