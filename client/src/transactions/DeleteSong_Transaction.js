import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that works with delete
 * song. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initPosInList, initSongObject) {
        super();
        this.store = initStore;
        this.posInList = initPosInList;
        this.songObject = initSongObject;
    }

    doTransaction() {
        this.store.deleteSong(this.posInList);
    }
    
    undoTransaction() {
        this.store.undoDeleteSong(this.posInList, this.songObject);
    }
}