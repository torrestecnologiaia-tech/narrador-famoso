import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  TextInput,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const {PythonModule} = NativeModules;

// Configuração das vozes (Portada do brazilianVoices.js)
const brazilianFamousVoices = {
  jogadores: [
    { id: 'pele', nome: 'Pelé', categoria: 'Jogador Lendário', descricao: 'Voz pausada e sábia do Rei', frase: 'O futebol é a coisa mais importante...' },
    { id: 'galvao-bueno', nome: 'Galvão Bueno', categoria: 'Narrador', descricao: 'Voz emocionante das narrações', frase: 'Haja coração!' },
    { id: 'neymar', nome: 'Neymar Jr.', categoria: 'Jogador', descricao: 'Voz jovem e descontraída', frase: 'Ousadia e alegria' },
  ],
  apresentadores: [
    { id: 'silvio-santos', nome: 'Silvio Santos', categoria: 'Apresentador', descricao: 'Voz única e icônica', frase: 'Quem quer dinheiro?' },
    { id: 'faustao', nome: 'Faustão', categoria: 'Apresentador', descricao: 'Voz grave e estrondosa', frase: 'Ô loco, meu!' },
  ],
  outros: [
    { id: 'cid-moreira', nome: 'Cid Moreira', categoria: 'Narrador', descricao: 'A voz mais grave do Brasil', frase: 'Boa noite.' },
    { id: 'fernanda-montenegro', nome: 'Fernanda Montenegro', categoria: 'Atriz', descricao: 'Voz dramática e profunda', frase: 'A vida é a arte do encontro' },
  ]
};

const SCREEN_WIDTH = Dimensions.get('window').width;

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [theme, setTheme] = useState<'jogadores' | 'apresentadores' | 'outros'>('jogadores');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastAudioPath, setLastAudioPath] = useState('');

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

  const handleGenerate = async () => {
    if (loading || !selectedVoice || !text) return;
    setLoading(true);
    try {
      setResult('Iniciando Python e gerando narração famosa...');
      const args = JSON.stringify({
        text: text,
        voice_id: selectedVoice,
        outdir: '/storage/emulated/0/Download',
      });
      
      const response = await PythonModule.callPython(
        'python_wrapper',
        'generate_tts',
        args,
      );
      
      const data = JSON.parse(response);
      if (data.status === 'success') {
        setResult(`Narração gerada com sucesso!\nSalvo em: ${data.path}`);
        setLastAudioPath(data.path);
        onStartPlay(data.path);
      } else {
        setResult(`Erro: ${data.message}`);
      }
    } catch (e: any) {
      setResult(`Erro na Bridge: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onStartPlay = async (path: string) => {
    if (!path) return;
    setIsPlaying(true);
    try {
        await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.currentPosition === e.duration) {
            audioRecorderPlayer.stopPlayer();
            setIsPlaying(false);
          }
        });
    } catch (err) {
        setIsPlaying(false);
    }
  };

  const renderVoiceCard = (voice: any) => (
    <TouchableOpacity 
      key={voice.id}
      style={[styles.voiceCard, selectedVoice === voice.id && styles.voiceCardSelected]}
      onPress={() => setSelectedVoice(voice.id)}
    >
      <View style={styles.voiceAvatar}>
        <Text style={styles.avatarEmoji}>🎙️</Text>
      </View>
      <Text style={styles.voiceName}>{voice.nome}</Text>
      <Text style={styles.voiceCategory}>{voice.categoria}</Text>
      <Text style={styles.voiceQuote}>"{voice.frase}"</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Narrador Famoso</Text>
        <Text style={styles.subtitle}>IA de Voz Premium</Text>
        
        {/* Seletor de Tema */}
        <View style={styles.themeSelector}>
          {(['jogadores', 'apresentadores', 'outros'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.themeBtn, theme === t && styles.themeBtnActive]}
              onPress={() => setTheme(t)}
            >
              <Text style={[styles.themeBtnText, theme === t && styles.themeBtnTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Grid de Vozes */}
        <View style={styles.voicesGrid}>
          {brazilianFamousVoices[theme].map(renderVoiceCard)}
        </View>
        
        {/* Área de Controle */}
        {selectedVoice && (
          <View style={styles.controlsCard}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Digite o texto para narração..."
              placeholderTextColor="#64748b"
              multiline
            />
            
            <TouchableOpacity 
              style={[styles.generateBtn, (loading || !text) && styles.btnDisabled]} 
              onPress={handleGenerate}
              disabled={loading || !text}
            >
              <Text style={styles.generateBtnText}>
                {loading ? '🎙️ Gerando...' : '🔊 Gerar Narração'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Log de Atividade:</Text>
          <Text style={styles.resultText}>{result || 'Selecione uma voz e digite o texto.'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#38bdf8',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 25,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  themeBtn: {
    backgroundColor: '#1e293b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  themeBtnActive: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  themeBtnText: {
    color: '#94a3b8',
    fontWeight: 'bold',
    fontSize: 12,
  },
  themeBtnTextActive: {
    color: '#0f172a',
  },
  voicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  voiceCard: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },
  voiceCardSelected: {
    borderColor: '#38bdf8',
    backgroundColor: '#1e293b',
  },
  voiceAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#334155',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarEmoji: {
    fontSize: 18,
  },
  voiceName: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: 'bold',
  },
  voiceCategory: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  voiceQuote: {
    color: '#f59e0b',
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 8,
  },
  controlsCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 15,
    color: '#f8fafc',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  generateBtn: {
    backgroundColor: '#38bdf8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  generateBtnText: {
    color: '#0f172a',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  resultCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
    marginBottom: 40,
  },
  resultLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  resultText: {
    color: '#e2e8f0',
    fontSize: 13,
  },
});

export default App;
