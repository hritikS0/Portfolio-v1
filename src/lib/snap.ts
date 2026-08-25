/**
 * A synthesized switch "snap" — a filtered noise transient for the click, plus
 * a short low thock for body.
 *
 * Synthesized rather than shipped as an .mp3 on purpose: no asset to download,
 * no network request on first toggle, and the envelope stays tunable in one
 * place. The whole sound is ~60ms.
 */

type AudioContextCtor = typeof AudioContext

let ctx: AudioContext | null = null
let noiseBuffer: AudioBuffer | null = null

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null

  const Ctor: AudioContextCtor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextCtor })
      .webkitAudioContext

  if (!Ctor) return null

  // Created lazily on the first toggle: browsers refuse to start an
  // AudioContext before a user gesture, and we don't want one at all for
  // visitors who never touch the switch.
  ctx ??= new Ctor()
  return ctx
}

/** ~80ms of white noise, generated once and reused for every snap. */
function getNoise(audio: AudioContext): AudioBuffer {
  if (noiseBuffer) return noiseBuffer

  const length = Math.floor(audio.sampleRate * 0.08)
  const buffer = audio.createBuffer(1, length, audio.sampleRate)
  const channel = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    channel[i] = Math.random() * 2 - 1
  }

  noiseBuffer = buffer
  return buffer
}

export function playSnap() {
  const audio = getContext()
  if (!audio) return

  try {
    // Safari suspends the context between gestures.
    if (audio.state === "suspended") void audio.resume()

    const now = audio.currentTime

    const master = audio.createGain()
    master.gain.value = 0.5
    master.connect(audio.destination)

    // The click: a noise burst squeezed through a bandpass so it reads as a
    // mechanical snap rather than a hiss.
    const click = audio.createBufferSource()
    click.buffer = getNoise(audio)

    const band = audio.createBiquadFilter()
    band.type = "bandpass"
    band.frequency.value = 1900
    band.Q.value = 1.1

    const clickGain = audio.createGain()
    clickGain.gain.setValueAtTime(0.0001, now)
    clickGain.gain.exponentialRampToValueAtTime(0.34, now + 0.002)
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

    click.connect(band).connect(clickGain).connect(master)

    // The body: a fast low thock so the snap has weight and doesn't sound thin
    // on laptop speakers.
    const thock = audio.createOscillator()
    thock.type = "triangle"
    thock.frequency.setValueAtTime(190, now)
    thock.frequency.exponentialRampToValueAtTime(110, now + 0.05)

    const thockGain = audio.createGain()
    thockGain.gain.setValueAtTime(0.0001, now)
    thockGain.gain.exponentialRampToValueAtTime(0.16, now + 0.004)
    thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

    thock.connect(thockGain).connect(master)

    click.start(now)
    click.stop(now + 0.08)
    thock.start(now)
    thock.stop(now + 0.08)
  } catch {
    // Audio is a garnish — if the context is blocked or the device has no
    // output, the toggle still works silently.
  }
}
