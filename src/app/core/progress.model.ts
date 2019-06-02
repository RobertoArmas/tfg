
export interface UserProgress {
    name: string;
    uid: string;
    progress: CourseProgress;
}
export interface CourseProgress {
  acknowledgedChunks: string[];
    courseId: string;
    currentLesson: currentLessonProgress;

    unlockedLessons: string[];
}

export interface currentLessonProgress {
    isFinished: boolean;
    lessonId: string;
    sectionId: string;
}