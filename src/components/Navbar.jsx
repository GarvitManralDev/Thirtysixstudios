import React, { useEffect, useRef } from "react";

function Navbar() {
  return (
    <>
      <div className="flex justify-between p-3 border-b-2 border-black pb-3 font-normal">
        <div className="cursor-pointer">Thirtysixstudio</div>
        <div className="flex gap-6 mr-20 ">
          <div className="cursor-pointer">What we do </div>
          <div className="cursor-pointer">Who we are </div>
          <div className="cursor-pointer">How we give back</div>
          <div className="cursor-pointer">Talk to us</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
