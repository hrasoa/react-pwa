module.exports = {
  apps : [{
    name        : "app",
    script      : "./serverBuild/app/prod.js",
    exec_mode   : "cluster",
    env : {
      "NODE_ENV"  : "production"
    }
  },{
    name       : "api",
    script     : "./serverBuild/api/index.js",
    exec_mode  : "cluster",
    env : {
      "NODE_ENV": "production"
    }
  }]
};
