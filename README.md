# Web Session Recorder

A flexible session recording package for web applications, with optional Angular support. 

## Overview
Web Session Recorder is a powerful and lightweight npm package designed to capture and record user sessions in web applications. It provides developers with valuable insights into user behavior, making it easier to debug issues, optimize user experience, and understand how users interact with your application.

## Features
 - Records User Screen: Capture the user's screen activity during their session.
 - Records All Logs: Log all console messages and other relevant information.
 - Records All Network Calls: Capture and log all network requests and responses.


## Installation
To install the package, use npm or yarn:
```
npm install web-session-recorder
```
or
```
yarn add web-session-recorder
```


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

### Error Handling
Ensure to handle potential errors by wrapping start and stop methods in try-catch blocks.




##
##
##
##


## Usage in Angular Project

In Angular projects, you can use the package similarly to vanilla JavaScript. Optionally, add an **HttpInterceptor** to log network calls from Angular's **HttpClient**.
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
