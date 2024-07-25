import { NativeModules } from 'react-native';
import Voice from 'react-native-voice';
import { SpeechClient } from '@google-cloud/speech';
import { GOOGLEMAP_KEY } from '@env';

const speech = new SpeechClient({
    keyFilename: GOOGLEMAP_KEY,
});

export const voiceRecognition = async () => {
    return new Promise((resolve, reject) => {
      Voice.onSpeechResults = async (event) => {
        const results = event.value;
        const request = {
          audio: {
            content: results[0], // Assuming the first result is the most accurate
          },
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
          },
        };
        try {
          const [response] = await speech.recognize(request);
          const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
          resolve(transcription);
        } catch (error) {
          reject(error);
        }
      };
  
      Voice.start('en-US');
    });
  };