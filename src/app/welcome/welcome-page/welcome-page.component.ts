import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CourseData } from '../../course-viewer/course.model';
import { CourseDataService } from '../../core/course-data.service';
import { XapiService } from '../../core/xapi/xapi.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { ProgressService } from 'src/app/core/progress.service';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnChanges {

  course: CourseData;

  courses: CourseData[];
  userIsLoggedIn = false;
  profilePicture$: string;

  constructor(
    private xapi: XapiService,
    private courseDataService: CourseDataService,
    private fbsAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getCourseInformation();
    this.getCoursesData();
    this.checkUserLoggedIn();

    this.fbsAuth.auth.onAuthStateChanged(user => {
      this.checkUserLoggedIn();
      this.sendStartStatement(this.courseDataService.courseId);
      this.profilePicture$ = user.photoURL;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkUserLoggedIn();
  }
  getCoursesData() {
    this.courseDataService
      .getCoursesData()
      .subscribe(
        (courses) => {
          this.courses = courses;
          this.courses.forEach(course => {
            const lessons = [];
            this.courseDataService.getCourseNumberOfLessons(course.id)
              .subscribe(
                numberOfLessons => {
                  lessons.push(numberOfLessons);
                  course.NumberOfLessons = lessons.length;
                }
              );
          });
        }
      );
  }
  getCourseInformation() {
    this.courseDataService
      .getCourseInformation()
      .subscribe(
        (course) => {
          this.course = course;
        }
      );
  }

  sendStartStatement(courseId: string) {
    if (courseId != null) {
      this.courseDataService.courseId = courseId;
      this.getCourseInformation();
      this.isLoggedIn().subscribe(
        user => {
          if (user) {
              console.log(user);
              this.xapi.launchLrsConnection(user.displayName, user.email);
              this.xapi.started(this.course);
            } else {
              console.log('No había usuario');
            }
        }
      );
    }
  }


  getCourseNumberOfLessons(courseId) {
    const NumberOfLessonsSubscription = this.courseDataService.getCourseNumberOfLessons(courseId)
      .subscribe(
        numberOfLessons => {
          return numberOfLessons.length;
        }
      );
  }


  isLoggedIn() {
    return this.fbsAuth.authState.pipe(first());
 }

 login() {
  this.fbsAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
 }

  checkUserLoggedIn() {
    this.isLoggedIn().subscribe(
      user => {
        if (user) {
            this.userIsLoggedIn = true;
          } else {
            this.userIsLoggedIn = false;
          }
      }
    );
  }

  logout() {
    this.fbsAuth.auth.signOut();
  }
}
