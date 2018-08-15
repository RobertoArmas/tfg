import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CourseData } from '../course-viewer/course.model';

@Injectable()
export class FirebaseApiService {

  constructor(private afs: AngularFirestore) { }

  getCourseInformation(id: string): Observable<CourseData> {
    return this.afs.collection('courses').doc<CourseData>(id).valueChanges();
  }


}
