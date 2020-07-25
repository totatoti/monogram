import { Attribute } from '../src/fingerprints/fingerprintIntarface'
import { MathFP } from '../src/fingerprints/math'

describe('math test', () => {
  it('item are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint.size).toEqual(9)
  })
  it('math_asinh are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_asinh')?.value).toBe('0.881373587019543')
  })
  it('math_acosh are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_acosh')?.value).toBe('691.4686750787736')
  })
  it('math_atanh are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_atanh')?.value).toBe('0.5493061443340548')
  })
  it('math_expm1 are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_expm1')?.value).toBe('1.718281828459045')
  })
  it('math_cbrt are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_cbrt')?.value).toBe('4.641588833612779')
  })
  it('math_log1p are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_log1p')?.value).toBe('2.3978952727983707')
  })
  it('math_sinh are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_sinh')?.value).toBe('1.1752011936438014')
  })
  it('math_cosh are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_cosh')?.value).toBe('11013.232920103324')
  })
  it('math_tanh are retrieved', () => {
    var clientFingerprint = new Map<string, Attribute>()
    clientFingerprint = new MathFP()?.fingerprint(clientFingerprint)
    expect(clientFingerprint?.get('math_tanh')?.value).toBe('0.7615941559557649')
  })
})
