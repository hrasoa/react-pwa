const env = process.env;

export const nodeEnv = process.env.NODE_ENV || 'development';

export const logStars = message => {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

export default {
  port: env.PORT || 3000,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
