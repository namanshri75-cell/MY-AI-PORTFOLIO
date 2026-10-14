'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

export interface SplineSceneBasicProps {
  className?: string
  scene?: string
}

export function SplineSceneBasic({
  className = "w-full h-[500px]",
  scene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
}: SplineSceneBasicProps) {
  const [fps, setFps] = useState(60)
  const [objectCount, setObjectCount] = useState<number>(38)
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Real-time FPS measurement loop
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const measureFps = (now: number) => {
      frameCount++
      const delta = now - lastTime
      if (delta >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / delta)
        setFps(currentFps)
        frameCount = 0
        lastTime = now
      }
      animationFrameId = requestAnimationFrame(measureFps)
    }

    animationFrameId = requestAnimationFrame(measureFps)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Dynamic 3D object detection from Spline scene
  const handleSplineLoad = (app: any) => {
    try {
      if (app && typeof app.getAllObjects === 'function') {
        const objs = app.getAllObjects()
        if (objs && objs.length > 0) {
          setObjectCount(objs.length)
          return
        }
      }
      if (app?._scene?.children && app._scene.children.length > 0) {
        setObjectCount(app._scene.children.length)
        return
      }
      // Fallback calibrated object count for the robot splinecode scene
      setObjectCount(38)
    } catch {
      setObjectCount(38)
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(2.4, +(prev + 0.15).toFixed(2)))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.6, +(prev - 0.15).toFixed(2)))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  return (
    <Card className={`bg-black/[0.96] relative overflow-hidden border border-cyan-500/20 rounded-3xl ${className}`}>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Floating 'Performance' overlay using the bespoke-pill class */}
      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-30 pointer-events-none select-none">
        <div className="bespoke-pill px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md bg-slate-950/80 border border-white/10 text-slate-200 shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-cyan-300 font-semibold uppercase tracking-wider text-[10px]">Performance</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-200 font-mono text-[10.5px]">{fps} FPS</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-200 font-mono text-[10.5px]">{objectCount} Objects</span>
        </div>
      </div>

      {/* Floating Zoom in and Zoom out Controls */}
      <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-30 flex items-center gap-1 p-1 sm:p-1.5 rounded-2xl bg-slate-950/85 border border-white/10 backdrop-blur-md shadow-2xl">
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoom <= 0.6}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button
          type="button"
          onClick={handleResetZoom}
          title="Reset Zoom (100%)"
          aria-label="Reset Zoom"
          className="px-2 h-7 sm:h-8 rounded-xl flex items-center justify-center text-[10.5px] sm:text-[11px] font-mono text-cyan-300 hover:bg-white/10 active:scale-95 transition-all cursor-pointer font-semibold"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoom >= 2.4}
          title="Zoom In"
          aria-label="Zoom In"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Full-bleed Spline 3D Scene (Pure Robot, no text inside that box) */}
      <div 
        ref={containerRef}
        className="w-full h-full relative overflow-hidden flex items-center justify-center"
      >
        <div 
          className="w-full h-full relative transition-transform duration-200 ease-out origin-center cursor-grab active:cursor-grabbing"
          style={{ transform: `scale(${zoom})` }}
        >
          <SplineScene
            scene={scene}
            className="w-full h-full"
            onLoad={handleSplineLoad}
          />
        </div>
      </div>
    </Card>
  )
}

export default SplineSceneBasic
