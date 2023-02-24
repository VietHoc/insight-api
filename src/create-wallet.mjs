import { Keyring } from '@polkadot/api';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

cryptoWaitReady().then(() => {
  const keyring = new Keyring({ type: 'sr25519' });
  // Genereate menemonic
  const PHRASE = mnemonicGenerate();
  // Add an account, straight mnemonic
  const newPair = keyring.addFromUri(PHRASE);
  console.log(`menemonic: ${PHRASE}`)
  console.log(newPair.address);
})