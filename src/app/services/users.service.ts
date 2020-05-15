import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('http://localhost:3000/api/auth/users');
    }

    getById(userID: string) {
        return this.http.get<User>(`http://localhost:3000/api/auth/user/`+ userID);
    }
    modifyById(userID: string, role:string) {
        return this.http.put<User>('http://localhost:3000/api/auth/user/'+ userID , role);
    }
    deleteById(userID: string) {
        return this.http.get<User>('http://localhost:3000/api/auth/user/'+ userID );
    }
}