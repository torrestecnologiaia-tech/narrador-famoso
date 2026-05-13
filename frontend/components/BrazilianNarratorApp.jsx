// components/BrazilianNarratorApp.jsx
import React, { useState } from 'react';
import { useBrazilianVoices } from '../hooks/useBrazilianVoices';
import { exemplosNarracao } from '../config/exemplosNarracao';
import SoundtrackService from '../services/SoundtrackService';
import '../styles/BrazilianNarrator.css';

export function BrazilianNarratorApp() {
  const { narrate, getAvailableVoices, isLoading } = useBrazilianVoices();
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('auto');
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('futebol');
  
  const voices = getAvailableVoices();
  
  const themes = {
    futebol: {
      title: '⚽ Narração Esportiva',
      voices: [...voices.jogadores]
    },
    tv: {
      title: '📺 Apresentadores de TV',
      voices: [...voices.apresentadores]
    },
    cultura: {
      title: '🎭 Personalidades Brasileiras',
      voices: [...voices.outros]
    }
  };
  
  const handleGenerate = async (customText, customVoice) => {
    const textToUse = customText || text;
    const voiceToUse = customVoice || selectedVoice;
    
    if (!voiceToUse || !textToUse) return;
    
    try {
        const result = await narrate(textToUse, voiceToUse, {
          trackId: selectedTrack === 'auto' ? null : selectedTrack
        });
        
        const audio = new Audio(URL.createObjectURL(result.audio));
        audio.play();
    } catch (error) {
        console.error("Erro ao gerar narração:", error);
    }
  };
  
  const handleApplyTemplate = (template) => {
    setText(template.text);
    setSelectedVoice(template.voice);
    // Tentar encontrar o tema da voz
    if (voices.jogadores.find(v => v.id === template.voice)) setTheme('futebol');
    else if (voices.apresentadores.find(v => v.id === template.voice)) setTheme('tv');
    else setTheme('cultura');
  };

  const allVoicesFlat = [
    ...voices.jogadores,
    ...voices.apresentadores,
    ...voices.outros
  ];
  
  return (
    <div className="brazilian-narrator-app">
      <header className="app-header">
        <h1>🇧🇷 Narrador com Vozes Brasileiras Famosas</h1>
        <p>Escolha entre 20 personalidades icônicas do Brasil</p>
      </header>

      <div className="main-layout">
        {/* Sidebar Templates Épicos */}
        <aside className="epic-templates">
          <h3>🎯 Templates Épicos</h3>
          <div 
            className="template-card"
            onClick={() => handleApplyTemplate(exemplosNarracao.golDoBrasil)}
          >
            <h4>⚽ Golaço do Neymar</h4>
            <p>"GOOOOOOL! Neymar faz um golaço..."</p>
          </div>
          <div 
            className="template-card"
            onClick={() => handleApplyTemplate(exemplosNarracao.aberturaPrograma)}
          >
            <h4>📺 Luciano Huck</h4>
            <p>"Boa noite, Brasil! Hoje vamos transformar vidas..."</p>
          </div>
          <div 
            className="template-card"
            onClick={() => handleApplyTemplate(exemplosNarracao.momentoHumor)}
          >
            <h4>🎭 Chico Anysio</h4>
            <p>"É mentira, Terta? O Brasil hoje tá muito engraçado!"</p>
          </div>
        </aside>

        <main className="content-area">
          {/* Seletor de Tema */}
          <nav className="theme-selector">
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                className={`theme-btn ${key === theme ? 'active' : ''}`}
                onClick={() => setTheme(key)}
              >
                {t.title}
              </button>
            ))}
          </nav>
          
          {/* Grid de Vozes */}
          <div className="voices-grid">
            {themes[theme]?.voices.map(voice => (
              <div
                key={voice.id}
                className={`voice-card ${selectedVoice === voice.id ? 'selected' : ''}`}
                onClick={() => setSelectedVoice(voice.id)}
              >
                <div className="voice-placeholder">🎙️</div>
                <div className="voice-category">{voice.categoria}</div>
                <h3>{voice.nome}</h3>
                <p className="voice-description">{voice.descricao}</p>
                <p className="voice-quote">"{voice.frases_famosas[0]}"</p>
              </div>
            ))}
          </div>
          
          {/* Área de Texto e Geração */}
          {selectedVoice && (
            <div className="narration-controls">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite o texto para narração..."
                maxLength={500}
              />
              
              {/* Seletor de Trilha */}
              <div className="track-selector">
                <span className="selector-label">🎵 Trilha Sonora:</span>
                <select 
                  value={selectedTrack} 
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="track-select"
                >
                  <option value="auto">Mágica (Automática)</option>
                  <option value="none">Nenhuma (Voz Limpa)</option>
                  {SoundtrackService.getAvailableTracks().map(track => (
                    <option key={track.id} value={track.id}>{track.name}</option>
                  ))}
                </select>
              </div>
              
              <button
                className="generate-btn"
                onClick={() => handleGenerate()}
                disabled={isLoading || !text}
              >
                {isLoading ? '🎙️ Gerando...' : '🔊 Gerar Narração'}
              </button>
              
              <div className="voice-info">
                <p>Voz selecionada: <strong>{allVoicesFlat.find(v => v.id === selectedVoice)?.nome}</strong></p>
                <p>Caracteres: {text.length}/500</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
