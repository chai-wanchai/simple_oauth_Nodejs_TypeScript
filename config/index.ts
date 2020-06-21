import { IConfig } from './interface';
function asyncReadConfig() {
	return () => {
		if (process.env.NODE_ENV === 'localhost') {
			const localConfig = require('./config.localhost.json');
			return localConfig as IConfig//Promise.resolve(localConfig);
		} else {
			const localConfig = require('./config.localhost.json');
			return localConfig as IConfig//Promise.resolve(localConfig);
			// return new Promise((resolve, reject) => {
			//   try {
			//     const Storage = require('@google-cloud/storage');

			//     const storage = new Storage.Storage();
			//     const bucket = storage.bucket(process.env.CONFIG_BUCKET);
			//     const file = bucket.file(process.env.CONFIG_FILE);

			//     let line = '';
			//     file.createReadStream().on('data', (data) => {
			//       line += data;
			//     }).on('end', () => {
			//       // parsing json into js object
			//       const jsConfig = JSON.parse(line);
			//       resolve(jsConfig);
			//     }).on('error', (err) => {
			//       console.error(err);
			//       reject(err);
			//     }).on('close', () => {

			//     });

			//   } catch (err) {
			//     console.error(err);
			//     reject(err);
			//   }
			// });
		}
	}
}
const readConfig = asyncReadConfig()
//const config: IConfig = readConfig;
const config: IConfig = require('./config.localhost.json');
export default config
