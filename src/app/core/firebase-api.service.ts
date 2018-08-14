import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CourseData } from '../course-viewer/course.model';

@Injectable()
export class FirebaseApiService {

  constructor(private afs: AngularFirestore) { }

  getCourseData(id: string): Observable<any> {
    return this.afs.collection('courses').snapshotChanges();
    // return this.afs.doc('courses/0').valueChanges();
  }
}
