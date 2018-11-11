export interface CourseProgress {
    courseId: string;
    currentLesson: currentLessonProgress
}

interface currentLessonProgress {
    isFinished: boolean;
    lessonId: string;
    sectionId: string;
}