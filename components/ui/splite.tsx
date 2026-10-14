'use client'

import React, { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (splineApp: any) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={onLoad}
      />
    </Suspense>
  )
}
