// hooks/useBrazilianVoices.js
import { useState } from 'react';
import BrazilianVoiceService from '../services/BrazilianVoiceService';
import { brazilianFamousVoices } from '../config/brazilianVoices';

export function useBrazilianVoices() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [error, setError] = useState(null);
  
  const narrate = async (text, voiceId) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await BrazilianVoiceService.generateBrazilianNarration(text, voiceId);
      setCurrentAudio(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getAvailableVoices = () => brazilianFamousVoices;
  
  return {
    narrate,
    getAvailableVoices,
    isLoading,
    currentAudio,
    error
  };
}
