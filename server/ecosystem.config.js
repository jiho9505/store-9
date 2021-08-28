module.exports = {
  apps: [
    {
      name: 'store-9-server',
      script: './dist/server/app.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: false,
    },
  ],
};
