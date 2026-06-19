"use client";

import useLenis from "@/hook/useLenis";

const SmoothScroll = ({children}) => {
  useLenis();
  return (
    <>{children}</>
  )
}

export default SmoothScroll