export interface NetworkRequest {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: any;
  }
  
  export interface NetworkResponse {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: any;
  }
  
  export class NetworkCapture {
    private networkData: {
      timestamp: string;
      request: NetworkRequest;
      response: NetworkResponse | null;
      error: string | null;
    }[] = [];
  
    captureActivity(request: NetworkRequest, response: NetworkResponse | null, error: Error | null = null) {
      this.networkData.push({
        timestamp: new Date().toISOString(),
        request,
        response,
        error: error ? error.message : null
      });
    }
  
    getLogs(): string {
      return this.networkData.map(entry => {
        let log = `${entry.timestamp}: ${entry.request.method} ${entry.request.url}\n`;
        log += `  Request Headers: ${JSON.stringify(entry.request.headers)}\n`;
        if (entry.response) {
          log += `  Response Status: ${entry.response.status} ${entry.response.statusText}\n`;
          log += `  Response Headers: ${JSON.stringify(entry.response.headers)}\n`;
          log += `  Response Body: ${JSON.stringify(entry.response.body)}\n`;
        } else if (entry.error) {
          log += `  Error: ${entry.error}\n`;
        }
        return log;
      }).join('\n');
    }
  }