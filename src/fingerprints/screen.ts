import { FingerprintIntarface, Attribute } from './fingerprintIntarface'

export class Screen implements FingerprintIntarface {
  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    fingerprints.set('screen_width', new Attribute(String(window.screen.width), 1))
    fingerprints.set('screen_height', new Attribute(String(window.screen.height), 1))
    fingerprints.set('screen_avail_width', new Attribute(String(window.screen.availWidth), 1))
    fingerprints.set('screen_avail_height', new Attribute(String(window.screen.availHeight), 1))
    fingerprints.set('screen_color_depth', new Attribute(String(window.screen.colorDepth), 1))
    fingerprints.set('screen_pixel_depth', new Attribute(String(window.screen.pixelDepth), 1))
    fingerprints.set('screen_orientation_angle', new Attribute(String(window.screen.orientation.angle), 1))
    fingerprints.set('screen_orientation_type', new Attribute(String(window.screen.orientation.type), 1))
    fingerprints.set('screen_device_pixel_ratio', new Attribute(String(window.devicePixelRatio), 1))
    fingerprints.set('screen_inner_width', new Attribute(String(window.innerWidth), 1))
    fingerprints.set('screen_inner_height', new Attribute(String(window.innerHeight), 1))

    return fingerprints
  }
}
