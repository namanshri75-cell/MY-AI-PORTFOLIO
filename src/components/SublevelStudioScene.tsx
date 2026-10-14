import React from "react";
import { SublevelStudioLandingPage } from "@/src/shaders/landing-pages/SublevelStudioLandingPage";
import "@/src/shaders/threeui.css";

export { SublevelStudioLandingPage };

export function Scene() {
  return (
    <div className="shader-frame w-full h-full min-h-[500px] relative overflow-hidden bg-[#080808]">
      <SublevelStudioLandingPage />
    </div>
  );
}

export default Scene;
