module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '174.138.73.95',
      username: 'root',
      //pem: '/etc/ssl/cert.pem'
      password: 'pathfynder420'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'pathfynder',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://localhost',
      PORT: 3000,
      MONGO_URL: 'mongodb://127.0.0.1:3001/meteor',
    },

    //docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      //image: 'kadirahq/meteord',
      // imagePort: 80, // (default: 80, some images EXPOSE different ports)
    //},

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    port: 27017,
    version: '3.2.6',
    servers: {
      one: {}
    }
  }
};
