export interface Project {
  id: number;
  title: string;
  description?: string;
  tasks: [];
}

export interface ProjectCreateDto {
  title: string;
  description?: string;
}

export interface ProjectUpdateDto {
  title: string;
  description?: string;
}
