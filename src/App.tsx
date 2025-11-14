// npm run deploy to deploy new versions
import MyParticles from "./components/MyParticles";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import Game from "./components/Game";
import { projectData, workExperience } from "./configData";

export default function App() {
  return (
    <div className="relative min-h-screen text-white bg-black">
      <MyParticles />

      <div className="relative z-10">
        <NavBar />
        <main className="flex flex-col items-center px-6 space-y-16">
          <div className="flex flex-col items-center mt-20">
            <Header />
          </div>

          <div className="w-full mt-16 ml-10">
            <ProjectList data={workExperience} />
            <ProjectList data={projectData} />
            <Game />
          </div>
        </main>
      </div>
    </div>
  );
}
