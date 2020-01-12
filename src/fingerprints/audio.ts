import { FingerprintIntarface, Attribute } from './fingerprintIntarface'

export class Audio implements FingerprintIntarface {
  fingerprint(fingerprints: Map<string, Attribute>): Map<string, Attribute> {
    const audioCtx = new AudioContext()
    if (audioCtx != null) {
      fingerprints.set('audio_state', new Attribute(String(audioCtx.state), 1))
      fingerprints.set('audio_sample_rate', new Attribute(String(audioCtx.sampleRate), 1))
      fingerprints.set('audio_base_latency', new Attribute(String(audioCtx.baseLatency), 1))

      const destination = audioCtx.destination
      fingerprints.set('audio_destination_max_channel_count', new Attribute(String(destination.maxChannelCount), 1))
      fingerprints.set('audio_destination_number_of_inputs', new Attribute(String(destination.numberOfInputs), 1))
      fingerprints.set('audio_destination_number_of_outputs', new Attribute(String(destination.numberOfOutputs), 1))
      fingerprints.set('audio_destination_channel_count', new Attribute(String(destination.channelCount), 1))
      fingerprints.set('audio_destination_channel_count_mode', new Attribute(String(destination.channelCountMode), 1))
      fingerprints.set(
        'audio_destination_channel_interpretation',
        new Attribute(String(destination.channelInterpretation), 1)
      )

      const analyser = audioCtx.createAnalyser()
      fingerprints.set('audio_analyser_fft_size', new Attribute(String(analyser.fftSize), 1))
      fingerprints.set('audio_analyser_frequency_bin_count', new Attribute(String(analyser.frequencyBinCount), 1))
      fingerprints.set('audio_analyser_min_decibels', new Attribute(String(analyser.minDecibels), 1))
      fingerprints.set('audio_analyser_max_decibels', new Attribute(String(analyser.maxDecibels), 1))
      fingerprints.set(
        'audio_analyser_smoothing_time_constant',
        new Attribute(String(analyser.smoothingTimeConstant), 1)
      )
      fingerprints.set('audio_analyser_number_of_inputs', new Attribute(String(analyser.numberOfInputs), 1))
      fingerprints.set('audio_analyser_number_of_outputs', new Attribute(String(analyser.numberOfOutputs), 1))
      fingerprints.set('audio_analyser_channel_count', new Attribute(String(analyser.channelCount), 1))
      fingerprints.set('audio_analyser_channel_count_mode', new Attribute(String(analyser.channelCountMode), 1))
      fingerprints.set(
        'audio_analyser_channel_interpretation',
        new Attribute(String(analyser.channelInterpretation), 1)
      )
    }
    return fingerprints
  }
}
