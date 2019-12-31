import { FingerprintIntarface, Attribute } from './fingerprintIntarface'

export class NavigationTiming implements FingerprintIntarface {
  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    const timing = window.performance.timing

    fingerprints.set('redirect', new Attribute(String(timing.redirectEnd - timing.redirectStart), 1))
    fingerprints.set('app_cache', new Attribute(String(timing.domainLookupStart - timing.fetchStart), 1))
    fingerprints.set('dns', new Attribute(String(timing.domainLookupEnd - timing.domainLookupStart), 1))
    fingerprints.set('tcp', new Attribute(String(timing.connectEnd - timing.connectStart), 1))
    fingerprints.set('request', new Attribute(String(timing.responseStart - timing.requestStart), 1))
    fingerprints.set('response', new Attribute(String(timing.responseEnd - timing.responseStart), 1))

    return fingerprints
  }
}
