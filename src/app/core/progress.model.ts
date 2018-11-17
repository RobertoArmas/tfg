
export interface UserProgress {
    name: string;
    uid: string;
    progress: CourseProgress;
}
export interface CourseProgress {
    courseId: string;
    currentLesson: currentLessonProgress
}

export interface currentLessonProgress {
    isFinished: boolean;
    lessonId: string;
    sectionId: string;
}