import { Attribute } from './fingerprints/fingerprintIntarface'
import { Webgl } from './fingerprints/webgl'
import { Canvas } from './fingerprints/canvas'
import { Browser } from './fingerprints/browser'
import { NavigationTiming } from './fingerprints/navigationTiming'
import { Screen } from './fingerprints/screen'
import { Audio } from './fingerprints/audio'
import { MathFP } from './fingerprints/math'
import { Mouse } from './fingerprints/mouse'
import sha3 from 'crypto-js/sha3'
import Hex from 'crypto-js/enc-hex'

export class Monogram {
  private clientFingerprint: Map<string, Attribute>
  private mouse: Mouse

  constructor() {
    this.clientFingerprint = new Map<string, Attribute>()

    this.clientFingerprint = new Webgl().fingerprint(this.clientFingerprint)
    this.clientFingerprint = new Canvas().fingerprint(this.clientFingerprint)
    this.clientFingerprint = new Browser().fingerprint(this.clientFingerprint)
    this.clientFingerprint = new NavigationTiming().fingerprint(this.clientFingerprint)
    this.clientFingerprint = new Screen().fingerprint(this.clientFingerprint)
    this.clientFingerprint = new Audio().fingerprint(this.clientFingerprint)
    this.clientFingerprint = new MathFP().fingerprint(this.clientFingerprint)
    this.mouse = new Mouse()
    window.addEventListener('click', () => {
      this.clientFingerprint = this.mouse.fingerprint(this.clientFingerprint)
    })
    window.addEventListener('mousemove', () => {
      this.clientFingerprint = this.mouse.fingerprint(this.clientFingerprint)
    })
  }

  public json(): string {
    return JSON.stringify([...this.clientFingerprint])
  }

  public data(): Map<string, Attribute> {
    return this.clientFingerprint
  }

  public hash(useData: string[]): string {
    let raw = ''
    useData.forEach(key => {
      const feature = this.clientFingerprint.get(key)
      if (feature != null) {
        raw += feature.value
      }
    })

    const hash = sha3(raw, { outputLength: 512 })
    return hash.toString(Hex)
  }
}
