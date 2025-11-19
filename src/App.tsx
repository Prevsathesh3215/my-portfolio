import MyParticles from "./components/MyParticles";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import Game from "./components/Game";
import { projectData, workExperience } from "./configData";
import Timeline9 from "./components/timeline9";
import ContactPage from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen text-white bg-black">
      <MyParticles />

      <div className="relative z-10">
        <NavBar />
        <main className="flex flex-col items-center px-6 space-y-16">
          <section id="about" className="flex flex-col items-center mt-20">
            <Header />
          </section>

          <div className="w-full mt-16 ml-10">
            <section id="work">
              <Timeline9 data={workExperience} />
            </section>
            {/* <ProjectList data={workExperience} /> */}
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
