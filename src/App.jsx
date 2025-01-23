import { useRef, useState, useEffect } from "react";
import Canvas from "./Canvas";
import data from "./data";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";

function App() {
  gsap.registerPlugin(useGSAP);
  const cursor = useRef(null);
  const body = useRef(null);
  const backGroundColor = useRef(null);

  const [showAnimation, setShowAnimation] = useState(false);
  const handleMouseMove = (e) => {
    gsap.to(cursor.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
    });
  };

  const changeColor = (e) => {
    // Set the initial positioning of the element to be in the center of the page
    gsap.set(backGroundColor.current, {
      top: e.clientY,
      left: e.clientX,
    });

    // Hide scrollbars while animation occurs
    gsap.set(body.current, {
      overflow: "hidden",
    });

    // Animation to scale and change background color
    gsap.to(backGroundColor.current, {
      scale: 1000,
      backgroundColor: "#FD2C2A",
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(backGroundColor.current, {
          scale: 0,
        });

        gsap.set(body.current, {
          backgroundColor: "#FD2C2A",
          duration: 1,
        });

        gsap.set(cursor.current, {
          backgroundColor: "white",
          duration: 1,
        });
      },
    });
  };

  useEffect(() => {
    const currentBody = body.current;
    if (currentBody) {
      currentBody.addEventListener("mousemove", handleMouseMove);
      return () => {
        currentBody.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <>
      <div
        className="bg-red-500 h-10 w-10 rounded-full absolute"
        ref={backGroundColor}
        style={{ top: -100, left: -100 }}
      ></div>

      <div
        className="bg-red-500 h-5 w-5 rounded-full fixed z-40"
        ref={cursor}
      ></div>

      <div
        className="relative"
        ref={body}
        onClick={(e) => {
          setShowAnimation(true);
          changeColor(e);
        }}
      >
        <Navbar />
        <div>
          <div className="w-full relative min-h-[70vh]">
            <div className="w-[25%] text-4xl absolute top-32 left-96 z-10 ">
              At Thirtysixstudio, we build immersive digital experiences for
              brands with a purpose.
            </div>
            <div className="w-[25%] absolute top-80 left-96 z-10">
              We’re a boutique production studio focused on design, motion, and
              creative technology, constantly reimagining what digital craft can
              do for present-time ads and campaigns.
            </div>

            {!showAnimation && (
              <div className="text-6xl w-[30%] text-center font-semibold absolute top-40 right-40">
                Click Anywhere to Animate
              </div>
            )}

            {showAnimation &&
              data[0].map((canvasdets, index) => (
                <Canvas key={index} details={canvasdets} />
              ))}
          </div>

          <div className="w-full relative">
            <div className="text-[1450%] text-center z-10 ml-2">
              Thirtysixstudio
            </div>
            {showAnimation &&
              data[1].map((canvasdets, index) => (
                <Canvas key={index} details={canvasdets} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
