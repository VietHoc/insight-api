// Import the API & Provider and some utility functions
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';

// Import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)


// // Some constants we are using in this sample
// const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
// const Dave = '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy';

// const AMOUNT = 1000000000000;

// async function main () {
//   // Create the API and wait until ready
//   const api = await ApiPromise.create();

//   // Get the nonce for the admin key
//   const { nonce } = await api.query.system.account(ALICE);

//   // Find the actual keypair in the keyring
//   const keyring = new Keyring();
//   const alicePair = keyring.getPair(ALICE);

//   const recipient = Dave;

//   console.log('Sending', AMOUNT, 'from', alicePair.address, 'to', recipient, 'with nonce', nonce.toString());

//   // Do the transfer and track the actual status
//   api.tx.balances
//     .transfer(recipient, AMOUNT)
//     .signAndSend(alicePair, { nonce }, ({ events = [], status }) => {
//       console.log('Transaction status:', status.type);

//       if (status.isInBlock) {
//         console.log('Included at block hash', status.asInBlock.toHex());
//         console.log('Events:');

//         events.forEach(({ event: { data, method, section }, phase }) => {
//           console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
//         });
//       } else if (status.isFinalized) {
//         console.log('Finalized block hash', status.asFinalized.toHex());

//         process.exit(0);
//       }
//     });
// }

// main().catch(console.error);


const BOB = '5DXag7BFFvBwBebwpYZLEHwn7shPiwKGD4N2oKEGm4zH6af4';

async function main () {
  const wsProvider = new WsProvider('ws://13.213.247.248:9944');
  const api = await ApiPromise.create({ provider: wsProvider }); 

  // Construct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice');

  // Create a extrinsic, transferring 12345 units to Bob
  const transfer = api.tx.balances.transfer(BOB, 1000);

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());