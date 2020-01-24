import { FingerprintIntarface, Attribute } from './fingerprintIntarface'

export class Mouse implements FingerprintIntarface {
  private clickPos: Array<string>
  private maxSpeedX: number
  private maxSpeedY: number
  private maxSpeed: number

  private startTimeStamp: number
  private prevX: number
  private prevY: number
  private lastScrollPos: number

  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    fingerprints.set('mouse_click_pos', new Attribute(String(this.clickPos.toString()), 1))
    fingerprints.set('mouse_max_speed_x', new Attribute(String(this.maxSpeedX), 1))
    fingerprints.set('mouse_max_speed_y', new Attribute(String(this.maxSpeedY), 1))
    fingerprints.set('mouse_max_speed', new Attribute(String(this.maxSpeed), 1))

    return fingerprints
  }

  constructor() {
    this.clickPos = new Array<string>()
    this.maxSpeedX = 0
    this.maxSpeedY = 0
    this.maxSpeed = 0

    this.startTimeStamp = performance.now()
    this.prevX = 0
    this.prevY = 0
    this.lastScrollPos = 0

    window.addEventListener('click', event => {
      const clickPos =
        event.pageX.toString() +
        ':' +
        event.pageY.toString() +
        ':' +
        (performance.now() - this.startTimeStamp).toString()

      this.clickPos.push(clickPos)
    })

    window.addEventListener('mousemove', event => {
      let scrollPos = 0
      if (document != null && document.scrollingElement != null) {
        scrollPos = document.scrollingElement.scrollTop
      }

      if (scrollPos === this.lastScrollPos) {
        if (Math.abs(event.pageX - this.prevX) > this.maxSpeedX && this.prevX !== 0) {
          this.maxSpeedX = Math.abs(event.pageX - this.prevX)
        }
        if (Math.abs(event.pageY - this.prevY) > this.maxSpeedY && this.prevY !== 0) {
          this.maxSpeedY = Math.abs(event.pageY - this.prevY)
        }
        if (Math.max(this.maxSpeedX, this.maxSpeedY) > this.maxSpeed) {
          this.maxSpeed = Math.max(this.maxSpeedX, this.maxSpeedY)
        }
      }

      this.prevX = event.pageX
      this.prevY = event.pageY
      this.lastScrollPos = scrollPos
    })
  }
}
