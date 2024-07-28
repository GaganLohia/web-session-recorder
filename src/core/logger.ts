export class Logger {
    private logs: { timestamp: string; message: string }[] = [];
    private originalConsoleLog!: typeof console.log;
  
    start() {
      this.originalConsoleLog = console.log;
      console.log = (...args: any[]) => {
        this.captureLog(args.join(' '));
        this.originalConsoleLog.apply(console, args);
      };
    }
  
    stop() {
      if (this.originalConsoleLog) {
        console.log = this.originalConsoleLog;
      }
    }
  
    private captureLog(message: string) {
      this.logs.push({
        timestamp: new Date().toISOString(),
        message: message
      });
    }
  
    getLogs(): string {
      return this.logs.map(entry => `${entry.timestamp}: ${entry.message}`).join('\n');
    }
  }