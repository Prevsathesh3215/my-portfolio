import { FaCode, FaReact } from "react-icons/fa";
import { Button } from "./ui/button";
import EncryptText from "./EncryptText";

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

        <div className="flex justify-right mx-2 gap-2 mt-2">
          <Button>About</Button>
          <Button>Projects</Button>
          <Button>Contact</Button>
        </div>
      </nav>
    </>
  );
}
