import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../models/Project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) {}

  private projet: Project[] = [
    
  ];
  public projet$ = new Subject<Project[]>();

  getProjet() {
    this.http.get('http://localhost:3000/api/projet').subscribe(
      (projet: Project[]) => {
        if (projet) {
          this.projet = projet;
          this.emitProjet();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitProjet() {
    this.projet$.next(this.projet);
  }

  getProjectById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/projet/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  

  createNewProjectWithFile(project: Project, file: File) {
    return new Promise((resolve, reject) => {
      const projectData = new FormData();
      projectData.append('project', JSON.stringify(project));
      projectData.append('file', file, project.title);
      this.http.post('http://localhost:3000/api/projet', projectData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

 

  modifyProjectWithFile(id: string, project: Project, file: File | string) {
    return new Promise((resolve, reject) => {
      let projectData: Project | FormData;
      if (typeof file === 'string') {
        project.ficheUrl = file;
        projectData = project;
      } else {
        projectData = new FormData();
        projectData.append('project', JSON.stringify(project));
        projectData.append('file', file, project.title);
      }
      this.http.put('http://localhost:3000/api/projet/' + id, projectData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteProject(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/projet/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
