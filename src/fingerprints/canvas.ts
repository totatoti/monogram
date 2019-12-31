import { FingerprintIntarface, Attribute } from './fingerprintIntarface'
import sha3 from 'crypto-js/sha3'
import Hex from 'crypto-js/enc-hex'

export class Canvas implements FingerprintIntarface {
  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    const width = 500
    const height = 80

    const canvasElement = document.createElement('canvas')
    canvasElement.hidden = true
    const canvas = document.body.appendChild(canvasElement)

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    if (ctx != null) {
      this.render(ctx)

      const hash = sha3(canvas.toDataURL(), { outputLength: 512 })
      fingerprints.set('canvas_hash', new Attribute(hash.toString(Hex), 1))
    }

    document.body.removeChild(canvasElement)

    return fingerprints
  }

  private render(ctx: CanvasRenderingContext2D): void {
    const canvasFont: string = '20px unknown-font-' + Math.floor(Math.random() * 10000).toString()

    ctx.beginPath()

    ctx.font = canvasFont
    ctx.fillStyle = '#ff0000'
    ctx.fillText('😀🍇abcdefghijklmnopqrstuvwxyz0123456789', 0, 30)
    ctx.strokeStyle = '#00ff00'
    ctx.strokeText('😀🍇abcdefghijklmnopqrstuvwxyz0123456789', 0, 60)
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = '#aaaaaa'
    ctx.fillRect(100, 0, 100, 80)
  }
}
