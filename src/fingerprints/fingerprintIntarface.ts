export class Attribute {
  readonly value: string
  readonly version: number

  constructor(value: string, version: number) {
    this.value = value
    this.version = version
  }
}

export interface FingerprintIntarface {
  fingerprint(fingerprint: Map<string, Attribute>): Map<string, Attribute>
}
