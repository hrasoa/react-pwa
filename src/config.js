const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export default {
  port: env.API_PORT || 3001,
  host: env.API_HOST || '0.0.0.0',
  get serverUrl() {
    return (typeof window === 'undefined') ? `http://${this.host}:${this.port}` : '';
  }
};
