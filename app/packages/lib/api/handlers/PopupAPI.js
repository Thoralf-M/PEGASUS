export default {
    init(duplex) {
        this.duplex = duplex;
    },

    isWalletSetup() {
        return this.duplex.send('isWalletSetup');
    },

    setupWallet() {
        return this.duplex.send('setupWallet');
    },

    storePsw(psw) {
        return this.duplex.send('storePsw', psw);
    },

    checkPsw(psw) {
        return this.duplex.send('checkPsw', psw);
    },

    getKey() {
        return this.duplex.send('getKey');
    },

    setCurrentNetwork(network) {
        return this.duplex.send('setCurrentNetwork', network);
    },

    getCurrentNetwork() {
        return this.duplex.send('getCurrentNetwork');
    },

    addAccount(account, network, isCurrent) {
        return this.duplex.send('addAccount', {account, network, isCurrent});
    },

    setCurrentAccount(currentAccount, network) {
        return this.duplex.send('setCurrentAccount', {currentAccount, network});
    },

    resetData() {
        return this.duplex.send('resetData');
    },

    updateDataAccount(newData, network) {
        return this.duplex.send('updateDataAccount', {newData, network});
    },

    updateNameAccount(current, network, newName) {
        return this.duplex.send('updateNameAccount', {current, network, newName});
    },

    deleteAccount(account, network) {
        return this.duplex.send('deleteAccount',{account, network});
    },

    getCurrentAccount(network) {
        return this.duplex.send('getCurrentAccount',network);
    },

    getAllAccounts(network) {
        return this.duplex.send('getAllAccounts',network);
    },

    generateSeed(length) {
        return this.duplex.send('generateSeed',length);
    },

    isSeedValid(seed) {
        return this.duplex.send('isSeedValid', seed);
    },

    startSession(network) {
        return this.duplex.send('startSession',network);
    },

    checkSession() {
        return this.duplex.send('checkSession');
    },

    deleteSession(seed) {
        return this.duplex.send('deleteSession', seed);
    },

    getState(){
        return this.duplex.send('getState');
    },
    setState(state){
        return this.duplex.send('setState',state);
    },

    getPayments(){
        return this.duplex.send('getPayments');
    },
    pushPayments(payment){
        return this.duplex.send('pushPayment',payment);
    },
    rejectPayment(payment){
        return this.duplex.send('rejectPayment',payment);
    },
    rejectAllPayments(){
        return this.duplex.send('rejectAllPayments');
    }

};