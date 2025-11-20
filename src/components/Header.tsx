import { FaReact, FaVuejs, FaNodeJs } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import faceImg from "../assets/face.png";
import EncryptText from "./EncryptText";

export default function Header() {
  return (
    <>
      <div className="relative p-[3px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:blur-xl before:opacity-70 before:-z-10 mt-20 mb-10">
        <Avatar className="w-[200px] h-[200px]">
          <AvatarImage src={faceImg} />
          <AvatarFallback>FACE</AvatarFallback>
        </Avatar>
      </div>

      <EncryptText
        text="Hi, I'm Sathesh"
        revealedClassName="font-retro text-blue-500 text-5xl"
        encryptedClassName="font-retro text-blue-500 text-5xl"
      />

      <div className="max-w-6xl">

        <p className="text-xl mt-8 text-center text-gray-400">
          I'm a full-stack software engineer specializing in web development,
          with skills in
          <span className="mx-2 badge badge-soft badge-primary">
            <FaReact />
            React.js
          </span>
          ,
          <span className="mx-2 badge badge-soft badge-success">
            <FaVuejs />
            Vue.js
          </span>
          and
          <span className="mx-2 badge badge-soft badge-error">
            <FaNodeJs />
            Node.js
          </span>
          . I also leverage
          <span className="text-white mx-1">Tailwind CSS</span>,
          <span className="text-white mx-1">Express</span>,
          <span className="text-white mx-1">Sequelize</span>, and
          <span className="text-white mx-1">MySQL</span> to create fully
          responsive, high-performance applications that provide seamless user
          experiences.
        </p>
      </div>

      {/*Idk what the fuck this does to mess up the width of the screen, but when i move it to one div, the screen cuts by half a width, fuck shadcn*/}
      <div>
        <p className="text-xl mt-10 text-center text-gray-400">
          Coming from an enginering background, I am passionate about creating
          and building projects, from front-end -centred UI design to
          scalable-and-efficient backend structure design and development. I am
          also a person who likes to likes to get their hands wet in many
          different things, and so I've found myself doing side-projects which
          range from game-design to dating apps and Arduino automation! 😅🤣
        </p>

        <p className="text-xl mt-10 text-center text-gray-400">Other than coding, I also enjoy playing videogames (FROMSOFTWARE games are my absolute favourite) , painting, sketching and playing music. I also collect mechanical watches! </p>
      </div>
    </>
  );
}
