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

const brazilianFamousVoices = {
  jogadores: [
    { id: 'pele', nome: 'Pelé', categoria: 'Jogador Lendário', trilha: 'estadio_lotado', frase: 'O futebol é a coisa mais importante...' },
    { id: 'galvao-bueno', nome: 'Galvão Bueno', categoria: 'Narrador', trilha: 'estadio_lotado', frase: 'Haja coração!' },
    { id: 'neymar', nome: 'Neymar Jr.', categoria: 'Jogador', trilha: 'estadio_lotado', frase: 'Ousadia e alegria' },
  ],
  apresentadores: [
    { id: 'silvio-santos', nome: 'Silvio Santos', categoria: 'Apresentador', trilha: 'auditorio_sbt', frase: 'Quem quer dinheiro?' },
    { id: 'faustao', nome: 'Faustão', categoria: 'Apresentador', trilha: 'auditorio_sbt', frase: 'Ô loco, meu!' },
  ],
  outros: [
    { id: 'cid-moreira', nome: 'Cid Moreira', categoria: 'Narrador', trilha: 'suspense_jornal', frase: 'Boa noite.' },
    { id: 'fernanda-montenegro', nome: 'Fernanda Montenegro', categoria: 'Atriz', trilha: 'suspense_jornal', frase: 'A vida é a arte do encontro' },
  ]
};

const soundtracks = [
  { id: 'auto', name: '🪄 Automática' },
  { id: 'none', name: '🔇 Sem Trilha' },
  { id: 'estadio_lotado', name: '🏟️ Estádio' },
  { id: 'auditorio_sbt', name: '📺 Auditório' },
  { id: 'suspense_jornal', name: '🕵️ Suspense' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState('auto');
  const [theme, setTheme] = useState<'jogadores' | 'apresentadores' | 'outros'>('jogadores');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

  const handleGenerate = async () => {
    if (loading || !selectedVoice || !text) return;
    setLoading(true);
    try {
      setResult('Misturando voz e trilha sonora...');
      
      const voiceObj = [...brazilianFamousVoices.jogadores, ...brazilianFamousVoices.apresentadores, ...brazilianFamousVoices.outros].find(v => v.id === selectedVoice);
      const trackToUse = selectedTrack === 'auto' ? voiceObj?.trilha : selectedTrack;

      const args = JSON.stringify({
        text: text,
        voice_id: selectedVoice,
        track_id: trackToUse === 'none' ? null : trackToUse,
        outdir: '/storage/emulated/0/Download',
      });
      
      const response = await PythonModule.callPython('python_wrapper', 'generate_tts', args);
      const data = JSON.parse(response);
      
      if (data.status === 'success') {
        setResult(`Sucesso! Trilha: ${trackToUse}\nArquivo: ${data.path}`);
        await audioRecorderPlayer.startPlayer(data.path);
        setIsPlaying(true);
      } else {
        setResult(`Erro: ${data.message}`);
      }
    } catch (e: any) {
      setResult(`Erro: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Narrador Famoso</Text>
        <Text style={styles.subtitle}>IA + Trilhas Inteligentes</Text>
        
        <View style={styles.themeSelector}>
          {(['jogadores', 'apresentadores', 'outros'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.themeBtn, theme === t && styles.themeBtnActive]}
              onPress={() => setTheme(t)}
            >
              <Text style={[styles.themeBtnText, theme === t && styles.themeBtnTextActive]}>{t.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.voicesGrid}>
          {brazilianFamousVoices[theme].map(voice => (
            <TouchableOpacity 
              key={voice.id}
              style={[styles.voiceCard, selectedVoice === voice.id && styles.voiceCardSelected]}
              onPress={() => setSelectedVoice(voice.id)}
            >
              <Text style={styles.voiceName}>{voice.nome}</Text>
              <Text style={styles.voiceCategory}>{voice.categoria}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedVoice && (
          <View style={styles.controlsCard}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Digite o texto..."
              placeholderTextColor="#64748b"
              multiline
            />

            <Text style={styles.sectionLabel}>🎵 Trilha de Fundo:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trackScroll}>
              {soundtracks.map(track => (
                <TouchableOpacity
                  key={track.id}
                  style={[styles.trackChip, selectedTrack === track.id && styles.trackChipActive]}
                  onPress={() => setSelectedTrack(track.id)}
                >
                  <Text style={[styles.trackChipText, selectedTrack === track.id && styles.trackChipTextActive]}>
                    {track.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={[styles.generateBtn, (loading || !text) && styles.btnDisabled]} 
              onPress={handleGenerate}
              disabled={loading || !text}
            >
              <Text style={styles.generateBtnText}>
                {loading ? '🎙️ Mixando...' : '🔊 Gerar com Trilha'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.resultCard}>
          <Text style={styles.resultText}>{result || 'Pronto para narrar.'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#38bdf8', textAlign: 'center' },
  subtitle: { fontSize: 10, color: '#94a3b8', textAlign: 'center', marginBottom: 20, letterSpacing: 2 },
  themeSelector: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
  themeBtn: { backgroundColor: '#1e293b', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  themeBtnActive: { backgroundColor: '#38bdf8' },
  themeBtnText: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' },
  themeBtnTextActive: { color: '#0f172a' },
  voicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, marginBottom: 20 },
  voiceCard: { width: (SCREEN_WIDTH - 50) / 2, backgroundColor: '#1e293b', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#334155' },
  voiceCardSelected: { borderColor: '#38bdf8' },
  voiceName: { color: '#f8fafc', fontSize: 14, fontWeight: 'bold' },
  voiceCategory: { color: '#38bdf8', fontSize: 9, fontWeight: 'bold' },
  controlsCard: { backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: 20, padding: 15, marginBottom: 20 },
  input: { backgroundColor: '#0f172a', borderRadius: 10, padding: 12, color: '#f8fafc', minHeight: 80, textAlignVertical: 'top', marginBottom: 15 },
  sectionLabel: { color: '#38bdf8', fontSize: 10, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' },
  trackScroll: { marginBottom: 15 },
  trackChip: { backgroundColor: '#0f172a', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, marginRight: 8, borderWidth: 1, borderColor: '#1e293b' },
  trackChipActive: { backgroundColor: '#38bdf8', borderColor: '#38bdf8' },
  trackChipText: { color: '#94a3b8', fontSize: 10 },
  trackChipTextActive: { color: '#0f172a', fontWeight: 'bold' },
  generateBtn: { backgroundColor: '#38bdf8', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnDisabled: { opacity: 0.5 },
  generateBtnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 14 },
  resultCard: { backgroundColor: '#111827', borderRadius: 10, padding: 15, borderLeftWidth: 3, borderLeftColor: '#38bdf8' },
  resultText: { color: '#94a3b8', fontSize: 12 },
});

export default App;
