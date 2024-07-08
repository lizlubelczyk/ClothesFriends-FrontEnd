module.exports = function override(config, env) {
    // Add resolve.fallback configuration to the existing config
    config.resolve = {
      ...config.resolve, // Spread existing resolve configurations
      fallback: {
        ...config.resolve.fallback, // Spread existing fallback configurations
        "net": false, // Add or override the fallback for 'net'
      },
    };
  
    return config;
  };