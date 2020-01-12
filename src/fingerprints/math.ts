import { FingerprintIntarface, Attribute } from './fingerprintIntarface'

interface Math {
  asinh(x: number): number
  acosh(x: number): number
  atanh(x: number): number
  expm1(x: number): number
  cbrt(x: number): number
  log1p(x: number): number
  sinh(x: number): number
  cosh(x: number): number
  tanh(x: number): number
}

export class MathFP implements FingerprintIntarface {
  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    fingerprints.set('math_asinh', new Attribute(String(Math.asinh(1)), 1))
    fingerprints.set('math_acosh', new Attribute(String(Math.acosh(1e300)), 1))
    fingerprints.set('math_atanh', new Attribute(String(Math.atanh(0.5)), 1))
    fingerprints.set('math_expm1', new Attribute(String(Math.expm1(1)), 1))
    fingerprints.set('math_cbrt', new Attribute(String(Math.cbrt(100)), 1))
    fingerprints.set('math_log1p', new Attribute(String(Math.log1p(10)), 1))
    fingerprints.set('math_sinh', new Attribute(String(Math.sinh(1)), 1))
    fingerprints.set('math_cosh', new Attribute(String(Math.cosh(10)), 1))
    fingerprints.set('math_tanh', new Attribute(String(Math.tanh(1)), 1))

    return fingerprints
  }
}
