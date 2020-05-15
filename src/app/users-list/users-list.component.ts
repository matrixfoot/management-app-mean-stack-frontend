import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UserslistComponent implements OnInit {

  public User: User[] = [];
  
  public loading: boolean;

  
  

  constructor(
              private UserService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    
    
    this.UserService.getAll();
    this.loading = false;
  }

  
    getNavigation(link, id){
      
        this.router.navigate([link + '/' + id]);
          
      }
  

}
