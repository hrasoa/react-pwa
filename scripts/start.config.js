module.exports = {
  apps : [{
    name: "app",
    script: "./server/app/prod.js",
    exec_mode: "cluster",
    instances: 1,
    env: {
      NODE_ENV: "production"
  }
  }, {
    name: "api",
    script: "./server/api/index.js",
    exec_mode: "cluster",
    instances: 1,
    env: {
      NODE_ENV: "production"
    }
  }]
};
