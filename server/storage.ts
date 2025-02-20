import { courses, lessons, type Course, type Lesson, type InsertCourse, type InsertLesson } from "@shared/schema";

export interface IStorage {
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getLessons(courseId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
}

export class MemStorage implements IStorage {
  private courses: Map<number, Course>;
  private lessons: Map<number, Lesson>;
  private currentCourseId: number;
  private currentLessonId: number;

  constructor() {
    this.courses = new Map();
    this.lessons = new Map();
    this.currentCourseId = 1;
    this.currentLessonId = 1;

    // Add sample data
    const course: Course = {
      id: this.currentCourseId++,
      title: "Getting Started",
      description: "Learn the basics of our platform"
    };
    this.courses.set(course.id, course);

    const sampleLessons: InsertLesson[] = [
      { courseId: course.id, title: "Course Overview", content: "Welcome to the course!", order: 1 },
      { courseId: course.id, title: "Step 1: Understand what APIs are and why they are useful", content: "APIs are...", order: 2 },
      { courseId: course.id, title: "API for Beginners - What is an API?", content: "Let's learn about APIs", order: 3 },
      { courseId: course.id, title: "APIs Explained in Plain English", content: "APIs simplified", order: 4 },
      { courseId: course.id, title: "Google Apps Script Tutorial - [1] Intro & Setup", content: "Getting started with Apps Script", order: 5 },
      { courseId: course.id, title: "Google Apps Script Crash Course", content: "Quick overview", order: 6 },
      { courseId: course.id, title: "Practice Exercise 1", content: "Try it yourself", order: 7 }
    ];

    for (const lessonData of sampleLessons) {
      const lesson: Lesson = { ...lessonData, id: this.currentLessonId++ };
      this.lessons.set(lesson.id, lesson);
    }
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getLessons(courseId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }
}

export const storage = new MemStorage();
