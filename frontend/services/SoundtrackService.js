// services/SoundtrackService.js
class SoundtrackService {
  constructor() {
    this.tracks = {
      estadio_lotado: {
        name: '🏟️ Estádio Lotado',
        url: '/assets/audio/ambience/stadium.mp3',
        volume: 0.3
      },
      auditorio_sbt: {
        name: '📺 Auditório SBT',
        url: '/assets/audio/ambience/auditorium.mp3',
        volume: 0.4
      },
      suspense_jornal: {
        name: '🕵️ Suspense Jornalístico',
        url: '/assets/audio/ambience/suspense.mp3',
        volume: 0.25
      },
      clima_praia: {
        name: '🏖️ Clima de Praia',
        url: '/assets/audio/ambience/beach.mp3',
        volume: 0.35
      }
    };
  }

  getAvailableTracks() {
    return Object.entries(this.tracks).map(([id, data]) => ({
      id,
      ...data
    }));
  }

  // Simulação de mixagem (em um ambiente real, carregaríamos o buffer de áudio)
  async getTrackBuffer(ctx, trackId) {
    const track = this.tracks[trackId];
    if (!track) return null;
    
    // Placeholder: Em produção, faríamos o fetch do arquivo .mp3
    // Por agora, retornaremos a configuração para o mixador
    return track;
  }
}

export default new SoundtrackService();
