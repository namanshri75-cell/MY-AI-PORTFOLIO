'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export type AgenticFactory3DProps = {
  height?: number | string
  className?: string
  embed?: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
}

export type MachineMode = 'assembled' | 'cutaway' | 'stations' | 'order'
export type MachineCamera = 'overview' | 'side' | 'top' | 'station' | 'flight'
export type StationId = 'engine' | 'admin' | 'storefront' | 'cabinet' | 'cashdesk'

export type MachineApi = {
  setMode: (name: string) => boolean
  focusStation: (id: string) => boolean
  setCamera: (name: string) => boolean
  play: () => boolean
  pause: () => boolean
}

declare global {
  interface Window {
    __machine?: MachineApi
    __machineDebug?: { getState: () => Record<string, unknown> }
  }
}

export function AgenticFactory3D({
  height = '100vh',
  className,
  embed = false,
  onStation,
  onReady,
}: AgenticFactory3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onStation, onReady })
  useEffect(() => {
    handlers.current = { onStation, onReady }
  }, [onStation, onReady])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | undefined
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      dispose = initMachineScene(root, getComputedStyle(root).fontFamily, {
        embedded: embed,
        onStation: (id) => handlers.current.onStation?.(id),
        onReady: () => handlers.current.onReady?.(),
      })
    })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [embed])

  return (
    <div
      ref={rootRef}
      className={['agentic-factory-3d', embed && 'embed', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="scene"
        role="img"
        aria-label="Interactive 3D Machine: AI Pipeline Stations (Ingestion, n8n Orchestrator, LLM Reasoning, UI Deployment, Automated Dispatch). Drag to rotate, scroll or pinch to zoom."
      />
      <div className="vignette" />
      <header className="topbar debug-ui">
        <div className="identity">
          <div className="mark">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 5l7 11 7-11M7 5l3 5 3-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <strong>NAMAN AI OPERATIONS FACTORY</strong>
            <small>Autonomous Workflow Architecture</small>
          </div>
        </div>
        <div className="status" id="status">
          <i />
          <span id="status-text">Pipeline Active</span>
          <span>GOLD OS v3.0</span>
        </div>
      </header>
      <div className="scene-heading debug-ui">
        Autonomous Pipeline Engine <span className="index">5 NODES / LIVE EXECUTION</span>
      </div>
      <div className="coordinates debug-ui">AI OPS CORE — LEAD TO DISPATCH</div>
      <div id="journey" className="debug-ui">
        <div className="journey-icon">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10v9H3zM6 4V2h4v2m-5 4h6" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">Lead Ingestion</strong>
          <small id="journey-detail">Cabinet · Webhook parsed & queued</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>
      <div id="labels" />
      <div id="tooltip" role="tooltip">
        <strong />
        <p />
      </div>
      <div className="controls debug-ui">
        <nav className="mode-bar" aria-label="Machine mode">
          <button data-mode="assembled" aria-pressed="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l6 3.3v6.4l-6 3.3-6-3.3V4.8L8 1.5zM2 4.8l6 3.4 6-3.4M8 8.2v6.3"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            Assembled
          </button>
          <button data-mode="cutaway" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 2h10v12H3zM8 2v12M10.5 4l2.5 2.5m-2.5 0L13 9m-2.5 0 2.5 2.5"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            Cutaway
          </button>
          <button data-mode="stations" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11.5l6 3 6-3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Stations
          </button>
          <button data-mode="order" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M5 2.5l8 5.5-8 5.5v-11z" stroke="currentColor" strokeLinejoin="round" />
            </svg>
            One Pipeline Run
          </button>
        </nav>
        <nav className="camera-row" aria-label="Camera">
          <span className="caption">CAMERA VIEW</span>
          <button data-camera="overview" aria-pressed="true">
            Overview
          </button>
          <button data-camera="side" aria-pressed="false">
            Side
          </button>
          <button data-camera="top" aria-pressed="false">
            Top
          </button>
          <button data-camera="station" aria-pressed="false">
            Node Focus
          </button>
          <button data-camera="flight" aria-pressed="false">
            Flyby
          </button>
          <span className="divider" />
          <button id="play" aria-label="Pause the animation" aria-pressed="false">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="2.5" height="10" rx="0" />
              <rect x="7.5" y="1" width="2.5" height="10" rx="0" />
            </svg>
          </button>
        </nav>
      </div>
      <footer className="footer">
        <span className="wordmark">
          AI AUTOMATION FACTORY · <span>NAMAN SRIVASTAVA</span>
        </span>
        <span className="footer-center debug-ui">60 FPS • THREE.JS PROCEDURAL</span>
        <span className="hint debug-ui">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
            <rect x="2" y="1" width="9" height="14" rx="0" stroke="currentColor" />
            <path d="M6.5 4v3" stroke="currentColor" strokeLinecap="square" />
          </svg>
          Drag to rotate. Zoom & inspect stations.
        </span>
      </footer>
      <div id="loading">
        <i />
        <span>Initializing 3D Automation Engine</span>
      </div>
      <div id="error" role="alert">
        <strong>Could not start the 3D scene</strong>
        <p>Check that WebGL is turned on in your browser.</p>
        <button onClick={() => location.reload()}>Try again</button>
      </div>
    </div>
  )
}

export default AgenticFactory3D

export type MachineSceneOptions = {
  embedded: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
}

function initMachineScene(
  root: HTMLElement,
  fontFamily: string,
  options: MachineSceneOptions
): () => void {
  const cleanups: Array<() => void> = []
  const frameWidth = () => root.clientWidth
  const frameHeight = () => root.clientHeight
  const listen = (target: EventTarget, type: string, handler: (event: never) => void) => {
    const fn = handler as unknown as EventListener
    target.addEventListener(type, fn)
    cleanups.push(() => target.removeEventListener(type, fn))
  }
  function $<T extends HTMLElement = HTMLElement>(id: string): T {
    const el = root.querySelector<T>(`#${id}`)
    if (!el) throw new Error(`Scene markup is missing #${id}`)
    return el
  }
  function showError(message?: string) {
    $('loading').classList.add('done')
    $('error').style.display = 'block'
    if (message) $('error').querySelector('p')!.textContent = message
  }
  const dispose = () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
  try {
    const TAU = Math.PI * 2
    const embedded = options.embedded
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    // Premium Black & Gold Palette
    const palette = { amber: 0xd4af37, goldLight: 0xffdf78, white: 0xf5f3ea, dark: 0x090a0c, steel: 0x484236 }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, frameWidth() / frameHeight(), 0.1, 150)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch (e) {
      showError(
        'WebGL is not available. Turn on hardware acceleration in your browser settings and reload the page.'
      )
      throw e
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(devicePixelRatio, frameWidth() < 900 ? 1.5 : 1.75))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.localClippingEnabled = true
    $('scene').appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 7
    controls.maxDistance = 55
    controls.minPolarAngle = 0.09
    controls.maxPolarAngle = Math.PI * 0.475
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.7
    if (embedded) {
      controls.enableZoom = false
      if (matchMedia('(pointer:coarse)').matches) controls.enableRotate = false
    }
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.65
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xfff4db, 0x1f1a10, 2.2))
    const key = new THREE.DirectionalLight(0xfffaed, 4.2)
    key.position.set(-4, 12, 7)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    Object.assign(key.shadow.camera, {
      left: -10,
      right: 10,
      top: 9,
      bottom: -9,
      near: 0.5,
      far: 35,
    })
    key.shadow.normalBias = 0.035
    key.shadow.bias = -0.0002
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xd4af37, 2.8)
    rim.position.set(3, 7, -8)
    scene.add(rim)
    const warm = new THREE.PointLight(0xffd700, 26, 20, 2)
    warm.position.set(-4, 5, 3)
    scene.add(warm)
    const front = new THREE.DirectionalLight(0xffffff, 1)
    front.position.set(5, 3, 10)
    scene.add(front)

    const mat = (
      color: number,
      metalness = 0.1,
      roughness = 0.4,
      extra: THREE.MeshStandardMaterialParameters = {}
    ) => new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })
    const M = {
      body: mat(0x1a1917, 0.82, 0.28),
      base: mat(0x0f0e0c, 0.9, 0.32),
      edge: mat(0xd4af37, 0.88, 0.22),
      chrome: mat(0xf0dfa8, 0.94, 0.16),
      dark: mat(0x0a0907, 0.55, 0.36),
      rubber: mat(0x080808, 0.1, 0.7),
      amber: mat(0xd4af37, 0.88, 0.22),
      ivory: mat(0x24221c, 0.6, 0.28),
      copper: mat(0xc59f45, 0.9, 0.26),
      black: mat(0x040404, 0, 0.7),
      light: mat(0xd4af37, 0.4, 0.2, { emissive: 0xffd700, emissiveIntensity: 1.6 }),
      whiteLight: mat(0xfff3d7, 0.1, 0.3, { emissive: 0xfff0d0, emissiveIntensity: 1.8 }),
      green: mat(0x50c878, 0.2, 0.3, { emissive: 0x3cb371, emissiveIntensity: 0.8 }),
      glass: mat(0x605842, 0.6, 0.18, { transparent: true, opacity: 0.25, depthWrite: false }),
      paper: mat(0xfcf9f0, 0, 0.85),
    }
    type Vec3 = [number, number, number]
    type Material = THREE.Material
    const geometries = new Map<string, THREE.BufferGeometry>()
    function boxGeo(w: number, h: number, d: number, r = 0.04) {
      const k = `b${w},${h},${d},${r}`
      if (!geometries.has(k))
        geometries.set(
          k,
          r
            ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3))
            : new THREE.BoxGeometry(w, h, d)
        )
      return geometries.get(k)!
    }
    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.body,
      r = 0.04
    ) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function cyl(
      parent: THREE.Object3D,
      r: number,
      h: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome,
      r2: number = r,
      segments = 24
    ) {
      const k = `c${r},${r2},${h},${segments}`
      if (!geometries.has(k)) geometries.set(k, new THREE.CylinderGeometry(r, r2, h, segments))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function ball(
      parent: THREE.Object3D,
      r: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome
    ) {
      const k = `s${r}`
      if (!geometries.has(k)) geometries.set(k, new THREE.SphereGeometry(r, 12, 8))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    function tube(parent: THREE.Object3D, pts: Vec3[], r: number, m: Material = M.chrome) {
      const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
      const o = new THREE.Mesh(
        new THREE.TubeGeometry(curve, Math.max(12, pts.length * 7), r, 8, false),
        m
      )
      o.castShadow = true
      parent.add(o)
      return o
    }
    function screw(parent: THREE.Object3D, x: number, y: number, z: number) {
      cyl(parent, 0.055, 0.026, x, y, z, M.chrome, undefined, 12)
      box(parent, 0.068, 0.005, 0.009, x, y + 0.014, z, M.dark, 0)
    }
    type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void
    function canvasTexture(w: number, h: number, draw: Draw) {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      draw(ctx, w, h)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
      return { texture: t, canvas: c, ctx }
    }
    function print(
      ctx: CanvasRenderingContext2D,
      txt: string,
      x: number,
      y: number,
      size = 20,
      color = '#f4f1ea',
      weight = 500
    ) {
      ctx.fillStyle = color
      ctx.font = `${weight} ${size}px ${fontFamily}`
      ctx.fillText(txt, x, y)
    }
    function screenMaterial(texture: THREE.Texture) {
      return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
    }
    type Painted = THREE.Texture | { texture: THREE.Texture }
    function screen(
      parent: THREE.Object3D,
      w: number,
      h: number,
      x: number,
      y: number,
      z: number,
      tex: Painted
    ) {
      const map = 'texture' in tex ? tex.texture : tex
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMaterial(map))
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    const machine = new THREE.Group()
    scene.add(machine)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 70),
      new THREE.ShadowMaterial({ opacity: 0.35 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)
    const shadow = canvasTexture(128, 128, (c, w, h) => {
      const g = c.createRadialGradient(64, 64, 12, 64, 64, 64)
      g.addColorStop(0, 'rgba(0,0,0,.95)')
      g.addColorStop(0.55, 'rgba(0,0,0,.55)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      c.fillStyle = g
      c.fillRect(0, 0, w, h)
    })
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 13),
      new THREE.MeshBasicMaterial({
        map: shadow.texture,
        transparent: true,
        depthWrite: false,
        opacity: 0.75,
      })
    )
    contact.rotation.x = -Math.PI / 2
    contact.position.y = -0.415
    scene.add(contact)

    // Base Bed with sharp chamfered obsidian & gold edges
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.02)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.edge, 0.01)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.body, 0.01)
    box(machine, 12.55, 0.027, 8.02, 0, -0.19, 0, M.dark, 0.01)
    box(machine, 11.9, 0.026, 0.032, 0, -0.17, 4.115, M.light, 0.005)

    for (const x of [-5.6, 5.6])
      for (const z of [-3.35, 3.35]) {
        cyl(machine, 0.39, 0.25, x, -0.31, z, M.rubber)
        cyl(machine, 0.29, 0.09, x, -0.4, z, M.dark)
        screw(machine, x, 0.253, z)
      }
    for (const x of [-6.02, 6.02]) for (const z of [-3.73, 3.73]) screw(machine, x, 0.255, z)

    // Gold Inscribed Engine Plate tailored for Naman Srivastava
    const engraving = canvasTexture(1536, 176, (c, w, h) => {
      c.fillStyle = '#0f0e0b'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#d4af37'
      c.lineWidth = 3
      c.strokeRect(3, 3, w - 6, h - 6)
      print(c, 'NAMAN SRIVASTAVA', 45, 79, 38, '#ffd700', 700)
      print(c, '·  n8n  ·  APIs  ·  AI Operations  ·  Autonomous Pipelines', 450, 78, 30, '#e5d198', 500)
      print(c, 'PRACTICAL AI ENGINEERING    /    ENTERPRISE WORKFLOW AUTOMATION', 47, 133, 19, '#9b844b', 600)
      print(c, 'SERIES 001', 1330, 130, 22, '#d4af37', 700)
    })
    const plate = screen(machine, 7.35, 0.84, -0.4, 0.25, 3.51, engraving)
    plate.rotation.x = -Math.PI / 2
    for (let i = 0; i < 16; i++)
      box(machine, 0.015, 0.009, 0.11 + (i % 4) * 0.035, -5.6 + i * 0.09, 0.249, 3.5, M.edge, 0)

    const drafting = new THREE.Group()
    scene.add(drafting)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.18,
    })
    const draftingPoints = []
    for (const r of [7.5, 8.1])
      for (let i = 0; i < 120; i++)
        for (const j of [i, i + 1]) {
          const a = (j / 120) * TAU
          draftingPoints.push(new THREE.Vector3(Math.cos(a) * r, -0.4, Math.sin(a) * r * 0.72))
        }
    for (let i = 0; i < 52; i++) {
      const a = (i / 52) * TAU,
        r = 8.1
      draftingPoints.push(
        new THREE.Vector3(Math.cos(a) * r, -0.395, Math.sin(a) * r * 0.72),
        new THREE.Vector3(
          Math.cos(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)),
          -0.395,
          Math.sin(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)) * 0.72
        )
      )
    }
    drafting.add(
      new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(draftingPoints), lineMat)
    )

    type StationDef = {
      id: StationId
      name: string
      step: number
      output: string
      pos: Vec3
      desc: string
    }
    type Station = StationDef & {
      group: THREE.Group
      base: THREE.Vector3
      glowMat: THREE.MeshStandardMaterial
      label: HTMLDivElement
      index: number
      anchor: THREE.Vector3
    }
    // Tailored stations for Naman's real AI stack:
    const definitions: StationDef[] = [
      {
        id: 'engine',
        name: 'LLM Reasoning',
        step: 2,
        output: 'Structured JSON',
        pos: [-4.15, 0.29, -0.65],
        desc: 'Claude 3.5 & GPT-4o function calling, intent classification, and entity extraction.',
      },
      {
        id: 'admin',
        name: 'n8n Orchestrator',
        step: 3,
        output: 'Automated Pipeline',
        pos: [-1.65, 0.29, -2.03],
        desc: 'Autonomous webhook listener, conditional router, and self-healing schema retry loops.',
      },
      {
        id: 'storefront',
        name: 'Enterprise App',
        step: 4,
        output: 'Live Dashboard',
        pos: [1.5, 0.29, -2.08],
        desc: 'High-speed React frontend, webhook integration, and real-time client KPI monitors.',
      },
      {
        id: 'cabinet',
        name: 'Data Ingestion',
        step: 1,
        output: 'Lead Payload',
        pos: [4.03, 0.29, 0.12],
        desc: 'Incoming customer inquiries, CRM webhook triggers, and CSV/PDF document feeds.',
      },
      {
        id: 'cashdesk',
        name: 'Ops & Delivery',
        step: 5,
        output: 'Ticket Closed',
        pos: [0.93, 0.29, 1.85],
        desc: 'SLA verification, auto-drafted customer email dispatched, and CRM updated with 0 human lag.',
      },
    ]
    const stations: Station[] = [],
      cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10),
      shellMaterials: THREE.Material[] = []
    function shell<T extends THREE.Material>(m: T): T {
      const s = m.clone() as T
      s.clippingPlanes = [cutPlane]
      s.clipShadows = true
      s.side = THREE.DoubleSide
      shellMaterials.push(s)
      return s
    }
    const S = {
      body: shell(M.body),
      ivory: shell(M.ivory),
      amber: shell(M.amber),
      edge: shell(M.edge),
    }
    const gears: Array<{ g: THREE.Group; vertical: boolean }> = []
    function gear(
      parent: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      r = 0.3,
      vertical = false
    ) {
      const g = new THREE.Group()
      g.position.set(x, y, z)
      if (vertical) g.rotation.x = Math.PI / 2
      parent.add(g)
      cyl(g, r, 0.09, 0, 0, 0, M.copper)
      cyl(g, r * 0.66, 0.105, 0, 0, 0, M.dark)
      cyl(g, r * 0.22, 0.14, 0, 0, 0, M.chrome)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU,
          b = box(g, r * 0.26, 0.085, r * 0.2, Math.cos(a) * r, 0, Math.sin(a) * r, M.copper, 0.008)
        b.rotation.y = -a
      }
      g.userData.moving = true
      gears.push({ g, vertical })
      return g
    }
    definitions.forEach((d, i) => {
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)
      const glowMat = M.light.clone()
      glowMat.emissiveIntensity = 0.5
      box(group, 2.05, 0.12, 1.78, 0, 0.03, 0, M.dark, 0.02)
      box(group, 1.97, 0.03, 1.7, 0, 0.12, 0, glowMat, 0.02)
      box(group, 2.03, 0.17, 1.75, 0, 0.215, 0, M.body, 0.02)
      for (const x of [-0.85, 0.85]) for (const z of [-0.7, 0.7]) screw(group, x, 0.311, z)
      gear(group, -0.35, 0.45, 0, 0.27)
      gear(group, 0.22, 0.45, 0.12, 0.21)
      box(group, 0.6, 0.15, 0.36, 0.52, 0.47, -0.33, M.dark)
      for (let j = 0; j < 6; j++)
        box(group, 0.025, 0.16, 0.37, 0.3 + j * 0.08, 0.47, -0.33, M.edge, 0.004)
      tube(
        group,
        [
          [-0.7, 0.4, -0.4],
          [-0.55, 0.48, 0.4],
          [0.35, 0.45, 0.6],
          [0.7, 0.58, 0.23],
        ],
        0.023,
        M.light
      )
      const plaque = canvasTexture(512, 116, (c, w, h) => {
        c.fillStyle = '#0c0c0e'
        c.fillRect(0, 0, w, h)
        print(c, String(i + 1).padStart(2, '0'), 24, 76, 42, '#ffd700', 700)
        print(c, d.name.toUpperCase(), 111, 73, 33, '#e5d198', 600)
      })
      screen(group, 1.54, 0.345, 0, 0.27, 0.891, plaque)
      const label = document.createElement('div')
      label.className = 'station-label'
      label.innerHTML = `<div class="stem"></div><div class="label-card"><div class="label-title"><span>${String(i + 1).padStart(2, '0')}</span>${d.name}</div><div class="label-meta">Step ${d.step} · ${d.output}</div></div>`
      $('labels').appendChild(label)
      cleanups.push(() => label.remove())

      stations.push({
        ...d,
        group,
        base: new THREE.Vector3(...d.pos),
        glowMat,
        label,
        index: i,
        anchor: new THREE.Vector3(0, 2.5, 0),
      })
    })

    const engine = stations[0].group
    box(engine, 1.74, 0.62, 1.33, 0, 0.65, -0.05, S.ivory, 0.02)
    box(engine, 1.5, 0.1, 1.16, 0, 0.99, -0.04, S.body, 0.02)
    for (const x of [-0.68, 0.68]) {
      cyl(engine, 0.065, 1.73, x, 1.35, -0.18, M.chrome)
      box(engine, 0.22, 1.8, 0.22, x, 1.37, -0.44, S.ivory, 0.02)
    }
    box(engine, 1.82, 0.27, 0.4, 0, 2.28, -0.35, S.amber, 0.02)
    box(engine, 1.55, 0.06, 0.06, 0, 2.13, -0.115, M.chrome, 0.01)
    const printhead = new THREE.Group()
    engine.add(printhead)
    printhead.position.set(0, 1.9, -0.08)
    printhead.userData.moving = true
    box(printhead, 0.45, 0.36, 0.44, 0, 0, 0, M.body, 0.02)
    cyl(printhead, 0.11, 0.13, 0, -0.24, 0.03, M.chrome, 0.04)
    box(printhead, 0.24, 0.045, 0.022, 0, 0.09, 0.23, M.light, 0.01)

    const videoTexture = canvasTexture(384, 640, () => {})
    function drawVideo(t: number) {
      const c = videoTexture.ctx,
        w = 384,
        h = 640
      c.fillStyle = '#0a0a0c'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#d4af37'
      c.beginPath()
      c.arc(330, 205, 210, 0, TAU)
      c.fill()
      c.strokeStyle = '#ffd700'
      c.lineWidth = 6
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.ellipse(194, 270, 90 - i * 21, 111, Math.sin(t * 0.25) * 0.3 + 0.4, 0, TAU)
        c.stroke()
      }
      print(c, 'LLM PIPELINE', 28, 57, 24, '#0a0a0c', 700)
      print(c, 'PROMPT OPT', 24, 103, 36, '#0a0a0c', 800)
      c.fillStyle = '#171612'
      c.fillRect(25, 465, 334, 123)
      const texts = ['Token Budget: OK', 'Schema: Validated', 'Agent: Dispatched', 'Latency: 180ms']
      const n = Math.floor(t * 0.7) % 4
      print(c, texts[n], 45, 505, 24, '#f5f3ea', 600)
      print(c, texts[(n + 1) % 4], 45, 547, 24, '#d4af37', 550)
      c.fillStyle = '#ffd700'
      c.fillRect(27, 615, Math.max(10, ((t * 0.13) % 1) * 330), 5)
      videoTexture.texture.needsUpdate = true
    }
    drawVideo(0)
    const outputVideo = new THREE.Group()
    outputVideo.userData.moving = true
    engine.add(outputVideo)
    box(outputVideo, 0.62, 1.08, 0.055, 0, 1.36, 0.61, M.dark, 0.01)
    screen(outputVideo, 0.56, 0.98, 0, 1.36, 0.641, videoTexture)

    // Station 2: Admin / n8n Orchestrator
    const admin = stations[1].group
    box(admin, 1.9, 0.66, 1.36, 0, 0.67, -0.04, S.body, 0.02)
    const consoleTop = new THREE.Group()
    consoleTop.position.set(0, 1.01, -0.08)
    consoleTop.rotation.x = -0.32
    admin.add(consoleTop)
    box(consoleTop, 1.76, 0.12, 1.27, 0, 0, 0, S.ivory, 0.02)
    const queue = canvasTexture(640, 340, () => {})
    function drawQueue(t: number) {
      const c = queue.ctx
      c.fillStyle = '#0a0a0c'
      c.fillRect(0, 0, 640, 340)
      print(c, 'n8n WORKFLOW QUEUE', 25, 45, 22, '#d4af37', 700)
      print(c, '03 / 08 ACTIVE', 460, 45, 18, '#ffd700', 600)
      for (let i = 0; i < 3; i++) {
        const y = 74 + i * 76
        c.fillStyle = '#171612'
        c.fillRect(21, y, 598, 61)
        c.fillStyle = i === 0 ? '#d4af37' : '#484236'
        c.fillRect(34, y + 10, 27, 41)
        print(
          c,
          ['Lead Qualification', 'Meeting Extractor', 'Invoice Parser'][i],
          77,
          y + 29,
          19,
          '#f5f3ea'
        )
        print(c, i === 0 ? 'EXECUTING' : 'QUEUED', 77, y + 49, 12, i === 0 ? '#ffd700' : '#8f8362')
        c.fillStyle = '#26241e'
        c.fillRect(377, y + 26, 214, 7)
        c.fillStyle = i === 0 ? '#d4af37' : '#685e45'
        c.fillRect(377, y + 26, i === 0 ? ((t * 0.15) % 1) * 214 : 41 + i * 27, 7)
      }
    }
    drawQueue(0)
    const qs = screen(consoleTop, 1.53, 0.79, 0, 0.067, -0.17, queue)
    qs.rotation.x = -Math.PI / 2

    // Station 3: Storefront / Dashboard
    const storefront = stations[2].group
    box(storefront, 1.35, 0.18, 0.88, 0, 0.44, 0, S.ivory, 0.02)
    box(storefront, 2.42, 1.72, 0.2, 0, 1.94, -0.17, S.ivory, 0.02)
    box(storefront, 2.28, 1.59, 0.1, 0, 1.94, -0.044, M.dark, 0.01)
    const webTexture = canvasTexture(896, 592, (c, w, h) => {
      c.fillStyle = '#080809'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#12110e'
      c.fillRect(0, 0, w, 56)
      print(c, 'AUTOMATION METRICS', 33, 100, 22, '#ffd700', 700)
      print(c, 'Uptime 99.98%   ·   Response 180ms', 510, 98, 15, '#c59f45')
      c.fillStyle = '#1a1914'
      c.fillRect(32, 131, 287, 401)
      print(c, 'ROI IMPACT', 52, 181, 28, '#ffd700', 700)
      print(c, '10X FASTER', 52, 220, 28, '#ffffff', 800)
      print(c, 'Automated Ops', 359, 197, 36, '#ffd700', 700)
      print(c, 'Zero Manual Overhead', 359, 248, 30, '#f5f3ea', 600)
      print(c, 'Deploying autonomous agents', 362, 300, 19, '#b5a172')
      print(c, 'and self-healing pipelines.', 362, 329, 19, '#b5a172')
      for (let i = 0; i < 3; i++) {
        c.fillStyle = '#363226'
        c.fillRect(362, 363 + i * 16, 400 - i * 43, 6)
      }
      c.fillStyle = '#d4af37'
      c.fillRect(359, 447, 279, 62)
      print(c, 'EXPLORE WORKFLOWS ↗', 380, 486, 20, '#0a0a0c', 700)
    })
    screen(storefront, 2.16, 1.43, 0, 1.95, 0.011, webTexture)

    // Station 4: Cabinet / Data Ingestion
    const cabinet = stations[3].group
    box(cabinet, 1.75, 1.77, 1.02, 0, 1.24, -0.13, S.body, 0.02)
    box(cabinet, 1.58, 0.13, 1.09, 0, 2.16, -0.13, S.amber, 0.02)
    const orderTex = canvasTexture(480, 460, (c, w, h) => {
      c.fillStyle = '#0c0c0e'
      c.fillRect(0, 0, w, h)
      print(c, 'INBOUND DATA QUEUE', 30, 51, 26, '#ffd700', 700)
      print(c, 'Real-time Webhook Feed', 30, 81, 16, '#9b844b')
      ;['Client Inquiry', 'Support Ticket', 'API Telemetry'].forEach((n, i) => {
        const y = 110 + i * 100
        c.fillStyle = '#171612'
        c.fillRect(22, y, 436, 83)
        c.fillStyle = '#d4af37'
        c.beginPath()
        c.arc(58, y + 40, 19, 0, TAU)
        c.fill()
        print(c, String(i + 1), 50, y + 47, 20, '#0a0a0c', 700)
        print(c, n, 93, y + 33, 23, '#f5f3ea', 600)
        print(c, ['Webhook Ingested', 'Auto-Triage Active', 'Synced with DB'][i], 93, y + 58, 15, '#c59f45')
        print(c, '✓', 410, y + 49, 25, '#ffd700')
      })
    })
    screen(cabinet, 1.31, 1.255, 0, 1.37, 0.44, orderTex)

    const incoming = new THREE.Group()
    incoming.userData.moving = true
    cabinet.add(incoming)
    box(incoming, 0.86, 0.42, 0.043, 0, 0, 0, M.light, 0.01)

    // Station 5: Checkout / Ops & Delivery
    const cashdesk = stations[4].group
    box(cashdesk, 1.91, 0.63, 1.32, 0, 0.65, -0.06, S.ivory, 0.02)
    box(cashdesk, 1.96, 0.19, 1.38, 0, 0.42, -0.04, S.body, 0.02)
    box(cashdesk, 1.13, 0.46, 0.19, -0.35, 1.98, -0.56, S.body, 0.02)
    const cashTex = canvasTexture(512, 176, () => {})
    function drawCash() {
      const c = cashTex.ctx
      c.fillStyle = '#0c0c0e'
      c.fillRect(0, 0, 512, 176)
      print(c, 'DISPATCH VERIFIED', 22, 44, 23, '#d4af37', 700)
      print(c, 'SLA 100% MET', 26, 131, 58, '#ffd700', 700)
    }
    drawCash()
    screen(cashdesk, 1.015, 0.349, -0.35, 1.98, -0.459, cashTex)
    const receipt = new THREE.Group()
    receipt.position.set(0.59, 1.37, -0.1)
    receipt.userData.moving = true
    cashdesk.add(receipt)
    const coin = new THREE.Group()
    coin.userData.moving = true
    cashdesk.add(coin)
    const coinDisc = cyl(coin, 0.22, 0.065, 0, 0, 0, M.amber, undefined, 32)
    coinDisc.rotation.x = Math.PI / 2

    // Conveyor Belt
    const path = new THREE.CatmullRomCurve3(
      [
        [-3.95, 0.84, 0.65],
        [-3.1, 0.84, -0.12],
        [-1.45, 0.84, -0.79],
        [1.32, 0.84, -0.8],
        [3.3, 0.84, 0.19],
        [3.43, 0.84, 1.21],
        [1.35, 0.84, 2.7],
        [-1.4, 0.84, 2.52],
        [-3.54, 0.84, 1.65],
      ].map((p) => new THREE.Vector3(...p)),
      true,
      'catmullrom',
      0.25
    )
    const belt = new THREE.Group()
    machine.add(belt)
    const frameMesh = new THREE.Mesh(new THREE.TubeGeometry(path, 150, 0.35, 8, true), M.dark)
    frameMesh.scale.y = 0.3
    frameMesh.position.y = 0.51
    belt.add(frameMesh)
    const beltCount = 148,
      beltSlats = new THREE.InstancedMesh(boxGeo(0.135, 0.065, 0.63, 0.005), M.body, beltCount)
    beltSlats.receiveShadow = true
    belt.add(beltSlats)
    beltSlats.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    const dummy = new THREE.Object3D(),
      pVec = new THREE.Vector3(),
      tVec = new THREE.Vector3()
    function updateBelt(t: number) {
      for (let i = 0; i < beltCount; i++) {
        const u = (i / beltCount + t * 0.012) % 1
        path.getPointAt(u, pVec)
        path.getTangentAt(u, tVec)
        dummy.position.copy(pVec)
        dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0)
        dummy.updateMatrix()
        beltSlats.setMatrixAt(i, dummy.matrix)
      }
      beltSlats.instanceMatrix.needsUpdate = true
    }
    updateBelt(0)

    const pipes = new THREE.Group()
    machine.add(pipes)
    for (let i = 0; i < 4; i++) {
      const a = stations[i].base,
        b = stations[i + 1].base
      const points = [
        a.clone().add(new THREE.Vector3(0.4, 0.12, 0)),
        a.clone().lerp(b, 0.35).add(new THREE.Vector3(0, 0.1, -0.6)),
        a.clone().lerp(b, 0.65).add(new THREE.Vector3(0, 0.1, -0.6)),
        b.clone().add(new THREE.Vector3(-0.4, 0.12, 0)),
      ]
      const curve = new THREE.CatmullRomCurve3(points)
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.054, 8, false), M.copper)
      pipes.add(mesh)
    }

    const scriptTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#0a0a0c'
      c.fillRect(0, 0, w, h)
      print(c, 'PAYLOAD', 24, 47, 24, '#ffd700', 700)
      print(c, 'Status: Valid', 24, 85, 16, '#9b844b')
      for (let i = 0; i < 9; i++) {
        c.fillStyle = i === 4 ? '#ffd700' : '#484236'
        c.fillRect(24, 111 + i * 21, 190 - (i % 3) * 24, 6)
      }
      print(c, 'EXECUTED ✓', 24, 327, 18, '#ffd700', 700)
    })
    const packetTextures = [scriptTex, scriptTex, videoTexture, scriptTex, scriptTex]
    const packets: Array<{
      group: THREE.Group
      faces: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[]
      halo: THREE.Mesh
      stage: number
      phase: number
    }> = []
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group()
      g.userData.moving = true
      machine.add(g)
      box(g, 0.47, 0.71, 0.04, 0, 0, 0, M.ivory, 0.01)
      const faces = packetTextures.map((tex) => {
        const s = screen(g, 0.43, 0.665, 0, 0, 0.024, tex)
        s.material.side = THREE.DoubleSide
        s.visible = false
        return s
      })
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.414, 40),
        new THREE.MeshBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      )
      halo.rotation.x = -Math.PI / 2
      halo.position.y = -0.37
      g.add(halo)
      halo.visible = false
      packets.push({ group: g, faces, halo, stage: -1, phase: 0 })
    }

    let adminU = 0.2,
      storeU = 0.37,
      cashU = 0.72
    function nearestPort(x: number, z: number) {
      let best = 0,
        dist = Infinity
      for (let i = 0; i < 300; i++) {
        const p = path.getPointAt(i / 300),
          d = (p.x - x) ** 2 + (p.z - z) ** 2
        if (d < dist) {
          dist = d
          best = i / 300
        }
      }
      return best
    }
    adminU = nearestPort(-1.65, -0.7)
    storeU = nearestPort(1.5, -0.7)
    cashU = nearestPort(0.93, 2.65)

    function compact(group: THREE.Object3D) {
      for (const child of [...group.children]) if ((child as THREE.Group).isGroup) compact(child)
      const buckets = new Map<string, THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]>()
      for (const object of group.children) {
        const child = object as THREE.Mesh<THREE.BufferGeometry, THREE.Material> & {
          isInstancedMesh?: boolean
        }
        if (
          !child.isMesh ||
          child.isInstancedMesh ||
          child.userData.moving ||
          Array.isArray(child.material)
        )
          continue
        const key = child.material.uuid
        if (!buckets.has(key)) buckets.set(key, [])
        buckets.get(key)!.push(child)
      }
      for (const list of buckets.values()) {
        if (list.length < 2) continue
        const geos = list.map((m) => {
          m.updateMatrix()
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
          return g.applyMatrix4(m.matrix)
        })
        const merged = mergeGeometries(geos, false)
        for (const geo of geos) geo.dispose()
        if (!merged) continue
        const mesh = new THREE.Mesh(merged, list[0].material)
        mesh.castShadow = list.some((x) => x.castShadow)
        mesh.receiveShadow = list.some((x) => x.receiveShadow)
        for (const m of list) group.remove(m)
        group.add(mesh)
      }
    }
    ;[incoming, receipt, coin, outputVideo, printhead].forEach((g) => (g.userData.moving = true))
    compact(machine)
    stations.forEach((s) =>
      s.group.traverse((o) => {
        o.userData.station = s.id
      })
    )
    const pickables = stations.map((s) => s.group)

    let mode: MachineMode = 'assembled',
      cameraMode: MachineCamera = 'overview',
      playing = !reduceMotion,
      simTime = 0,
      spread = 0,
      selected: string = 'engine',
      hovered: string | null = null

    let width = frameWidth(),
      height = frameHeight(),
      mobile = width <= 900,
      lastInteraction = performance.now(),
      dragging = false,
      wasDragged = false,
      downX = 0,
      downY = 0
    let cameraAnimating = true,
      flightTime = 0,
      lastDraw = -1,
      visible = true,
      contextLost = false
    const desiredPosition = new THREE.Vector3(),
      desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    let baseDistance = 25,
      sized = false,
      readySent = false

    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      const first = !sized
      sized = true
      width = frameWidth()
      height = frameHeight()
      mobile = width <= 900
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.setViewOffset(
        width,
        height,
        mobile || !embedded ? 0 : -width * 0.21,
        mobile || embedded ? 0 : height * 0.025,
        width,
        height
      )
      const aspect = width / height
      const availableWidth = mobile ? 0.91 : Math.min(0.55, aspect > 2 ? 0.54 : 0.57)
      const horizontalFit =
        17.3 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth)
      const verticalFit =
        11.5 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (embedded ? 0.85 : 0.62))
      baseDistance =
        (Math.max(horizontalFit, verticalFit) * (mobile ? 0.97 : 1)) /
        (embedded ? (mobile ? 1.15 : 1.45) : 1)
      controls.maxDistance = Math.max(55, baseDistance * 1.6)
      camera.updateProjectionMatrix()
      setCameraGoal()
      cameraAnimating = true
      if (first) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
      }
    }
    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        const s = stations.find((s) => s.id === selected)!
        desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
        desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 9 : 12)
      } else {
        desiredTarget.set(0, 1, 0)
        const distance = baseDistance * expand
        if (cameraMode === 'side')
          desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget)
        else if (cameraMode === 'top') desiredPosition.set(0.01, distance, 0.8).add(desiredTarget)
        else desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget)
      }
    }
    function syncButtons() {
      root
        .querySelectorAll<HTMLElement>('[data-mode]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)))
      root
        .querySelectorAll<HTMLElement>('[data-camera]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.camera === cameraMode)))
      $('journey').classList.toggle('visible', mode === 'order')
    }
    const modeAliases: Record<string, MachineMode> = {
      Assembled: 'assembled',
      Cutaway: 'cutaway',
      Stations: 'stations',
      'One order': 'order',
      assembled: 'assembled',
      cutaway: 'cutaway',
      stations: 'stations',
      order: 'order',
    }
    const cameraAliases: Record<string, MachineCamera> = {
      Overview: 'overview',
      Side: 'side',
      Top: 'top',
      Station: 'station',
      Flight: 'flight',
      overview: 'overview',
      side: 'side',
      top: 'top',
      station: 'station',
      flight: 'flight',
    }
    function setMode(name: string) {
      if (!Object.hasOwn(modeAliases, name)) return false
      mode = modeAliases[name]
      lastInteraction = performance.now()
      if (mode === 'order') {
        simTime = 0
        lastDraw = -1
        play()
        cameraMode = 'overview'
      } else if (cameraMode === 'station') cameraMode = 'overview'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function focusStation(id: string) {
      const s = stations.find((s) => s.id === id)
      if (!s) return false
      selected = id
      if (mode === 'order') mode = 'assembled'
      cameraMode = 'station'
      lastInteraction = performance.now()
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function setCamera(name: string) {
      if (!Object.hasOwn(cameraAliases, name)) return false
      cameraMode = cameraAliases[name]
      if (mode === 'order') mode = 'assembled'
      lastInteraction = performance.now()
      flightTime = 0
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function syncPlayback() {
      const b = $('play')
      b.setAttribute('aria-label', playing ? 'Pause the animation' : 'Resume the animation')
      b.setAttribute('aria-pressed', String(!playing))
      b.innerHTML = playing
        ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="2.5" height="10" rx="0"/><rect x="7.5" y="1" width="2.5" height="10" rx="0"/></svg>'
        : '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1l8 5-8 5z"/></svg>'
      $('status').classList.toggle('paused', !playing)
      $('status-text').textContent = playing ? 'Pipeline Active' : 'Pipeline Paused'
    }
    function play() {
      playing = true
      syncPlayback()
      return true
    }
    function pause() {
      playing = false
      syncPlayback()
      return true
    }
    const api: MachineApi = { setMode, focusStation, setCamera, play, pause }
    window.__machine = api
    cleanups.push(() => {
      if (window.__machine === api) delete window.__machine
    })
    root
      .querySelectorAll<HTMLElement>('[data-mode]')
      .forEach((b) => listen(b, 'click', () => setMode(b.dataset.mode ?? '')))
    root
      .querySelectorAll<HTMLElement>('[data-camera]')
      .forEach((b) => listen(b, 'click', () => setCamera(b.dataset.camera ?? '')))
    listen($('play'), 'click', () => (playing ? pause() : play()))
    syncPlayback()
    layoutCamera()
    listen(window, 'resize', layoutCamera)
    const resizeObserver = new ResizeObserver(() => layoutCamera())
    resizeObserver.observe(root)
    cleanups.push(() => resizeObserver.disconnect())
    controls.addEventListener('start', () => {
      dragging = true
      cameraAnimating = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('end', () => {
      dragging = false
      lastInteraction = performance.now()
    })
    const raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2(),
      tooltip = $('tooltip')
    function hitStation(x: number, y: number) {
      pointer.set((x / width) * 2 - 1, (-y / height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pickables, true)
      return hits.length ? stations.find((s) => s.id === hits[0].object.userData.station) : null
    }
    listen(renderer.domElement, 'pointermove', (e: PointerEvent) => {
      if (Math.hypot((e.clientX - root.getBoundingClientRect().left) - downX, (e.clientY - root.getBoundingClientRect().top) - downY) > 5) wasDragged = true
      if (dragging) return
      const s = hitStation((e.clientX - root.getBoundingClientRect().left), (e.clientY - root.getBoundingClientRect().top))
      hovered = s ? s.id : null
      renderer.domElement.style.cursor = s ? 'pointer' : 'grab'
      tooltip.classList.toggle('visible', !!s)
      if (s) {
        tooltip.querySelector('strong')!.innerHTML =
          `<span>${String(s.index + 1).padStart(2, '0')}</span>${s.name}`
        tooltip.querySelector('p')!.textContent = s.desc
        tooltip.style.left = Math.min(width - 255, Math.max(10, (e.clientX - root.getBoundingClientRect().left) + 16)) + 'px'
        tooltip.style.top = Math.max(10, Math.min(height - 95, (e.clientY - root.getBoundingClientRect().top) - 65)) + 'px'
      }
    })
    listen(renderer.domElement, 'pointerleave', () => {
      hovered = null
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerdown', (e: PointerEvent) => {
      downX = (e.clientX - root.getBoundingClientRect().left)
      downY = (e.clientY - root.getBoundingClientRect().top)
      wasDragged = false
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerup', (e: PointerEvent) => {
      if (wasDragged) return
      const s = hitStation((e.clientX - root.getBoundingClientRect().left), (e.clientY - root.getBoundingClientRect().top))
      if (!s) return
      focusStation(s.id)
      options.onStation?.(s.id as StationId)
    })
    listen(document, 'visibilitychange', () => {
      visible = !document.hidden
      lastFrame = performance.now()
    })
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting && !document.hidden
        lastFrame = performance.now()
      },
      { threshold: 0.01 }
    )
    observer.observe(renderer.domElement)
    cleanups.push(() => observer.disconnect())

    const scratch = new THREE.Vector3(),
      anchor = new THREE.Vector3()
    const journeySteps = [
      ['Data Ingestion', 'Cabinet · Inbound customer webhook parsed'],
      ['LLM Reasoning', 'Engine · Claude 3.5 structured JSON extract'],
      ['n8n Workflow Execution', 'Admin · Multi-agent execution & routing'],
      ['Enterprise App Deployment', 'Storefront · Real-time executive dashboard'],
      ['Automated Action Complete', 'Checkout · CRM updated, email sent, 100% SLA'],
    ]
    let prevJourney = -1,
      lastFrame = performance.now()
    let rafId = 0
    function animate(now: number) {
      rafId = requestAnimationFrame(animate)
      const dt = Math.max(0, Math.min((now - lastFrame) / 1000, 0.045))
      lastFrame = now
      if (!visible || contextLost) return
      if (playing) {
        simTime += dt
        flightTime += dt
      }
      const t = simTime,
        beat = (t / 4) % 1,
        tact = (t * TAU) / 4,
        smooth = 1 - Math.exp(-dt * 5)
      spread = THREE.MathUtils.lerp(spread, mode === 'stations' ? 1 : 0, smooth)
      cutPlane.constant = THREE.MathUtils.lerp(
        cutPlane.constant,
        mode === 'cutaway' ? 0.99 : 10,
        smooth
      )
      stations.forEach((s, i) => {
        s.group.position.copy(s.base)
        s.group.position.x *= 1 + spread * 0.29
        s.group.position.z *= 1 + spread * 0.37
        s.group.position.y += spread * (i % 2 ? 0.32 : 0.55)
        const pulse = Math.pow(Math.max(0, Math.sin(tact - i * 0.9)), 7)
        s.glowMat.emissiveIntensity = THREE.MathUtils.lerp(
          s.glowMat.emissiveIntensity,
          hovered === s.id || (cameraMode === 'station' && selected === s.id)
            ? 3.5
            : 0.55 + pulse * 0.65,
          smooth
        )
      })
      belt.scale.set(1 + spread * 0.12, 1, 1 + spread * 0.15)
      pipes.scale.set(1 + spread * 0.25, 1, 1 + spread * 0.3)
      gears.forEach(({ g, vertical }, i) => {
        if (vertical) g.rotation.z = t * (i % 2 ? -1 : 1) * 1.1
        else g.rotation.y = t * (i % 2 ? -1 : 1) * 1.1
      })
      printhead.position.x = Math.sin(tact) * 0.42
      printhead.position.y = 1.91 + Math.sin(tact * 2) * 0.055
      outputVideo.position.y = beat * 0.25
      const orderPhase = (t / 24) % 1
      const incomingBeat = mode === 'order' ? Math.min(1, orderPhase / 0.15) : beat
      incoming.visible = mode !== 'order' || orderPhase < 0.15
      incoming.position.set(
        Math.sin(incomingBeat * Math.PI) * 0.24,
        2.9 - incomingBeat * 1.9,
        1.1 - incomingBeat * 0.55
      )
      incoming.rotation.z = Math.sin(incomingBeat * Math.PI) * -0.14

      if (t - lastDraw > 1 / 18 || lastDraw < 0) {
        drawVideo(t)
        drawQueue(t)
        queue.texture.needsUpdate = true
        updateBelt(t)
        lastDraw = t
      }
      packets.forEach((packet, i) => {
        const phase = (t / 24 + i / 6) % 1
        packet.phase = phase
        let stage
        if (phase < 0.15) {
          stage = 0
          const f = phase / 0.15
          packet.group.position.copy(stations[3].group.position).add(new THREE.Vector3(0, 1.6, 0.6))
          scratch.copy(stations[0].group.position).add(new THREE.Vector3(0, 1.3, 0.65))
          packet.group.position.lerp(scratch, f)
          packet.group.position.y += Math.sin(f * Math.PI) * 2
          packet.group.rotation.set(0, Math.sin(f * Math.PI) * 0.28, Math.sin(f * Math.PI) * -0.1)
        } else {
          const u = ((phase - 0.15) / 0.85) * cashU
          path.getPointAt(u, packet.group.position)
          packet.group.position.x *= 1 + spread * 0.12
          packet.group.position.z *= 1 + spread * 0.15
          packet.group.position.y += 0.43
          packet.group.rotation.set(0, 0.18, 0)
          stage = u < adminU * 0.7 ? 1 : u < storeU * 0.96 ? 2 : u < cashU * 0.83 ? 3 : 4
        }
        if (packet.stage !== stage) {
          packet.faces.forEach((f, j) => (f.visible = j === stage))
          packet.stage = stage
        }
        packet.group.visible = mode !== 'order' || i === 0
        packet.halo.visible = mode === 'order' && i === 0
      })
      if (mode === 'order') {
        const packet = packets[0],
          step = packet.stage
        if (step !== prevJourney) {
          $('journey-title').textContent = journeySteps[step][0]
          $('journey-detail').textContent = journeySteps[step][1]
          prevJourney = step
        }
        $('journey-progress').style.width = packet.phase * 100 + '%'
      }
      controls.update(dt)
      stations.forEach((s, i) => {
        const show = mode === 'stations'
        s.label.classList.toggle('visible', show)
        if (!show) return
        anchor.copy(s.group.position).add(s.anchor).project(camera)
        const offsets = mobile
          ? [
              [-30, 25],
              [-27, -50],
              [15, -65],
              [16, -1],
              [-5, 52],
            ]
          : [
              [-48, -14],
              [-8, -64],
              [30, -12],
              [30, 20],
              [-12, 40],
            ]
        let x = (anchor.x * 0.5 + 0.5) * width - 40 + offsets[i][0],
          y = (-anchor.y * 0.5 + 0.5) * height - 52 + offsets[i][1]
        x = THREE.MathUtils.clamp(
          x,
          mobile || !embedded ? 9 : width * 0.425,
          width - (mobile ? 123 : 165)
        )
        y = THREE.MathUtils.clamp(y, 130, height - 200)
        s.label.style.transform = `translate(${x}px,${y}px)`
      })
      renderer.render(scene, camera)
      if (!readySent && sized) {
        readySent = true
        options.onReady?.()
      }
    }
    rafId = requestAnimationFrame(animate)
    cleanups.push(() => {
      cancelAnimationFrame(rafId)
      controls.dispose()
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
      })
      geometries.forEach((g) => g.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    })
    renderer.compile(scene, camera)
    $('loading').classList.add('done')
    $('error').style.display = 'none'
  } catch (error) {
    console.error('Machine: failed to start', error)
    showError()
  }
  return dispose
}

const STYLES = String.raw`
.agentic-factory-3d {
  width: 100%;
  contain: layout;
  color-scheme: dark;
  --bg: #050505;
  --white: #fbf8ee;
  --amber: #d4af37;
  --muted: #a69260;
  --line: rgba(212, 175, 55, 0.22);
  margin: 0;
  height: 100%;
  overflow: hidden;
  background: var(--bg);
  font-family: 'JetBrains Mono', monospace, system-ui;
  color: var(--white);
  font-size: 13px;
  position: relative;
}
.agentic-factory-3d, .agentic-factory-3d * {
  box-sizing: border-box;
}
.agentic-factory-3d button {
  font: inherit;
  color: inherit;
  cursor: pointer;
  border-radius: 0px !important;
}
.agentic-factory-3d button:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 4px;
}
.agentic-factory-3d #scene {
  position: absolute;
  inset: 0;
  touch-action: none;
  outline: none;
}
.agentic-factory-3d #scene canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.agentic-factory-3d .vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 48%,
    transparent 25%,
    rgba(5, 5, 5, 0.3) 60%,
    rgba(0, 0, 0, 0.92) 100%
  );
}
.agentic-factory-3d .topbar {
  position: absolute;
  inset: 24px 28px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}
.agentic-factory-3d .identity {
  display: flex;
  gap: 12px;
  align-items: center;
}
.agentic-factory-3d .mark {
  width: 32px;
  height: 32px;
  border: 1px solid #d4af37;
  border-radius: 0px;
  display: grid;
  place-items: center;
  color: #ffd700;
  background: #14120a;
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.35);
}
.agentic-factory-3d .identity strong {
  display: block;
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 13px;
  color: #fff;
}
.agentic-factory-3d .identity small {
  display: block;
  margin-top: 3px;
  font-size: 9.5px;
  letter-spacing: 1.5px;
  color: #d4af37;
  text-transform: uppercase;
}
.agentic-factory-3d .status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10.5px;
  color: #e5d198;
}
.agentic-factory-3d .status i {
  width: 6px;
  height: 6px;
  border-radius: 0px;
  background: #ffd700;
  box-shadow: 0 0 12px #ffd700;
}
.agentic-factory-3d .scene-heading {
  position: absolute;
  top: 96px;
  left: 20%;
  right: 20%;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  letter-spacing: 2px;
  color: #d4af37;
  text-transform: uppercase;
}
.agentic-factory-3d .scene-heading:before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--amber);
}
.agentic-factory-3d .scene-heading .index {
  margin-left: auto;
  color: #8c763b;
  font-size: 9.5px;
}
.agentic-factory-3d .coordinates {
  position: absolute;
  top: 140px;
  right: 28px;
  color: #8c763b;
  writing-mode: vertical-rl;
  font-size: 10px;
  letter-spacing: 1.5px;
  pointer-events: none;
}
.agentic-factory-3d .controls {
  position: absolute;
  bottom: 64px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  z-index: 5;
}
.agentic-factory-3d .mode-bar {
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 4px;
  border: 1px solid rgba(212, 175, 55, 0.35);
  border-radius: 0px;
  background: rgba(12, 11, 8, 0.94);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(16px);
}
.agentic-factory-3d .mode-bar button {
  border: 0;
  background: none;
  color: #c5b487;
  white-space: nowrap;
  padding: 9px 15px;
  display: flex;
  gap: 7px;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.2s;
}
.agentic-factory-3d .mode-bar button:hover {
  background: rgba(212, 175, 55, 0.15);
  color: #fff;
}
.agentic-factory-3d .mode-bar button[aria-pressed='true'] {
  background: linear-gradient(180deg, #d4af37 0%, #b89327 100%);
  color: #050505;
  font-weight: 700;
  box-shadow: 0 2px 14px rgba(212, 175, 55, 0.4);
}
.agentic-factory-3d .camera-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.agentic-factory-3d .camera-row .caption {
  font-size: 9.5px;
  letter-spacing: 1.4px;
  color: #8c763b;
  margin-right: 8px;
}
.agentic-factory-3d .camera-row button {
  border: 1px solid transparent;
  background: transparent;
  color: #9c8e6b;
  padding: 5px 9px;
  font-size: 10px;
  transition: all 0.2s;
}
.agentic-factory-3d .camera-row button:hover,
.agentic-factory-3d .camera-row button[aria-pressed='true'] {
  color: #ffd700;
  border-color: rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.1);
}
.agentic-factory-3d .camera-row .divider {
  width: 1px;
  height: 14px;
  background: var(--line);
  margin: 0 8px;
}
.agentic-factory-3d .footer {
  position: absolute;
  bottom: 18px;
  left: 28px;
  right: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
}
.agentic-factory-3d .wordmark {
  font-size: 10.5px;
  letter-spacing: 1px;
  color: #8c763b;
}
.agentic-factory-3d .wordmark span {
  color: #ffd700;
  font-weight: 600;
}
.agentic-factory-3d .hint {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #9c8e6b;
  font-size: 10px;
}
.agentic-factory-3d .footer-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9.5px;
  letter-spacing: 1.5px;
  color: #6d5e34;
}
.agentic-factory-3d #labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.agentic-factory-3d .station-label {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s;
  will-change: transform;
  pointer-events: none;
  min-width: 140px;
}
.agentic-factory-3d .station-label.visible {
  opacity: 1;
}
.agentic-factory-3d .station-label .stem {
  height: 24px;
  width: 1px;
  background: linear-gradient(#d4af3700, #d4af37);
  margin: 0 0 0 10px;
}
.agentic-factory-3d .station-label .label-card {
  background: #0d0c09f0;
  backdrop-filter: blur(12px);
  border: 1px solid #d4af37;
  border-radius: 0px;
  padding: 8px 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.9);
}
.agentic-factory-3d .station-label .label-title {
  font-weight: 700;
  font-size: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: #fff;
}
.agentic-factory-3d .station-label .label-title span {
  color: #ffd700;
}
.agentic-factory-3d .station-label .label-meta {
  font-size: 9.5px;
  color: #c5b487;
  margin-top: 4px;
}
.agentic-factory-3d #tooltip {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.15s;
  padding: 11px 14px;
  border: 1px solid #d4af37;
  background: #0f0e0bed;
  backdrop-filter: blur(14px);
  border-radius: 0px;
  max-width: 260px;
}
.agentic-factory-3d #tooltip.visible {
  opacity: 1;
}
.agentic-factory-3d #tooltip strong {
  font-size: 12px;
  font-weight: 700;
  color: #ffd700;
}
.agentic-factory-3d #tooltip p {
  font-size: 10.5px;
  color: #ddd3ba;
  margin: 6px 0 0;
  line-height: 1.5;
}
.agentic-factory-3d #journey {
  position: absolute;
  left: 20%;
  right: 20%;
  top: 135px;
  opacity: 0;
  transform: translateY(-5px);
  transition: 0.4s;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 13px;
}
.agentic-factory-3d #journey.visible {
  opacity: 1;
  transform: none;
}
.agentic-factory-3d .journey-icon {
  width: 28px;
  height: 28px;
  border: 1px solid #d4af37;
  display: grid;
  place-items: center;
  color: #ffd700;
  background: #14120a;
}
.agentic-factory-3d #journey strong {
  font-size: 11.5px;
  font-weight: 700;
  color: #ffd700;
}
.agentic-factory-3d #journey small {
  display: block;
  font-size: 9.5px;
  margin-top: 3px;
  color: #c5b487;
}
.agentic-factory-3d #journey .track {
  height: 2px;
  background: rgba(212, 175, 55, 0.2);
  flex: 1;
  margin-left: 8px;
}
.agentic-factory-3d #journey .track i {
  display: block;
  height: 100%;
  background: #ffd700;
  width: 0;
}
.agentic-factory-3d #loading {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d4af37;
  font-size: 11.5px;
  z-index: 20;
}
.agentic-factory-3d #loading i {
  height: 18px;
  width: 18px;
  border: 2px solid rgba(212, 175, 55, 0.25);
  border-top-color: #ffd700;
  animation: agentic-factory-3d-spin 1s linear infinite;
}
@keyframes agentic-factory-3d-spin {
  to { transform: rotate(360deg); }
}
.agentic-factory-3d #loading.done {
  opacity: 0;
  pointer-events: none;
}
.agentic-factory-3d #error {
  position: absolute;
  left: 27.5%;
  right: 27.5%;
  top: 40%;
  border: 1px solid #d4af37;
  background: #0f0e0c;
  padding: 24px;
  border-radius: 0px;
  display: none;
}
`
