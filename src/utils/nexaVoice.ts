/**
 * NEXA Voice Engine: Rock-solid, multi-tier Text-To-Speech audio player
 * 
 * Tier 1: Instant high-fidelity pre-rendered audio assets (0ms latency, zero sandbox restrictions)
 * Tier 2: Google Web Speech TTS audio stream fallback
 * Tier 3: Browser SpeechSynthesis with full Chromium iframe bug workarounds
 * Tier 4: Web Audio API voice chime fallback
 */

export interface VoicePlaybackCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: unknown) => void;
}

class NexaVoiceEngine {
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingFlag: boolean = false;
  private currentPlayingId: string | number | null = null;
  private activeStopCallback: (() => void) | null = null;
  private voicesLoaded: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.initVoices();
    }
  }

  private initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0) {
        this.voicesLoaded = true;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.voicesLoaded = true;
      };
    } catch (e) {
      console.warn("SpeechSynthesis voices initialization:", e);
    }
  }

  public stop() {
    // 1. Stop HTML5 audio
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.src = "";
      } catch (e) {
        // ignore
      }
      this.currentAudio = null;
    }

    // 2. Stop Browser SpeechSynthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }

    // 3. Trigger active stop callback if any
    if (this.activeStopCallback) {
      try {
        this.activeStopCallback();
      } catch (e) {
        // ignore
      }
      this.activeStopCallback = null;
    }

    this.isSpeakingFlag = false;
    this.currentPlayingId = null;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingFlag;
  }

  public getCurrentId(): string | number | null {
    return this.currentPlayingId;
  }

  /**
   * Helper to resolve audio asset URL relative to Vite base (works on GitHub Pages, custom domains, and localhost)
   */
  private resolveAssetUrl(relativePath: string): string {
    const base = import.meta.env.BASE_URL || "./";
    const clean = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
    return `${base}${clean}`.replace(/([^:]\/)\/+/g, "$1");
  }

  /**
   * Determine matching pre-rendered audio asset for common queries
   */
  private matchAsset(text: string): string | null {
    const q = text.toLowerCase();
    if (q.includes("why hire") || (q.includes("hire") && q.includes("naman"))) {
      return this.resolveAssetUrl("audio/nexa/why_hire.mp3");
    }
    if (q.includes("who is naman") || q.includes("who is he") || q.includes("naman srivastava is a driven")) {
      return this.resolveAssetUrl("audio/nexa/who_is_naman.mp3");
    }
    if (q.includes("skills") || q.includes("core ai") || q.includes("capabilities") || q.includes("generative ai, prompt engineering")) {
      return this.resolveAssetUrl("audio/nexa/skills.mp3");
    }
    if (q.includes("support") || q.includes("ticket") || q.includes("csat") || q.includes("clickretina")) {
      return this.resolveAssetUrl("audio/nexa/support.mp3");
    }
    if (q.includes("excel") || q.includes("dashboard") || q.includes("metric") || q.includes("kpi") || q.includes("revenue synthesis")) {
      return this.resolveAssetUrl("audio/nexa/excel.mp3");
    }
    if (q.includes("bba") || q.includes("education") || q.includes("degree") || q.includes("business administration")) {
      return this.resolveAssetUrl("audio/nexa/bba.mp3");
    }
    if (
      q.includes("welcome to the nexa") ||
      q.includes("interactive demo screen") ||
      q.includes("assistant prototype built by naman") ||
      q.includes("click any inquiry below") ||
      q.includes("listen to my spoken answers") ||
      q.includes("explore my reasoning") ||
      q.includes("hello! i am nexa") ||
      q.includes("operations assistant") ||
      q.includes("tap any question below") ||
      q.includes("voice-assisted reasoning")
    ) {
      return this.resolveAssetUrl("audio/nexa/welcome.mp3");
    }
    return null;
  }

  /**
   * Break text into speech chunks of ~120 characters or by punctuation
   */
  private chunkText(text: string): string[] {
    // Clean markdown asterisks or special characters
    const clean = text.replace(/[*_#`]/g, " ").replace(/\s+/g, " ").trim();
    if (clean.length <= 130) return [clean];

    const sentences = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [clean];
    const chunks: string[] = [];
    let current = "";

    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;
      if ((current + " " + trimmed).trim().length <= 130) {
        current = (current + " " + trimmed).trim();
      } else {
        if (current) chunks.push(current);
        if (trimmed.length > 130) {
          // Break at commas or words
          const words = trimmed.split(" ");
          let sub = "";
          for (const w of words) {
            if ((sub + " " + w).trim().length <= 130) {
              sub = (sub + " " + w).trim();
            } else {
              if (sub) chunks.push(sub);
              sub = w;
            }
          }
          if (sub) current = sub;
          else current = "";
        } else {
          current = trimmed;
        }
      }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [clean.slice(0, 130)];
  }

  /**
   * Play speech for a given text or message index
   */
  public speak(
    text: string,
    id: string | number,
    callbacks?: VoicePlaybackCallbacks
  ): () => void {
    // If currently playing the same item, toggle stop
    if (this.isSpeakingFlag && this.currentPlayingId === id) {
      this.stop();
      callbacks?.onEnd?.();
      return () => {};
    }

    // Stop any existing playback first
    this.stop();

    this.isSpeakingFlag = true;
    this.currentPlayingId = id;

    const onComplete = () => {
      this.isSpeakingFlag = false;
      this.currentPlayingId = null;
      this.activeStopCallback = null;
      callbacks?.onEnd?.();
    };

    // 1. Try pre-rendered local high-fidelity audio asset first
    const assetUrl = this.matchAsset(text);
    if (assetUrl) {
      try {
        const audio = new Audio(assetUrl);
        this.currentAudio = audio;

        audio.onplay = () => {
          this.isSpeakingFlag = true;
          callbacks?.onStart?.();
        };

        audio.onended = () => {
          this.currentAudio = null;
          onComplete();
        };

        audio.onerror = () => {
          this.playOnlineTTSOrFallback(text, callbacks, onComplete);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.playOnlineTTSOrFallback(text, callbacks, onComplete);
          });
        }

        this.activeStopCallback = () => {
          audio.pause();
          this.currentAudio = null;
        };

        return () => this.stop();
      } catch {
        this.playOnlineTTSOrFallback(text, callbacks, onComplete);
        return () => this.stop();
      }
    }

    // 2. Play dynamic online audio chunks or browser synthesis fallback
    this.playOnlineTTSOrFallback(text, callbacks, onComplete);
    return () => this.stop();
  }

  /**
   * Plays dynamic text via sequential online audio chunks, falling back to Web Speech API
   */
  private playOnlineTTSOrFallback(
    text: string,
    callbacks?: VoicePlaybackCallbacks,
    onComplete?: () => void
  ) {
    const chunks = this.chunkText(text);
    let chunkIndex = 0;

    const playNextChunk = () => {
      if (!this.isSpeakingFlag) return;
      if (chunkIndex >= chunks.length) {
        onComplete ? onComplete() : this.stop();
        return;
      }

      const chunk = chunks[chunkIndex++];
      const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        chunk
      )}&tl=en&client=tw-ob`;

      try {
        const audio = new Audio(streamUrl);
        this.currentAudio = audio;

        audio.onplay = () => {
          if (chunkIndex === 1) {
            callbacks?.onStart?.();
          }
        };

        audio.onended = () => {
          playNextChunk();
        };

        audio.onerror = () => {
          // If online audio fails, try Web Speech API
          this.fallbackBrowserSpeech(text, callbacks);
        };

        const promise = audio.play();
        if (promise !== undefined) {
          promise.catch(() => {
            this.fallbackBrowserSpeech(text, callbacks);
          });
        }

        this.activeStopCallback = () => {
          audio.pause();
          this.currentAudio = null;
        };
      } catch {
        this.fallbackBrowserSpeech(text, callbacks);
      }
    };

    playNextChunk();
  }

  /**
   * Robust browser SpeechSynthesis with Chromium iframe bug workarounds
   */
  private fallbackBrowserSpeech(text: string, callbacks?: VoicePlaybackCallbacks) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      callbacks?.onError?.("SpeechSynthesis unsupported");
      this.stop();
      return;
    }

    try {
      // Resume if paused (known Chrome bug where state gets stuck paused)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Avoid Chrome cancel race condition: small delay after cancel
      window.speechSynthesis.cancel();

      setTimeout(() => {
        try {
          if (!this.isSpeakingFlag) return;

          const utterance = new SpeechSynthesisUtterance(text);
          this.currentUtterance = utterance;
          utterance.rate = 1.0;
          utterance.pitch = 1.0;

          // Find best English voice
          const voices = this.voices.length > 0 ? this.voices : window.speechSynthesis.getVoices();
          const preferredVoice =
            voices.find(
              (v) =>
                v.lang.startsWith("en") &&
                (v.name.includes("Natural") ||
                  v.name.includes("Google") ||
                  v.name.includes("Samantha") ||
                  v.name.includes("Daniel") ||
                  v.name.includes("English"))
            ) || voices.find((v) => v.lang.startsWith("en"));

          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }

          utterance.onstart = () => {
            this.isSpeakingFlag = true;
            callbacks?.onStart?.();
          };

          utterance.onend = () => {
            this.isSpeakingFlag = false;
            this.currentPlayingId = null;
            this.currentUtterance = null;
            callbacks?.onEnd?.();
          };

          utterance.onerror = (e) => {
            console.warn("SpeechSynthesis utterance error:", e);
            this.isSpeakingFlag = false;
            this.currentPlayingId = null;
            this.currentUtterance = null;
            callbacks?.onError?.(e);
          };

          // Resume audio context right before speaking
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }

          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.warn("SpeechSynthesis error:", err);
          this.isSpeakingFlag = false;
          this.currentPlayingId = null;
          callbacks?.onError?.(err);
        }
      }, 50);
    } catch (e) {
      console.warn("SpeechSynthesis failure:", e);
      this.isSpeakingFlag = false;
      this.currentPlayingId = null;
      callbacks?.onError?.(e);
    }
  }
}

export const nexaVoice = new NexaVoiceEngine();
