import { FingerprintIntarface, Attribute } from './fingerprintIntarface'
import * as twgl from 'twgl.js'
import sha3 from 'crypto-js/sha3'
import Hex from 'crypto-js/enc-hex'

export class Webgl implements FingerprintIntarface {
  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    const width = 200
    const height = 200

    const canvasElement = document.createElement('canvas')
    canvasElement.hidden = true
    const canvas = document.body.appendChild(canvasElement)

    canvas.width = width
    canvas.height = height

    const ctx =
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('experimental-webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true }) ||
      canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true })

    if (ctx != null) {
      const debugInfo = ctx.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo != null) {
        fingerprints.set('webgl_unmasked_vendor', new Attribute(ctx.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL), 1))
        fingerprints.set(
          'webgl_unmasked_renderer',
          new Attribute(ctx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL), 1)
        )
      }

      fingerprints.set(
        'webgl_shader_language_version',
        new Attribute(ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION), 1)
      )
      fingerprints.set('webgl_vendor', new Attribute(ctx.getParameter(ctx.VENDOR), 1))
      fingerprints.set('webgl_version', new Attribute(ctx.getParameter(ctx.VERSION), 1))
      fingerprints.set('webgl_renderer', new Attribute(ctx.getParameter(ctx.RENDERER), 1))

      const webglHash = this.webglHash(ctx, width, height)
      if (webglHash != null) {
        fingerprints.set('webgl_hash', new Attribute(webglHash, 1))
      }
    }

    document.body.removeChild(canvasElement)

    return fingerprints
  }

  private webglHash(ctx: WebGLRenderingContext, width: number, height: number): string | null {
    const vs = `
attribute vec3 position;
attribute vec4 color;
uniform mat4 worldViewProjection;
varying vec4 vColor;

void main(void){
  vColor = color;
  gl_Position = worldViewProjection * vec4(position, 1.0);
}
`
    const fs = `
precision mediump float;
varying vec4 vColor;

void main(void){
  gl_FragColor = vColor;
}
`

    const programInfo = twgl.createProgramInfo(ctx, [vs, fs])
    if (programInfo != null) {
      const arrays = {
        position: [1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0],
        color: [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        indices: [0, 1, 2, 1, 2, 3]
      }
      const bufferInfo = twgl.createBufferInfoFromArrays(ctx, arrays)

      ctx.clearColor(0.0, 0.0, 0.0, 1.0)
      ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT)

      const m4 = twgl.m4
      const projection = m4.perspective((30 * Math.PI) / 180, width / height, 0.01, 100)
      const eye = [-2, -2, -3.5]
      const target = [0, 0, 0]
      const up = [0, 1, 0]

      const camera = m4.lookAt(eye, target, up)
      const view = m4.inverse(camera)
      const viewProjection = m4.multiply(projection, view)
      const world = m4.rotationY(0)

      const uniforms = {
        worldViewProjection: m4.multiply(viewProjection, world)
      }

      ctx.useProgram(programInfo.program)
      twgl.setBuffersAndAttributes(ctx, programInfo, bufferInfo)
      twgl.setUniforms(programInfo, uniforms)
      ctx.drawElements(ctx.TRIANGLES, bufferInfo.numElements, ctx.UNSIGNED_SHORT, 0)
      ctx.flush()

      const n = new Uint8Array(width * height * 4)
      ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, n)

      let hex = ''
      for (let i = 0; i < n.byteLength; i++) {
        hex += n[i].toString(16)
      }

      const hash = sha3(hex, { outputLength: 512 })

      return hash.toString(Hex)
    }
    return null
  }
}
