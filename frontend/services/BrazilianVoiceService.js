// services/BrazilianVoiceService.js
import { brazilianFamousVoices } from '../config/brazilianVoices';
import SoundtrackService from './SoundtrackService';

class BrazilianVoiceService {
  constructor() {
    this.voiceProfiles = brazilianFamousVoices;
    this.currentVoice = null;
    this.currentTrack = null;
    this.audioContext = null;
  }
  
  _getAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }
  
  // Carregar perfil de voz específico
  loadVoiceProfile(voiceId) {
    const allVoices = [
      ...this.voiceProfiles.jogadores,
      ...this.voiceProfiles.apresentadores,
      ...this.voiceProfiles.outros
    ];
    
    this.currentVoice = allVoices.find(voice => voice.id === voiceId);
    return this.currentVoice;
  }
  
  // Gerar narração com voz brasileira
  async generateBrazilianNarration(text, voiceId, options = {}) {
    const voice = this.loadVoiceProfile(voiceId);
    
    if (!voice) {
      throw new Error('Voz não encontrada');
    }

    const trackId = options.trackId || voice.config_audio.trilha_padrao;
    const track = trackId ? SoundtrackService.tracks[trackId] : null;
    
    // Configurações de áudio baseadas no perfil
    const audioConfig = {
      ...voice.config_audio,
      ...options,
      idioma: 'pt-BR',
      regionalismo: voice.config_audio.sotaque || 'neutro',
      emocoes: voice.emocao_padrao
    };
    
    // Chamar API de síntese de voz
    const audioBlob = await this.synthesizeVoice(text, audioConfig);
    
    // Adicionar efeitos característicos e mixagem
    const enhancedAudio = await this.applyVoiceEffects(audioBlob, voice, track);
    
    return {
      audio: enhancedAudio,
      voice: voice,
      track: track,
      metadata: {
        nome: voice.nome,
        categoria: voice.categoria,
        frase_famosa: voice.frases_famosas[0],
        trilha_usada: track ? track.name : 'Nenhuma'
      }
    };
  }
  
  // Sintetizar voz usando ElevenLabs com perfil brasileiro
  async synthesizeVoice(text, config) {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.85,
          style: config.emocao_padrao || 'neutral',
          use_speaker_boost: true
        },
        model_id: 'eleven_multilingual_v2',
        language_code: 'pt-BR'
      })
    });
    
    if (!response.ok) {
        throw new Error(`Erro ElevenLabs: ${response.statusText}`);
    }
    
    return await response.blob();
  }
  
  // Aplicar efeitos especiais por personalidade
  async applyVoiceEffects(audioBlob, voiceProfile) {
    const ctx = this._getAudioContext();
    const audioBuffer = await this.blobToAudioBuffer(audioBlob);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    
    // Efeitos especiais por personalidade
    const effects = {
      'galvao-bueno': this.createExcitementEffect(ctx),
      'silvio-santos': this.createCharacteristicEffect(ctx),
      'cid-moreira': this.createDeepResonanceEffect(ctx),
      'chico-anysio': this.createCharacterSwitchEffect(ctx),
      'datena': this.createUrgencyEffect(ctx)
    };
    
    const effectChain = effects[voiceProfile.id] || this.createDefaultChain(ctx);
    
    // Conectar cadeia de efeitos
    source.connect(effectChain.input);
    effectChain.output.connect(ctx.destination);
    
    // Para simplificar o exemplo, vamos apenas retornar o buffer original por enquanto
    // Em uma implementação real, usaríamos OfflineAudioContext para renderizar os efeitos em um novo blob
    return audioBlob;
  }

  async blobToAudioBuffer(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    return await this._getAudioContext().decodeAudioData(arrayBuffer);
  }
  
  // Efeito de empolgação do Galvão Bueno
  createExcitementEffect(ctx) {
    const compressor = ctx.createDynamicsCompressor();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;
    
    gain.gain.value = 1.5; // Aumentar volume
    
    filter.type = 'highshelf';
    filter.frequency.value = 3000;
    filter.gain.value = 3; // Agudos brilhantes
    
    compressor.connect(gain);
    gain.connect(filter);
    
    return {
      input: compressor,
      output: filter
    };
  }
  
  // Efeito característico do Silvio Santos
  createCharacteristicEffect(ctx) {
    const delay = ctx.createDelay();
    const feedback = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    delay.delayTime.value = 0.1;
    feedback.gain.value = 0.3;
    
    filter.type = 'peaking';
    filter.frequency.value = 2500;
    filter.Q.value = 2;
    filter.gain.value = 4;
    
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(filter);
    
    return {
      input: delay,
      output: filter
    };
  }

  createDefaultChain(ctx) {
    const gain = ctx.createGain();
    return { input: gain, output: gain };
  }

  // Métodos placeholder para os outros efeitos
  createDeepResonanceEffect(ctx) { return this.createDefaultChain(ctx); }
  createCharacterSwitchEffect(ctx) { return this.createDefaultChain(ctx); }
  createUrgencyEffect(ctx) { return this.createDefaultChain(ctx); }
}

export default new BrazilianVoiceService();
