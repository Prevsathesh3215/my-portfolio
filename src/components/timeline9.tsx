import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectListProps } from "@/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FaGithub } from "react-icons/fa";
import EncryptText from "./EncryptText";


export default function Timeline9({ data }: ProjectListProps) {
  return (
    <section>
      <div>
        {/* <h1 className="font-retro text-blue-500 text-3xl">{data.headTitle}</h1> */}

        <div className="flex justify-start">
          <EncryptText
            text={data.headTitle}
            revealedClassName="text-3xl text-blue-500 font-retro"
            encryptedClassName="text-3xl text-blue-500 font-retro"
          />
        </div>

        <div className="relative mt-10 mr-10">
          {/* Vertical Line */}
          <Separator
            orientation="vertical"
            className="absolute top-0 h-full bg-white opacity-70"
          />

          {data.items.map((project, index) => (
            <div key={index} className="flex items-start gap-6 mb-16">
              {/* Timeline Dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full bg-blue-400 border-2 border-white 
                  shadow-[0_0_15px_4px_rgba(0,150,255,0.8)]
                  absolute"
                ></div>
              </div>

              {/* Card */}
              <Card className="flex-1 bg-gray-900 text-white border-gray-700 bg-gradient-to-r from-blue-950 to-yellow-700 relative">
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
                      <Button
                        onClick={() => window.open(project.projLink, "_blank")}
                      >
                        <FaGithub className="mr-2" />
                        View on Github
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
