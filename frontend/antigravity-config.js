// frontend/antigravity-config.js
import { AntiGravityClient } from '@google-cloud/antigravity-web';

const antigravityConfig = {
  projectId: 'seu-projeto-id',
  agentId: 'narrador-famoso-vozes',
  
  // Configurações de vozes famosas
  voices: {
    brasil: [
      {
        name: 'Galvão Bueno',
        type: 'custom',
        model: 'voice-cloning-v2',
        sample: 'galvao_sample.wav',
        features: ['narração_esportiva', 'emoção_alta']
      },
      {
        name: 'Cid Moreira',
        type: 'custom', 
        model: 'voice-cloning-v2',
        sample: 'cid_sample.wav',
        features: ['documentário', 'voz_grave']
      }
    ],
    internacional: [
      {
        name: 'Morgan Freeman',
        type: 'premium',
        provider: 'elevenlabs',
        languageAdaptation: true
      }
    ]
  },
  
  // Configurações de áudio
  audioSettings: {
    format: 'mp3',
    sampleRate: 48000,
    bitrate: '320kbps',
    effects: ['normalize', 'noise_reduction']
  }
};
