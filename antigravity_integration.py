# antigravity_integration.py
from google.cloud import antigravity
from google.cloud.antigravity import types
import asyncio

class AntiGravityNarrator:
    def __init__(self, project_id, agent_id):
        self.client = antigravity.AgentServiceClient()
        self.agent_path = f"projects/{project_id}/agents/{agent_id}"
        self.session_id = None
        
    async def initialize_session(self):
        """Inicia uma sessão de narração"""
        session = await self.client.create_session(
            parent=self.agent_path,
            session={
                "display_name": "Sessão de Narração",
                "capabilities": ["voice_generation"]
            }
        )
        self.session_id = session.name
        return session
    
    async def generate_narration(self, text, voice_name, emotion="neutral"):
        """Gera narração usando AntiGravity"""
        
        # Criar intent de narração
        intent = types.Intent(
            display_name="generate_narration",
            training_phrases=[
                f"Narrar texto com voz {voice_name}",
                f"Quero ouvir {voice_name} narrando"
            ],
            parameters=[
                {
                    "display_name": "text",
                    "entity_type": "@sys.any",
                    "value": text
                },
                {
                    "display_name": "voice", 
                    "entity_type": "@voice_type",
                    "value": voice_name
                },
                {
                    "display_name": "emotion",
                    "entity_type": "@emotion_type", 
                    "value": emotion
                }
            ]
        )
        
        # Processar com AntiGravity
        response = await self.client.detect_intent(
            session=self.session_id,
            query_input={
                "text": {
                    "text": f"Narre: {text}",
                    "language_code": "pt-BR"
                }
            }
        )
        
        return self.extract_audio(response)
    
    def extract_audio(self, response):
        """Extrai áudio da resposta do AntiGravity"""
        if response.output_audio:
            return {
                "audio_content": response.output_audio,
                "duration": response.audio_duration,
                "format": "mp3",
                "voice_used": response.parameters.get("voice", "unknown")
            }
        return None
