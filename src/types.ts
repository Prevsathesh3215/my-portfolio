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

{/**ProjectListProps -> ProjectsData -> Project. 1st checks for data only, 2nd checks for headTitle and items types, and third checks for item obj types. Good shit */}