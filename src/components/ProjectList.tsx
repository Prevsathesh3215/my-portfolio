import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { ProjectListProps } from "@/types";

export default function ProjectList({ data }: ProjectListProps) {
  {
    /* Yes, if you're wondering, i did write this shit myself hahaha */
  }

  return (
    <>
      <div className="flex justify-left">
        <h3 className="text-3xl text-blue-500 font-retro">{data.headTitle}</h3>
      </div>

      {data.items.map((project, index) => (
        <Card
          key={index}
          className="bg-gray-900 text-white border-gray-700 my-10 mr-10 bg-gradient-to-r from-sky-950 to-purple-900 before:content-[''] before:inset-0 before:bg-gradient-to-r before:from-sky-950 before:to-purple-900 before:blur-xl before:opacity-70 before:-z"
        >
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.period}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="list-disc pl-5">
              {project.desc.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </CardContent>

          {project.skills && (
            <CardFooter className="flex justify-between">
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <Badge key={idx} className="text-md px-4">
                    {skill}
                  </Badge>
                ))}
              </div>

              {project.projLink && (
                <Button onClick={() => window.open(project.projLink, "_blank")}>
                  <FaGithub />
                  View on Github
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </>
  );
}
