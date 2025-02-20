import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type Lesson } from "@shared/schema";
import { MessageInput } from "./message-input";

interface CourseContentProps {
  lessonId?: number;
}

export function CourseContent({ lessonId }: CourseContentProps) {
  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: ['/api/lessons', lessonId],
    enabled: !!lessonId
  });

  if (!lessonId) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select a lesson to begin</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!lesson) {
    return <div className="p-4">Lesson not found</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
            <div className="prose max-w-none">
              {lesson.content}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-4 border-t">
        <MessageInput />
      </div>
    </div>
  );
}
