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
import EncryptText from "./EncryptText";

export default function ProjectList({ data }: ProjectListProps) {
  {
    /* Yes, if you're wondering, i did write this shit myself hahaha. GG this component was damn fun to build */
  }

  return (
    <>
      <div className="flex justify-start">
        <EncryptText text={data.headTitle} revealedClassName="text-3xl text-blue-500 font-retro" encryptedClassName="text-3xl text-blue-500 font-retro" />
      </div>

      {data.items.map((project, index) => (
        <Card
          key={index}
          className="bg-gray-900 text-white border-gray-700 mb-10 mr-10 bg-gradient-to-r from-yellow-950 to-blue-900 before:content-[''] before:inset-0 before:bg-gradient-to-r before:from-sky-950 before:to-purple-900 before:blur-xl before:opacity-70 before:-z"
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
