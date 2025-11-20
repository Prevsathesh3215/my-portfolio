import MyParticles from "./components/MyParticles";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import Game from "./components/Game";
import { projectData, workExperience } from "./configData";
import Work from "./components/Work";
import ContactPage from "./components/Contact";
import { motion } from "framer-motion";

import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="relative min-h-screen text-white bg-black">
      <MyParticles />
      <Toaster richColors position="top-center" />

      <div className="relative z-10">
        <NavBar />
        <main className="flex flex-col items-center px-6 space-y-16">
          <section id="about">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 30,
                delay: 0.2,
              }}
              className="flex flex-col items-center mt-20"
            >
              <Header />
            </motion.div>
          </section>

          <div className="w-full mt-16 ml-10">
            <section id="work">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                <Work data={workExperience} />
              </motion.div>
            </section>

            <section id="projects">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                <ProjectList data={projectData} />
              </motion.div>
            </section>

            <Game />

            <section id="contact">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                <ContactPage />
              </motion.div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
