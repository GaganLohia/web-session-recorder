# web-session-recorder


## Usage in vanilla JavaScript/TypeScript project

```
import { SessionRecorder } from 'session-recorder';

const recorder = new SessionRecorder();

async function startRecording() {
  await recorder.start();
}

async function stopRecording() {
  const result = await recorder.stop();
  console.log('Logs:', result.logs);
  console.log('Screen Recording URL:', result.screenRecordingUrl);
}

// To manually capture network activity, if you are using something else then fetch API https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

recorder.captureNetworkActivity(
  { url: 'https://api.example.com', method: 'GET', headers: {}, body: null },
  { status: 200, statusText: 'OK', headers: {}, body: { data: 'example' } }
);

```

## Usage in Angular Project

```
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionRecorder, WebSessionRecorderAngularInterceptor } from 'session-recorder';

@NgModule({
  // ...
  providers: [
    SessionRecorder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebSessionRecorderAngularInterceptor,
      multi: true // Use multi as true if you are using multiple Http interceptors
    }
  ],
  // ...
})
export class AppModule { }
```