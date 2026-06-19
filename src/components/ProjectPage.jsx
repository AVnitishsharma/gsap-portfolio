"use client";
import { useRef, useState } from "react";
import TextReveal from "./TextReveal";
import gsap, { ScrollTrigger, useGSAP } from "@/lib/gsap";
import useViewTransition from "@/hook/useViewTrasiction";

const ProjectPage = ({ project, nextProject, prevProject }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [showCursorNext, setShowCursorNext] = useState(false);
  const [showCursorPrev, setShowCursorPrev] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section");

      gsap.to(imageRef.current, {
        clipPath: "inset(0 0 0% 0)",
        scale: 1,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.7,
      });

      sections.forEach((section, idx) => {
        const container = section.children[0];

        gsap.to(container, {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        if (idx === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
    },
    { scope: containerRef },
  );

  const { navigateTo } = useViewTransition();

  const handleClickNext = () => {
    navigateTo(`/project/${nextProject.slug}`);
  };
  const handleClickPrev = () => {
    navigateTo(`/project/${prevProject.slug}`);
  };

  return (
    <>
      <main ref={containerRef}>
        <section className="h-screen  w-full  ">
          <div className="sectionContainer  h-full w-full flex pt-[7rem] pb-[4rem] px-[3rem] ">
            <div className="firstSegment h-full w-[10%] ">
              <TextReveal>
                <h3 className="text-[2rem]">{project.number}</h3>
              </TextReveal>
            </div>
            <div className="secondSegment h-[85%] w-[30%] ">
              <div className="imageDiv overflow-hidden h-full w-full ">
                <img
                  ref={imageRef}
                  style={{
                    clipPath: "inset(0 0 100% 0)",
                  }}
                  className="h-full scale-[1.7] w-full object-cover"
                  src={project.coverImage}
                  alt=""
                />
              </div>
            </div>
            <div className="thirdSegment pl-[8rem] h-[85%] w-[60%] flex flex-col justify-end ">
              <div className="heading">
                <TextReveal delay="0.8" ease="power4.out" splitBy="chars">
                  <h1 className="text-[5rem] leading-[1.1] ">
                    {project.title}
                  </h1>
                </TextReveal>
              </div>
              <div className="subHeading flex gap-[3rem]">
                <TextReveal delay="0.85" splitBy="words">
                  <h1 className="text-[2rem]">{project.category}</h1>
                </TextReveal>
                <TextReveal delay="0.85" splitBy="chars">
                  <h1 className="text-[2rem]">{project.year}</h1>
                </TextReveal>
              </div>
              <div className="description mt-[2rem] w-[70%] text-balance">
                <TextReveal delay="0.85" splitBy="words">
                  <p className="text-[1.5rem] leading-[1.2] ">
                    {project.description}
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </section>
        {project.gallery.map((elem, idx) => {
          return (
            <section key={idx} className="h-screen w-full">
              <div
                style={{ transformOrigin: "bottom left" }}
                className="sectionContainer rotate-[30deg] h-full w-full "
              >
                <img className="h-full w-full object-cover" src={elem} alt="" />
              </div>
            </section>
          );
        })}

        <footer className="h-screen flex items-center justify-center gap-[3rem] w-full ">
          <div
            className="relative inline-block w-[45%] overflow-hidden"
            onMouseEnter={() => setShowCursorPrev(true)}
            onMouseLeave={() => setShowCursorPrev(false)}
            onMouseMove={(e) =>
              setPosition({
                x: e.clientX,
                y: e.clientY,
              })
            }
          >
            <h1 className="mb-2.5 text-center text-3xl">{prevProject.title}</h1>
            <img
              className="cursor-none hover:scale-105 transition-all duration-500"
              src={prevProject.coverImage}
              alt={prevProject.title}
              onClick={handleClickPrev}
            />
            {showCursorPrev && (
              <div
                className="fixed pointer-events-none p-[0.5rem] z-50 w-auto flex items-center justify-center rounded bg-white text-sm font-semibold text-black"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                Prev Project
              </div>
            )}
          </div>
          <div 
            className="relative inline-block w-[45%] overflow-hidden"
            onMouseEnter={() => setShowCursorNext(true)}
            onMouseLeave={() => setShowCursorNext(false)}
            onMouseMove={(e) =>
              setPosition({
                x: e.clientX,
                y: e.clientY,
              })
            }
          >
            <h1 className="mb-2.5 text-center text-3xl" >{nextProject.title}</h1>
            <img
              className="cursor-none hover:scale-105 transition-all duration-500"
              src={nextProject.coverImage}
              alt={nextProject.title}
              onClick={handleClickNext}
            />
            {showCursorNext && (
              <div
                className="fixed pointer-events-none z-50 p-[0.5rem] w-auto flex items-center justify-center rounded bg-white text-sm font-semibold text-black"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                Next Project
              </div>
            )}
          </div>
        </footer>
      </main>
    </>
  );
};

export default ProjectPage;
