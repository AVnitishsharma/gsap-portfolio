"use client";
import gsap, { ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

const TextReveal = forwardRef(
  (
    {
      children,
      className = "",
      trigger = "mount",
      scrollStart = "top 75%",
      scrollEnd = "top 25%",
      splitby = "chars",
      duration = 0.5,
      stagger = 0.06,
      delay = 0.2,
      ease = "power4.out",
    },
    ref,
  ) => {
    const wrapperRef = useRef(null)
    const splitTextRef = useRef(null)
    const tlRef = useRef(null)

    useImperativeHandle(ref, () => ({
      play: () => tlRef.current?.play(),
      reverse: () => tlRef.current?.reverse(),
      reset: () => tlRef.current?.pause(0),
    }), [tlRef])

    useGSAP(() => {
      
      splitTextRef.current = new SplitText(wrapperRef.current, {
        type: splitby,
        lineThreshold: 0.5,
      });
      const elements = splitTextRef.current[splitby];

      gsap.set(elements, {
        yPercent: 110,
      });

      tlRef.current = gsap.timeline({
        defaults:{
          ease: ease,
          duration: duration,
          
        },
        paused: true,
      });

      tlRef.current.to(elements,{
        yPercent: 0,
        opacity: 1,
        duration,
        splitby,
        ease,
        delay,
        stagger: {
          each: stagger,
          from: "start",
        }
      })

      if(trigger === "mount"){
        tlRef.current.play();
      }

      if(trigger === "scroll"){
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: scrollStart,
          end: scrollEnd,
          onEnter: () => tlRef.current.play(),
          onEnterBack: () => tlRef.current.play(),
          onLeave: () => tlRef.current.reverse(),
          onLeaveBack: () => tlRef.current.reverse(),
        });
      }

      return () => {
        tlRef.current.kill();
        splitTextRef.current?.revert();
      };

    },{
      scope: wrapperRef,
      dependencies: [trigger, scrollStart, duration, stagger]
    })

    return <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>;
  },
);

export default TextReveal;
