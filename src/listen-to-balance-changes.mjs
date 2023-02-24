// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const Dave = '5GYZPLM8UfUGa1X1JusGTN6yBDwb9Z6n8LQxG5FMUQnd2xcT';

async function main () {
  const wsProvider = new WsProvider('ws://13.213.247.248:9944');
  // Create an await for the API
  const api = await ApiPromise.create({ provider: wsProvider }); 

  // Retrieve the initial balance. Since the call has no callback, it is simply a promise
  // that resolves to the current on-chain value
  let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(Dave);

  console.log(`${Dave} has a balance of ${previousFree}, nonce ${previousNonce}`);

  // Here we subscribe to any balance changes and update the on-screen value
  api.query.system.account(Dave, ({ data: { free: currentFree }, nonce: currentNonce }) => {
    // Calculate the delta
    const change = currentFree.sub(previousFree);

    // Only display positive value changes (Since we are pulling `previous` above already,
    // the initial balance change will also be zero)
    if (!change.isZero()) {
      console.log(`New balance change of ${change}, nonce ${currentNonce}: ${currentFree}`);

      previousFree = currentFree;
      previousNonce = currentNonce;
    }
  });
}

main().catch(console.error);