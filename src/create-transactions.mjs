import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';

cryptoWaitReady().then(async () => {
  const wsProvider = new WsProvider('ws://13.213.247.248:9944');
  const keyring = new Keyring({ type: 'sr25519' });
  const PHRASE = "repair palm across fog black sun guide bitter layer hood reward amount"
  const sender = keyring.addFromUri(PHRASE);
  
  const receiverAddress = "5GYZPLM8UfUGa1X1JusGTN6yBDwb9Z6n8LQxG5FMUQnd2xcT"
  const api = await ApiPromise.create({ provider: wsProvider }); 
  
   // Create a extrinsic, transferring 12345 units to receiverAddress
   const transfer = api.tx.balances.transfer(receiverAddress, 2_000_000);

   // Sign and send the transaction using our account
   const hash = await transfer.signAndSend(sender);   
   console.log('Transfer sent with hash', hash.toHex());
});