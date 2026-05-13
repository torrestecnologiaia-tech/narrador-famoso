import tts_direct
import asyncio
import json
import os
from pathlib import Path

# Cache para o modelo Whisper (carregado sob demanda)
_whisper_model = None

def get_whisper_model(model_size="tiny", download_root="/storage/emulated/0/Download/models"):
    global _whisper_model
    if _whisper_model is None:
        from faster_whisper import WhisperModel
        os.makedirs(download_root, exist_ok=True)
        # Usamos CPU e INT8 para economia de memória e bateria no mobile
        _whisper_model = WhisperModel(
            model_size, 
            device="cpu", 
            compute_type="int8", 
            download_root=download_root
        )
    return _whisper_model

def generate_tts(json_args):
    """
    Exemplo de chamada via Java:
    Python.getInstance().getModule("python_wrapper").callAttr("generate_tts", "{'text': 'Olá', 'lang': 'pt', 'outdir': '/storage/emulated/0/Download'}")
    """
    try:
        args = json.loads(json_args)
        text = args.get("text", "")
        lang = args.get("lang", "pt")
        outdir_str = args.get("outdir", "/storage/emulated/0/Download")
        outdir = Path(outdir_str)
        
        if not outdir.exists():
            outdir.mkdir(parents=True, exist_ok=True)
            
        # Para o APK inicial, vamos usar o Edge TTS que é mais leve (mas requer internet)
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        path = loop.run_until_complete(tts_direct.run_edge(text, lang, None, outdir))
        
        return json.dumps({"status": "success", "path": str(path)})
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})

def transcribe(json_args):
    try:
        args = json.loads(json_args)
        audio_path = args.get("audio_path")
        model_size = args.get("model_size", "tiny")
        cache_dir = args.get("cache_dir", "/storage/emulated/0/Download/models")
        
        if not audio_path or not os.path.exists(audio_path):
            return json.dumps({"status": "error", "message": "Arquivo de áudio não encontrado."})

        model = get_whisper_model(model_size, cache_dir)
        segments, info = model.transcribe(audio_path, beam_size=5)
        
        full_text = " ".join([segment.text for segment in segments])
        
        return json.dumps({
            "status": "success", 
            "text": full_text.strip(),
            "language": info.language,
            "probability": info.language_probability
        })
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})

def check_requirements():
    try:
        import edge_tts
        import librosa
        import scipy
        return "Dependencies loaded successfully: edge-tts, librosa, scipy."
    except Exception as e:
        return f"Error loading dependencies: {str(e)}"

def test_connection():
    return "Python is working inside Android!"
