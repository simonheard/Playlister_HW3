import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
// OUR TRANSACTIONS
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js';
import AddSong_Transaction from '../transactions/AddSong_Transaction.js';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction.js';
import EditSong_Transaction from '../transactions/EditSong_Transaction.js';
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

const CurrentModal = {
    NONE: "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_MODAL: "SET_CURRENT_MODAL",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        currentModal: CurrentModal.NONE,
        listKeyPairMarkedForDeletion: null,
        currentSong: null,
        currentSongIndex: -1,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: store.currentModal,
                    listKeyPairMarkedForDeletion: store.listKeyPairMarkedForDeletion,
                    currentSong: store.currentSong,
                    currentSongIndex: store.currentSongIndex,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: store.currentModal,
                    listKeyPairMarkedForDeletion: store.listKeyPairMarkedForDeletion,
                    currentSong: store.currentSong,
                    currentSongIndex: store.currentSongIndex,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    currentModal: store.currentModal,
                    listKeyPairMarkedForDeletion: store.listKeyPairMarkedForDeletion,
                    currentSong: store.currentSong,
                    currentSongIndex: store.currentSongIndex,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: store.currentModal,
                    listKeyPairMarkedForDeletion: store.listKeyPairMarkedForDeletion,
                    currentSong: store.currentSong,
                    currentSongIndex: store.currentSongIndex,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                //console.log(payload)
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion: payload.listKeyPairMarkedForDeletion,
                    currentSong: store.currentSong,
                    currentSongIndex: store.currentSongIndex,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion: store.listKeyPairMarkedForDeletion,
                    currentSong: store.currentSong,
                    currentSongIndex: store.currentSongIndex,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion: store.listKeyPairMarkedForDeletion,
                    currentSong: store.currentSong,
                    currentSongIndex: store.currentSongIndex,
                });
            }
            case GlobalStoreActionType.SET_CURRENT_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    currentModal: payload.newModalState,
                    listKeyPairMarkedForDeletion: store.listKeyPairMarkedForDeletion,
                    currentSong: payload.song,
                    currentSongIndex: payload.songId
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    //THIS FUNCTION CREATE NEW LIST AND OPEN THE LIST PAGE
    store.createPlaylist = function () {
        async function asyncCreatePlaylist() {
            let playlist = {name:"New Playlist",songs:[]}
            let response = await api.createPlaylist(playlist);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: playlist
                });
                store.loadIdNamePairs();
            }
        }
        asyncCreatePlaylist();
    }
    store.deleteMarkedList = function () {
        async function asyncDeleteMarkedList() {
            //console.log("Deleting marked list, ID: ", store.listKeyPairMarkedForDeletion._id);
            let response = await api.deletePlaylistById(store.listKeyPairMarkedForDeletion._id);
            if(response.data.success) {
                // storeReducer({
                //     type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                //     payload: null
                // })
                //console.log("delete Success in server");
                store.hideModal();
                store.loadIdNamePairs();
            }
        }
        //store.hideModal();
        asyncDeleteMarkedList();
        //store.loadIdNamePairs();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.updateCurrentList = function () {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.addAddSongTransaction = function () {
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    }
    store.addSong = function () {
        let list = store.currentList;
        let newSong = {title: "Untitled", artist: "Unknown", youTubeId: "dQw4w9WgXcQ"};
        list.songs.push(newSong);
        store.updateCurrentList();
    }
    store.undoAddSong = function () {
        let list = store.currentList;
        list.songs.pop();
        store.updateCurrentList();
    }
    store.addMoveSongTransaction = function(start, end){
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    store.moveSong = function (start, end) {
        start = parseInt(start);
        end = parseInt(end);
        let list = store.currentList;
        if(start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++){
                list.songs[i] = list.songs[(i+1)];
            }
            list.songs[end] = temp;
        }
        else if(start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--){
                list.songs[i] = list.songs[(i-1)];
            }
            list.songs[end] = temp;
        }
        store.updateCurrentList();
    }

    store.addDeleteSongTransaction = () => {
        //console.log("adding transaction, current index and song: ", store.currentSongIndex, store.currentSong);
        let transaction = new DeleteSong_Transaction(store, store.currentSongIndex, store.currentSong);
        tps.addTransaction(transaction);
    }
    store.deleteSong = (posInList) => {
        store.currentList.songs.splice(posInList, 1);
        store.updateCurrentList();
    }

    store.undoDeleteSong = (posInList, songObject) => {
        store.currentList.songs.splice(posInList, 0, songObject);
        store.updateCurrentList();
    }

    store.addEditSongTransaction = (index, oldSong, newSong) => {
        let transaction = new EditSong_Transaction(store, index, oldSong, newSong);
        tps.addTransaction(transaction);
    }
    store.editSong = (index, song) => {
        let list = null;
        if(store.currentList){
            list = store.currentList;
        }
        list.songs[index] = song;
        store.updateCurrentList();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.markListForDeletion = function (idNamePair) {
        // storeReducer({
        //     type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
        //     payload: {
        //         listKeyPairMarkedForDeletion : idNamePair
        //     }
        // })
        store.listKeyPairMarkedForDeletion=idNamePair;
    }
    
    store.setCurrentModal = function(newModalState, songId, song) {
        storeReducer({
            type:GlobalStoreActionType.SET_CURRENT_MODAL,
            payload: {
                newModalState: newModalState,
                songId: songId,
                song: song
            }
        });
        // store.songId = songId;
        // store.song = song;
        // store.currentModal = newModalState;
        //console.log("Current Modal in store set to: ", store.currentModal);
    }

    store.showEditSongModal = function (index, song) {
        store.setCurrentModal(CurrentModal.EDIT_SONG, index, song);
        //console.log("index and song: ", index, song);
    }
    store.showDeleteSongModal = function(index, song) {
        store.setCurrentModal(CurrentModal.REMOVE_SONG, index, song);
        //console.log("index and song: ", index, song);
    }
    store.showDeleteListModal = function() {
        //console.log("show delete list modal");
        store.setCurrentModal(CurrentModal.DELETE_LIST, -1, null);
    }

    store.hideModal = function() {
        //console.log("hideModal called");
        store.setCurrentModal(CurrentModal.NONE, -1, null);
        store.currentModal = CurrentModal.NONE;
    }
    store.isDeleteListModalOpen = function() {return store.currentModal === CurrentModal.DELETE_LIST;}
    store.isEditSongModalOpen = function() {return store.currentModal === CurrentModal.EDIT_SONG;}
    store.isDeleteSongModalOpen = function() {return store.currentModal === CurrentModal.REMOVE_SONG;}

    store.canAddSong = function() {return store.currentList}
    store.canUndo = function() {return tps.hasTransactionToUndo()}
    store.canRedo = function() {return tps.hasTransactionToRedo()}
    store.canClose = function() {return store.currentList}
    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}