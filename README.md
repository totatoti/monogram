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
  'screen_inner_height',
  'audio_state',
  'audio_sample_rate',
  'audio_base_latency',
  'audio_destination_max_channel_count',
  'audio_destination_number_of_inputs',
  'audio_destination_number_of_outputs',
  'audio_destination_channel_count',
  'audio_destination_channel_count_mode',
  'audio_destination_channel_interpretation',
  'audio_analyser_fft_size',
  'audio_analyser_frequency_bin_count',
  'audio_analyser_min_decibels',
  'audio_analyser_max_decibels',
  'audio_analyser_smoothing_time_constant',
  'audio_analyser_number_of_inputs',
  'audio_analyser_number_of_outputs',
  'audio_analyser_channel_count',
  'audio_analyser_channel_count_mode',
  'audio_analyser_channel_interpretation',
  'math_asinh',
  'math_acosh',
  'math_atanh',
  'math_expm1',
  'math_cbrt',
  'math_log1p',
  'math_sinh',
  'math_cosh',
  'math_tanh'
])
console.log(hash)
```
