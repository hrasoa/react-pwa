export default {
  port: 3001,
  host: '0.0.0.0',
  get serverUrl() {
    return (typeof window === 'undefined') ? `http://${this.host}:${this.port}` : '';
  }
};
