module.exports = {
    apps : [{
      name: 'air-promo',
      script: 'src/app.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
    }]
  };
  