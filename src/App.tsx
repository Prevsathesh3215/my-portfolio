import MyParticles from "./components/MyParticles";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import Game from "./components/Game";
import { projectData, workExperience } from "./configData";
import Work from "./components/Work";
import ContactPage from "./components/Contact";

import { Toaster } from "sonner"; 

export default function App() {
  return (
    <div className="relative min-h-screen text-white bg-black">
      <MyParticles />
      <Toaster richColors position="top-center" />

      <div className="relative z-10">
        <NavBar />
        <main className="flex flex-col items-center px-6 space-y-16">
          <section id="about" className="flex flex-col items-center mt-20">
            <Header />
          </section>

          <div className="w-full mt-16 ml-10">
            <section id="work">
              <Work data={workExperience} />
            </section>

            <section id="projects">
              <ProjectList data={projectData} />
            </section>

            <Game />

            <section id="contact">
              <ContactPage />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
