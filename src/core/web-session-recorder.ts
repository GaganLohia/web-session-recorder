// import { Injectable } from '@angular/core';
import { Logger } from './logger';
import { NetworkCapture, NetworkRequest, NetworkResponse } from './network-capture';
import { ScreenRecorder } from './screen-recorder';


// @Injectable({
//   providedIn: "root"
// })
export class WebSessionRecorder {
  private isRecording = false;
  private logger = new Logger();
  private networkCapture = new NetworkCapture();
  private screenRecorder = new ScreenRecorder();

  async start(): Promise<void> {
    if (this.isRecording) {
      console.warn('Recording is already in progress');
      return;
    }

    this.isRecording = true;
    this.logger.start();
    await this.screenRecorder.start();

    console.log('Recording started');
  }

  async stop(): Promise<{ logs: string; screenRecordingUrl: string }> {
    if (!this.isRecording) {
      console.warn('No recording in progress');
      return { logs: '', screenRecordingUrl: '' };
    }

    this.isRecording = false;
    this.logger.stop();

    try {
      await this.screenRecorder.stop();
    } catch (error) {
      console.error('Error stopping screen recording:', error);
    }

    const logs = this.logger.getLogs() + '\n\n' + this.networkCapture.getLogs();
    const screenRecordingUrl = this.screenRecorder.getRecordingUrl();

    console.log('Recording ended');

    return { logs, screenRecordingUrl };
  }

  captureNetworkActivity(request: NetworkRequest, response: NetworkResponse | null, error: Error | null = null): void {
    if (!this.isRecording) return;
    this.networkCapture.captureActivity(request, response, error);
  }
}