import { resolvePublicAsset } from "./resolveAsset";
import interstellarCornchaseMp3 from "../assets/interstellar_cornchase.mp3";

/**
 * Web Audio API synthesized Netflix-style "TA-DUM" sound effect, UI clicks,
 * and cinematic looped Interstellar (Cornfield Chase) BGM soundtrack engine.
 */

type AudioStateListener = (state: { isMuted: boolean; volume: number; isPlaying: boolean }) => void;

class NetflixAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  // Background Soundtrack (Interstellar - Cornfield Chase)
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmMuted: boolean = true; // Muted by default on visit as requested
  private bgmVolume: number = 0.75;
  private bgmPlaying: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();
  private candidateIndex: number = 0;

  private getAudioSources(): string[] {
    const list = [
      interstellarCornchaseMp3,
      resolvePublicAsset("audio/interstellar_cornchase.mp3"),
      "./audio/interstellar_cornchase.mp3",
      "/audio/interstellar_cornchase.mp3",
      resolvePublicAsset("audio/interstellar_cornfield_chase.mp3"),
      "./audio/interstellar_cornfield_chase.mp3",
    ];
    // Filter duplicates
    return Array.from(new Set(list.filter(Boolean)));
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return this.ctx;
    } catch (e) {
      console.warn("AudioContext initialization prevented:", e);
      return null;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // ==========================================
  // BACKGROUND MUSIC ENGINE (STRANGER THINGS)
  // ==========================================

  private getOrInitBgmAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (this.bgmAudio) return this.bgmAudio;

    try {
      const sources = this.getAudioSources();
      const initialSrc = sources[this.candidateIndex] || sources[0];
      const audio = new Audio(initialSrc);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = this.bgmVolume;
      audio.muted = this.bgmMuted;

      audio.addEventListener("play", () => {
        this.bgmPlaying = true;
        this.notify();
      });

      audio.addEventListener("pause", () => {
        this.bgmPlaying = false;
        this.notify();
      });

      audio.addEventListener("error", () => {
        const nextIdx = this.candidateIndex + 1;
        if (nextIdx < sources.length) {
          this.candidateIndex = nextIdx;
          const nextSrc = sources[nextIdx];
          console.warn(`Audio fallback: trying source [${nextIdx}]: ${nextSrc}`);
          audio.src = nextSrc;
          audio.load();
          if (!this.bgmMuted) {
            audio.play().catch(() => {});
          }
        } else {
          console.warn("All Interstellar audio sources failed to load.");
        }
      });

      this.bgmAudio = audio;
      return audio;
    } catch (e) {
      console.warn("BGM initialization failed:", e);
      return null;
    }
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    // Send current initial state
    listener(this.getBgmState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getBgmState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (e) {
        console.warn("Listener notification failed:", e);
      }
    });
  }

  public getBgmState() {
    return {
      isMuted: this.bgmMuted,
      volume: this.bgmVolume,
      isPlaying: this.bgmPlaying && !this.bgmMuted,
    };
  }

  public getBgmMuted(): boolean {
    return this.bgmMuted;
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public async playBgm(): Promise<void> {
    const audio = this.getOrInitBgmAudio();
    if (!audio) return;

    this.bgmMuted = false;
    audio.muted = false;
    audio.volume = this.bgmVolume;

    try {
      await audio.play();
      this.bgmPlaying = true;
    } catch (e) {
      console.warn("Autoplay was blocked until user interaction:", e);
      // Wait for next user gesture
    }
    this.notify();
  }

  public pauseBgm(): void {
    const audio = this.getOrInitBgmAudio();
    if (audio) {
      audio.pause();
    }
    this.bgmPlaying = false;
    this.bgmMuted = true;
    if (audio) {
      audio.muted = true;
    }
    this.notify();
  }

  public async toggleBgm(): Promise<boolean> {
    const audio = this.getOrInitBgmAudio();
    if (!audio) return false;

    if (this.bgmMuted || audio.paused) {
      // Unmute and play on loop
      this.bgmMuted = false;
      audio.muted = false;
      audio.volume = this.bgmVolume;
      try {
        await audio.play();
        this.bgmPlaying = true;
      } catch (err) {
        console.warn("Audio play prevented:", err);
      }
    } else {
      // Mute and pause
      this.bgmMuted = true;
      audio.muted = true;
      audio.pause();
      this.bgmPlaying = false;
    }

    this.notify();
    return !this.bgmMuted;
  }

  public setBgmVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.bgmVolume = clamped;
    const audio = this.getOrInitBgmAudio();
    if (audio) {
      audio.volume = clamped;
    }
    // If volume is adjusted above 0 while unmuted
    if (clamped === 0 && !this.bgmMuted) {
      this.bgmMuted = true;
      if (audio) audio.muted = true;
    } else if (clamped > 0 && this.bgmMuted && audio && !audio.paused) {
      this.bgmMuted = false;
      if (audio) audio.muted = false;
    }
    this.notify();
  }

  // ==========================================
  // CINEMATIC SFX SYNTHESIS
  // ==========================================

  /**
   * Synthesize the iconic cinematic Netflix "TA-DUM" sound.
   */
  public playTadum() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Master output limiter/gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.7, now);
      master.connect(ctx.destination);

      // --- HIT 1: "TA" (Low subtle resonant strike) ---
      const taOsc = ctx.createOscillator();
      const taGain = ctx.createGain();
      taOsc.type = "sine";
      taOsc.frequency.setValueAtTime(68, now);
      taOsc.frequency.exponentialRampToValueAtTime(42, now + 0.35);

      taGain.gain.setValueAtTime(0.65, now);
      taGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      taOsc.connect(taGain);
      taGain.connect(master);
      taOsc.start(now);
      taOsc.stop(now + 0.45);

      // --- HIT 2: "DUM" ---
      const dumTime = now + 0.22;

      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(110, dumTime);
      subOsc.frequency.exponentialRampToValueAtTime(38, dumTime + 1.8);

      subGain.gain.setValueAtTime(0, dumTime);
      subGain.gain.linearRampToValueAtTime(0.85, dumTime + 0.04);
      subGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.4);

      subOsc.connect(subGain);
      subGain.connect(master);
      subOsc.start(dumTime);
      subOsc.stop(dumTime + 2.5);

      const bodyOsc = ctx.createOscillator();
      const bodyFilter = ctx.createBiquadFilter();
      const bodyGain = ctx.createGain();

      bodyOsc.type = "sawtooth";
      bodyOsc.frequency.setValueAtTime(116.54, dumTime);
      bodyFilter.type = "lowpass";
      bodyFilter.frequency.setValueAtTime(500, dumTime);
      bodyFilter.frequency.exponentialRampToValueAtTime(90, dumTime + 1.5);
      bodyFilter.Q.setValueAtTime(4, dumTime);

      bodyGain.gain.setValueAtTime(0, dumTime);
      bodyGain.gain.linearRampToValueAtTime(0.4, dumTime + 0.05);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.2);

      bodyOsc.connect(bodyFilter);
      bodyFilter.connect(bodyGain);
      bodyGain.connect(master);
      bodyOsc.start(dumTime);
      bodyOsc.stop(dumTime + 2.3);

      const shimmerOsc = ctx.createOscillator();
      const shimmerFilter = ctx.createBiquadFilter();
      const shimmerGain = ctx.createGain();

      shimmerOsc.type = "triangle";
      shimmerOsc.frequency.setValueAtTime(466.16, dumTime);
      shimmerFilter.type = "bandpass";
      shimmerFilter.frequency.setValueAtTime(900, dumTime);
      shimmerFilter.Q.setValueAtTime(6, dumTime);

      shimmerGain.gain.setValueAtTime(0, dumTime);
      shimmerGain.gain.linearRampToValueAtTime(0.2, dumTime + 0.03);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 1.4);

      shimmerOsc.connect(shimmerFilter);
      shimmerFilter.connect(shimmerGain);
      shimmerGain.connect(master);
      shimmerOsc.start(dumTime);
      shimmerOsc.stop(dumTime + 1.5);
    } catch (err) {
      console.warn("Audio playback error:", err);
    }
  }

  /**
   * Subtle high-tech UI click/hover sound
   */
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }
}

export const netflixAudio = new NetflixAudioEngine();
