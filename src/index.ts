import { HubClient, Keyman } from 'sdag.js';
import bip39 from 'bip39';
import { EventEmitter } from 'events';
import { NotifyMessage } from 'sdag.js/build/main/types/sdag';

export default class Wallet extends EventEmitter {

    private address: string;
    private keyman: Keyman;
    private hub: HubClient;

    configHub(address: string) {
        this.address = address;
    }

    autoConfigHub(type: 'mainnet' | 'testnet') {
        this.address = type === 'mainnet' ? 'ws://hub.sdag.io:8086' : 'ws://10.168.3.131:6615';
    }

    generateMnemonic() {
        return bip39.generateMnemonic();
    }

    async loginWithMnemonic(mnemonic: string, password?: string) {
        this.keyman = new Keyman(mnemonic, password);
        this.hub = new HubClient();
        this.hub.peerId = this.keyman.mainAddress;

        let connected = await this.hub.connect(this.address);
        return connected;
    }

    get mainAddress() {
        return this.keyman.mainAddress;
    }

    getAddress() {
        return this.keyman.mainAddress;
    }

    getPrivateKey() {
        return this.keyman.mainXprivKey;
    }

    getPublicKey() {
        return this.keyman.mainPubKey;
    }

    async getBalance() {
        let balance = await this.hub.getBalance(this.getAddress());
        if (balance.error) throw Error(balance.error);
        return balance.balance;
    }

    async getHistory() {
        return await this.hub.getTxsByAddress(this.mainAddress, 200);
    }

    async getUnit(unitId: string) {
        return (await this.hub.getJoint(unitId)).joint;
    }

    async send(args: { amount: number, to: string, text?: string }) {
        return await this.hub.transfer({ from: this.mainAddress, to: args.to, amount: args.amount, signEcdsaPubkey: this.keyman.mainEcdsaPubKey, }, hash => this.keyman.sign(hash));
    }

    onAssetMessage(cb: (msg: NotifyMessage) => void) {
        this.hub.watch([this.mainAddress], msg => super.emit('NotifyMessage', msg));
        super.addListener('NotifyMessage', cb);
    }

    sign(text: string) {
        return this.keyman.signMessage(text);
    }

    verify(text: string, signed: string) {
        return this.keyman.verifyMessage(text, signed);
    }

    logout() {
        this.hub.close();
        this.keyman = null;
    }
}
