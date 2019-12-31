import { FingerprintIntarface, Attribute } from './fingerprintIntarface'
import sha3 from 'crypto-js/sha3'
import Hex from 'crypto-js/enc-hex'

export class Browser implements FingerprintIntarface {
  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    fingerprints.set('timezone', new Attribute(String(new Date().getTimezoneOffset()), 1))
    fingerprints.set('user_agent', new Attribute(window.navigator.userAgent, 1))
    fingerprints.set('platform', new Attribute(navigator.platform, 1))
    fingerprints.set('languages', new Attribute(window.navigator.languages.join(','), 1))
    fingerprints.set('cookie_enabled', new Attribute(String(navigator.cookieEnabled), 1))
    fingerprints.set('plugin_list_hash', new Attribute(this.pluginListHash(), 1))

    return fingerprints
  }

  private pluginListHash(): string {
    let plugin = ''

    const pluginLength = navigator.plugins.length == null ? 0 : navigator.plugins.length

    for (let i = 0; i < pluginLength; i++) {
      plugin += navigator.plugins[i].name == null ? '' : navigator.plugins[i].name
      plugin += navigator.plugins[i].filename == null ? '' : navigator.plugins[i].filename
      plugin += navigator.plugins[i].description == null ? '' : navigator.plugins[i].description
    }

    const hash = sha3(plugin, { outputLength: 512 })

    return hash.toString(Hex)
  }
}
