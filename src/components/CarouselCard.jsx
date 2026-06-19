import gsap from "@/lib/gsap";
import TextReveal from "./TextReveal";
import { useRef } from "react";
import useViewTransition from "@/hook/useViewTrasiction";

const CARD_W = 250;
const CARD_H = 350;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const onEnter = () => {
    gsap.killTweensOf(cardRef.current);
    gsap.killTweensOf(imgRef.current);

    onHoverStart?.();

    gsap.to(cardRef.current, {
      scale: 1.45,
      duration: 0.4,
      ease: "power3.out",
      zIndex: 100,
    });

    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.42,
      ease: "power3.out",
    });

    numberRef.current?.play();
    titleRef.current?.play();
  };

  const onLeave = () => {
    gsap.killTweensOf(cardRef.current);
    gsap.killTweensOf(imgRef.current);

    onHoverEnd?.();

    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.17,
      ease: "power3.out",
      zIndex: 2,
    });

    gsap.to(imgRef.current, {
      scale: 1.35,
      duration: 0.19,
      ease: "power3.out",
    });

    numberRef.current?.reverse();
    titleRef.current?.reverse();
  };

  const { navigateTo } = useViewTransition();

  const handleClick = () => {
    navigateTo(`/project/${project.slug}`);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        overflow: "visible",
        cursor: "pointer",
      }}
      className="relative bg-red-300 border border-white"
    >
      {/* Title Panel */}

      <div
        style={{ bottom: "calc(100% + 1rem)" }}
        className="titlePanel absolute left-0 pointer-events-none flex flex-col "
      >
        <TextReveal
          ref={numberRef}
          duration="0.25"
          trigger="manual"
          splitBy="chars"
        >
          <h3 className="text-[1.2rem]">{project.number}</h3>
        </TextReveal>
        <TextReveal
          ref={titleRef}
          duration="0.15"
          trigger="manual"
          splitBy="words"
        >
          <h3 className="text-[1.2rem]">{project.title}</h3>
        </TextReveal>
      </div>

      <div className="imageDiv absolute h-full w-full overflow-hidden ">
        <img
          style={{ transformOrigin: "center center", userSelect: "none" }}
          className="h-full scale-[1.6] w-full  object-cover "
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
        />
      </div>
    </div>
  );
};

export default CarouselCard;