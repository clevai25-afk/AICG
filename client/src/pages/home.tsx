import { useState } from "react";
import { CourseSidebar } from "@/components/course-sidebar";
import { CourseContent } from "@/components/course-content";

export default function Home() {
  const [currentLessonId, setCurrentLessonId] = useState<number>();

  return (
    <div className="flex h-screen">
      <div className="w-80 border-r bg-muted/40">
        <CourseSidebar
          currentLessonId={currentLessonId}
          onSelectLesson={setCurrentLessonId}
        />
      </div>
      <div className="flex-1">
        <CourseContent lessonId={currentLessonId} />
      </div>
    </div>
  );
}
