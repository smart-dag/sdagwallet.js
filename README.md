# SDAGWallet.js

SDAG Wallet for Javascript Developers

## Installation

```
npm i sdagwallet.js
```

## Usage

#### Import

```javascript
import Wallet from 'sdagwallet.js'

let wallet = new Wallet();
```

#### Auto configuration

```javascript
wallet.autoConfigHub("mainnet"); // Using mainnet
wallet.autoConfigHub("testnet"); // Using testnet
```

#### Manual configuration
```javascript
wallet.configHub("ws://10.168.3.131:6635");
```

#### Generate Mnemonic

```javascript
wallet.generateMnemonic();
```

#### Login

```javascript
await wallet.loginWithMnemonic(secret, password);
```

#### Keys

```javascript
wallet.getAddress();
wallet.getPrivateKey(); // Extened Private Key
wallet.getPublicKey();
```

#### Getting Balance

```javascript
await wallet.getBalance();
```

#### Getting History Txs

```javascript
await wallet.getHistory();
```

#### Getting a Unit

```javascript
await wallet.getUnit('AELe/VgaqoCJekPfVxd8huecW3g7n33ihFw1A3vVVPE=');
```

#### Sending Assets

```javascript
await wallet.send({ to: 'E5UR2ISKQWT3HISO55SHQYGYTF5BLWV6', amount: 2, text: 'Hello world' });
```

## License

GPL-3.0