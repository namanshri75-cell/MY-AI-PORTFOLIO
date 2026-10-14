'use client'

import React from 'react'
import { SplineSceneBasic } from "@/components/ui/demo"

export { SplineSceneBasic }

export default function Demo() {
  return (
    <div className="min-h-screen w-full bg-[#06080d] flex items-center justify-center p-4">
      <SplineSceneBasic className="w-full max-w-5xl h-[600px]" />
    </div>
  )
}
