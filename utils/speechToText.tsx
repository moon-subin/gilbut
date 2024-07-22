import { SpeechClient } from '@google-cloud/speech';
import { GOOGLEMAP_KEY } from '@env';

export default async function speechToText(audioContent) {
    try {
        const client = new SpeechClient({
            keyFilename: GOOGLEMAP_KEY,
        });

        const request = {
            audio: {
                content: audioContent,
            },
            config: {
                encoding: 'LINEAR16',
                sampleRateHertz: 16000,
                languageCode: 'en-US',
            },
        };

        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        return transcription;
    } catch (error) {
        console.error('Error during speech-to-text:', error);
        throw error;
    }
}