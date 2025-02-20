import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { type Course, type Lesson } from "@shared/schema";

interface CourseSidebarProps {
  currentLessonId?: number;
  onSelectLesson: (lessonId: number) => void;
}

export function CourseSidebar({ currentLessonId, onSelectLesson }: CourseSidebarProps) {
  const { data: courses } = useQuery<Course[]>({ 
    queryKey: ['/api/courses']
  });

  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: ['/api/courses/1/lessons'],
    enabled: !!courses?.length
  });

  if (!courses || !lessons) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <ScrollArea className="h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Getting Started</h2>
        <Accordion type="single" defaultValue="course-1" className="w-full">
          {courses.map((course) => (
            <AccordionItem key={course.id} value={`course-${course.id}`}>
              <AccordionTrigger className="text-sm hover:no-underline">
                <span className="text-left">{course.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-1">
                  {lessons
                    .filter((lesson) => lesson.courseId === course.id)
                    .map((lesson) => (
                      <Button
                        key={lesson.id}
                        variant="ghost"
                        className={cn(
                          "justify-start pl-6 text-sm font-normal",
                          currentLessonId === lesson.id && "bg-muted"
                        )}
                        onClick={() => onSelectLesson(lesson.id)}
                      >
                        <ChevronRight className="mr-2 h-4 w-4" />
                        {lesson.title}
                      </Button>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
}
