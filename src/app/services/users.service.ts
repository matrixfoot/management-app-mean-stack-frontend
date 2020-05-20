import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    
    constructor(private http: HttpClient) { }
    private users: User[] = [
    
    ];
    public users$ = new Subject<User[]>();
    
    getAll() {
        this.http.get('http://localhost:3000/api/users').subscribe(
          (users: User[]) => {
            if (users) {
              this.users = users;
              this.emitusers();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitusers() {
        this.users$.next(this.users);
      }
   
    
      
    

    getById(userID: string) {
        return this.http.get<User[]>(`http://localhost:3000/api/user/`+ userID);
    }
    modifyById(userID: string, role:string) {
        return this.http.put<User>('http://localhost:3000/api/user/'+ userID , role);
    }
    deleteById(userID: string) {
        return this.http.get<User>('http://localhost:3000/api/user/'+ userID );
    }
}