"use client";
import Navbar from "@/components/LandingNavbar";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

const Home = () => {
  const ref = useRef();

  useGSAP(() => {
    gsap.registerPlugin("scrollTrigger");
    const tl = gsap.timeline();

    tl.from(".animate", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out", 
    });

    tl.from(".hero-container", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".hero-container",
        scroller: "#main",
        markers: true,
        scale: 10,
      },
    });

    tl.from(".navanimate", {
      y: -50,
      opacity: 0,
      duration: 0.5,
    });
  }, []); 
  return (
    <>
      <div id="main" className="w-full">
        <div className="relative h-full w-full bg-[#F9F7F7]">
          <Navbar />
          <div
            ref={ref}
            className="animate heading w-full flex items-center justify-center p-12 md:pt-32 flex-col gap-4 z-10 relative"
          >
            <h1 className="font-bold text-7xl hero-heading">
              Build A Landing Page In Minutes
            </h1>
            <h4 className="font-mono text-lg">
              Create a website in just minutes. Unique, simple, and friendly.
              It's that easy.
            </h4>
            <Link href={"/Login"}>
              <button type="button" className="get-started-btn">
                <strong>CREATE NOW</strong>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </button>
            </Link>
          </div>

          <div className="absolute inset-0 bg-grid bg-size-14 bg-gradient z-0 pointer-events-none">
            {/* Additional content can go here if needed */}
          </div>

          <div
            ref={ref}
            className="hero-container relative  w-full flex justify-center"
          >
            <Image src={"/assets/builder-ss.png"} width={1200} height={50} />
          </div>
        </div>

        <div className="spaccer w-full h-[50vh] bg-black"></div>
      </div>
    </>
  );
};

export default Home;
