// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

const Alice = '5GYZPLM8UfUGa1X1JusGTN6yBDwb9Z6n8LQxG5FMUQnd2xcT';
const Dave = '5EUf1zCzcyVdSK5yb51d69H1DQ3wDjxNdDMB4t3YdP7wdYfp';

// Initialize the API as in previous sections

// The actual address that we will use
const ADDR = Dave;

// Initialise the provider to connect to the local node
const provider = new WsProvider('ws://13.213.247.248:9944');

// Create the API and wait until ready
const api = await ApiPromise.create({ provider });

// Retrieve the last timestamp
const now = await api.query.timestamp.now();

// Retrieve the account balance & nonce via the system module
const { nonce, data: balance } = await api.query.system.account(ADDR);

console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);