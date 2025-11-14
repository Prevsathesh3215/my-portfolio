interface Project {
  title: React.ReactNode;
  period: string;
  desc: string[];
  skills?: string[];
  projLink?: string;
}

export interface ProjectsData {
  headTitle: string;    // top-level heading
  items: Project[]; // array of groups
}

export interface ProjectListProps {
  data: ProjectsData
}