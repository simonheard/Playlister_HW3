import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with edit
 * song. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initPosInList, initOldSong, initNewSong) {
        super();
        this.store = initStore;
        this.posInList = initPosInList;
        this.oldSong = initOldSong;
        this.newSong = initNewSong;
    }

    doTransaction() {
        this.store.editSong(this.posInList, this.newSong);
    }
    
    undoTransaction() {
        this.store.editSong(this.posInList, this.oldSong);
    }
}