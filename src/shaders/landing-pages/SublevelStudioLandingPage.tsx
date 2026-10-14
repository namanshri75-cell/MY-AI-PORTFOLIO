import React from "react";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";

export function SublevelStudioLandingPage(props: LandingPageProps) {
  return (
    <LandingPageFrame
      {...props}
      title="sublevel.studio — We build the stuff people remember"
      sourceUrl="/landing-pages/sublevel-studio.html"
    />
  );
}

export default SublevelStudioLandingPage;
