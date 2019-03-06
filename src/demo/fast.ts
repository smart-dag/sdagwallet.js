// import Wallet from 'sdagwallet.js';
import Wallet from '../index';

async function demo() {
    let wallet = new Wallet();

    wallet.autoConfigHub('testnet');
    await wallet.loginWithMnemonic('glare couch beauty catalog mass spoil favorite upset else cereal pony wagon');

    console.log('Balance: ', await wallet.getBalance());

    console.log('Send to KOQXPPXPNJL5RYI4JO37HEBDTMYB7BGT', (await wallet.send({ amount: 1, to: 'KOQXPPXPNJL5RYI4JO37HEBDTMYB7BGT', text: 'Hello' })).joint.unit.unit);
    await (new Promise((resolve) => setTimeout(resolve, 3000)));
    console.log('Balance: ', await wallet.getBalance());
}

demo();