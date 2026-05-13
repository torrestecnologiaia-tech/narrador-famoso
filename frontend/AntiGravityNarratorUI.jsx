// AntiGravityNarratorUI.jsx
import React, { useState, useEffect } from 'react';
import { useAntiGravity } from './hooks/useAntiGravity';

function NarradorAntiGravity() {
  const {
    initializeAgent,
    generateVoice,
    isProcessing,
    error
  } = useAntiGravity();
  
  const [agent, setAgent] = useState(null);
  const [narrations, setNarrations] = useState([]);
  
  useEffect(() => {
    // Inicializar agente AntiGravity
    initializeAgent()
      .then(agentInstance => setAgent(agentInstance))
      .catch(console.error);
  }, []);
  
  const handleNarrate = async (text, voice) => {
    if (!agent) return;
    
    const narration = await generateVoice({
      text,
      voice,
      settings: {
        emotion: 'dramatic',
        pace: 'medium',
        background: 'cinematic_music'
      }
    });
    
    setNarrations(prev => [...prev, narration]);
  };
  
  return (
    <div className="antigravity-narrator">
      <h2>🤖 Narrador IA - AntiGravity</h2>
      
      <div className="agent-status">
        Status: {agent ? '✅ Conectado' : '🔄 Conectando...'}
      </div>
      
      <div className="voice-selection">
        <h3>Vozes Famosas Disponíveis:</h3>
        <VoiceGrid 
          voices={antigravityConfig.voices}
          onSelect={handleNarrate}
        />
      </div>
      
      <div className="narration-history">
        <h3>Últimas Narrações:</h3>
        {narrations.map((narration, index) => (
          <AudioCard key={index} narration={narration} />
        ))}
      </div>
    </div>
  );
}
