export class ScreenRecorder {
    private recordedChunks: Blob[] = [];
    private recorder: MediaRecorder | null = null;
  
    async start(): Promise<void> {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
        this.recorder = new MediaRecorder(stream);
        
        this.recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };
  
        this.recorder.start();
      } catch (error) {
        console.error('Error starting screen recording:', error);
        throw error;
      }
    }
  
    stop(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (!this.recorder) {
          reject(new Error('Screen recorder not initialized'));
          return;
        }
  
        this.recorder.onstop = () => {
          resolve();
        };
  
        this.recorder.stop();
        this.recorder.stream.getTracks().forEach(track => track.stop());
      });
    }
  
    getRecordingUrl(): string {
      const blob = new Blob(this.recordedChunks, { type: "video/webm" });
      return URL.createObjectURL(blob);
    }
  }