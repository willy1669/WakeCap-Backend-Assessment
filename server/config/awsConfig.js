/* eslint-disable no-console */
import awsIot from 'aws-iot-device-sdk';

const dotenv = require('dotenv');

dotenv.config();

const {
  AWS_KEY_PATH,
  AWS_CERT_PATH,
  AWS_CA_PATH,
  AWS_HOST,
  AWS_CLIENT_ID,
  AWS_REGION,
} = process.env;

const thingShadows = awsIot.thingShadow({
  keyPath: AWS_KEY_PATH,
  certPath: AWS_CERT_PATH,
  caPath: AWS_CA_PATH,
  host: AWS_HOST,
  clientId: AWS_CLIENT_ID,
  region: AWS_REGION,
});

/** implement a switch that can control the device we just created */
thingShadows.on('status', (thingName, stat, clientToken, stateObject) => {
  console.log(JSON.stringify(stateObject.state));
});

export default { thingShadows };
