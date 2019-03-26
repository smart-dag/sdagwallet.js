// import Wallet from 'sdagwallet.js';
import Wallet from '../index';
import { Keyman } from 'sdag.js';

async function demo() {
    let code = 'sea absorb guilt regular retire fire invest urge tone peace enroll asthma';
    let wallet = new Wallet();

    wallet.autoConfigHub('testnet');
    await wallet.loginWithMnemonic(code);

    let key = new Keyman(code);
    console.log(wallet.mainAddress, key.mainAddress);

    // console.log('Balance: ', await wallet.getBalance());

    // console.log('Send to FVC55XN6VRX7BUJKJXM73EBGTUYB3YJT', (await wallet.send({ amount: 1, to: 'FVC55XN6VRX7BUJKJXM73EBGTUYB3YJT', text: 'Hello' })).joint.unit.unit);
    // await (new Promise((resolve) => setTimeout(resolve, 3000)));
    console.log('Balance: ', await wallet.getBalance());

    wallet.onAssetMessage(msg => console.log(msg));

    await wallet.send({ amount: 2, to: wallet.mainAddress });
}

demo();