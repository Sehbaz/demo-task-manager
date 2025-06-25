export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: number;
}

export interface TaskCreateDto {
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: number;
}
