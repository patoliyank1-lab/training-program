export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "work" | "personal" | "shopping" | "health" | "other";
  isCompleted: boolean;
  isStarred: boolean;
  createdAt: string;
  completedAt: string | null;
  dueDate: string | null;
}

