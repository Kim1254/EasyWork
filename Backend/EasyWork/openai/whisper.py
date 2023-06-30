import numpy as np
import ffmpeg
import torch, whisper

model = whisper.load_model('base')

# Check detailed information on: https://github.com/openai/whisper#python-usage
def SpeechToText(audio):
    audio = whisper.load_audio(audio)
    audio = whisper.pad_or_trim(audio)

    # make log-Mel spectrogram and move to the same device as the model
    mel = whisper.log_mel_spectrogram(audio).to(model.device)

    # detect the spoken language
    _, probs = model.detect_language(mel)

    # decode the audio
    options = whisper.DecodingOptions(fp16=torch.cuda.is_available())
    result = whisper.decode(model, mel, options)

    lang = max(probs, key=probs.get)
    
    if not lang == 'ko':
        return {'result': ''}
    
    return {'result': result.text}
