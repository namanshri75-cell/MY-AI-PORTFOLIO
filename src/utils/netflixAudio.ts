/**
 * Web Audio API synthesized Netflix-style "TA-DUM" sound effect and UI feedback
 * Pure client-side synthesis: zero external audio files, 100% reliable, zero network latency.
 */

class NetflixAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  /**
   * Synthesize the iconic cinematic Netflix "TA-DUM" sound.
   * Two primary impacts:
   * 1. Initial deep cinematic sub-bass punch (~65Hz) with quick transient
   * 2. The resonant signature metallic/orchestral chime hit (~130Hz expanding with harmonic overtone shimmer)
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

      // --- HIT 2: "DUM" (The massive iconic orchestral bass slam + harmonic shimmer) ---
      const dumTime = now + 0.22; // delayed strike

      // 2A. Deep sub-bass foundation
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

      // 2B. Resonant saw/triangle timbre representing the cello/timpani body
      const bodyOsc = ctx.createOscillator();
      const bodyFilter = ctx.createBiquadFilter();
      const bodyGain = ctx.createGain();

      bodyOsc.type = "sawtooth";
      bodyOsc.frequency.setValueAtTime(116.54, dumTime); // B-flat note vibe
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

      // 2C. Shimmering high harmonic anvil/chime (the metallic texture)
      const shimmerOsc = ctx.createOscillator();
      const shimmerFilter = ctx.createBiquadFilter();
      const shimmerGain = ctx.createGain();

      shimmerOsc.type = "triangle";
      shimmerOsc.frequency.setValueAtTime(466.16, dumTime); // Bb4
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
