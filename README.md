# monogram

Browser fingerprint library

## Usage

```javascript
var monogram = new monogram.Monogram()

// print json data
var json = monogram.json()
console.log(json)
```

The data collected contains unstable data. When generating a hash, select and generate stable data.

```javascript
var monogram = new monogram.Monogram()

// generate a hash
var hash = monogram.hash([
  'webgl_unmasked_vendor',
  'webgl_unmasked_renderer',
  'webgl_shader_language_version',
  'webgl_vendor',
  'webgl_version',
  'webgl_renderer',
  'webgl_hash',
  'canvas_hash',
  'timezone',
  'platform',
  'languages',
  'cookie_enabled',
  'plugin_list_hash',
  'screen_width',
  'screen_height',
  'screen_avail_width',
  'screen_avail_height',
  'screen_color_depth',
  'screen_pixel_depth',
  'screen_orientation_angle',
  'screen_orientation_type',
  'screen_device_pixel_ratio',
  'screen_inner_width',
  'screen_inner_height'
])
console.log(hash)
```
