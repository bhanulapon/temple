/**
 * Web Audio API based sacred temple acoustics
 * Resonant brass bell chime and conch drone with zero external network dependencies
 */

class TempleAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playTempleBell() {
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // Realistic temple brass bell with harmonic partials
      const partials = [
        { freq: 880, gain: 0.35, decay: 2.8 },    // Fundamental
        { freq: 1760, gain: 0.22, decay: 2.1 },   // 2nd harmonic
        { freq: 2640, gain: 0.15, decay: 1.6 },   // 3rd harmonic
        { freq: 3960, gain: 0.08, decay: 1.1 },   // 4th harmonic
        { freq: 5280, gain: 0.04, decay: 0.7 },   // Shimmer strike
      ];

      partials.forEach(p => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);

        // Strike transient & natural exponential ring decay
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.exponentialRampToValueAtTime(p.gain, now + 0.015);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + p.decay);
      });
    } catch {
      // AudioContext could be blocked by autoplay policies until interaction
    }
  }

  public playSacredConch() {
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const duration = 2.4;

      // Conch / Shankha low sacred drone
      const osc = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc2.type = 'triangle';

      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.8);
      osc.frequency.exponentialRampToValueAtTime(220, now + duration);

      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(660, now + 0.8);
      osc2.frequency.exponentialRampToValueAtTime(440, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // AudioContext failure catch
    }
  }
}

export const templeAudio = new TempleAudioPlayer();
