import { FaCode, FaReact } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";

export default function NavBar() {
  return (
    <>
      <nav className="top-0 left-0 justify-between flex flex-row w-full">
        <div className="ml-3 mt-3 flex flex-row align-center">
          <FaCode size="50" />
          <p className="text-xl font-retro mt-3 ml-4 text-blue-500">
            Sathesh.dev
          </p>
          <p className="text-muted-foreground text-sm mt-1 ml-5 flex items-center gap-1">
            Written with <FaReact />
          </p>
          {/* <EncryptText
            text="Sathesh.dev"
            revealedClassName="font-retro mt-3 ml-4 text-blue-500"
            encryptedClassName="font-retro mt-3 ml-4 text-blue-500"
          /> */}
        </div>

        {/**Welp, I first deployed here, 0210 hrs, 15/11/2025. Gg need to work on this tho */}
        <div className="flex justify-right mx-2 gap-2 mt-2">
          <Button onClick={() => window.open("https://github.com/Prevsathesh3215/my-portfolio", "_blank")}>
            {" "}
            <FaGithub />
            View the code
          </Button>
          <Button>About</Button>
          <Button>Projects</Button>
          <Button>Contact</Button>
        </div>
      </nav>
    </>
  );
}
