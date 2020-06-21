/**
 * Read config file from GCloud Bucket depend on kubernates environment: CONFIG_BUCKET
 * See: workload api deployment.yaml
 */

function asyncReadConfig() {
  return () =>  {
    console.log("NODE_ENV =", process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'localhost') {
      const localConfig = require('./config.localhost.json');
      return Promise.resolve(localConfig);
    } else {
      return new Promise((resolve, reject) => {
        try {
          const Storage = require('@google-cloud/storage');
          
          const storage = new Storage.Storage();
          const bucket = storage.bucket(process.env.CONFIG_BUCKET);
          const file = bucket.file(process.env.CONFIG_FILE);

          let line = '';
          file.createReadStream().on('data', (data) => {
            line += data;
          }).on('end', () => {
            // parsing json into js object
            const jsConfig = JSON.parse(line);
            resolve(jsConfig);
          }).on('error', (err) => {
            console.error(err);
            reject(err);
          }).on('close', () => {

          });

        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    }
  }
}

module.exports = asyncReadConfig;
