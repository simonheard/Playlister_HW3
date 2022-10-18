import React, { Component } from 'react';
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    let index = store.currentSongIndex;
    let song = store.currentSong;
    let title = song.title;
    let artist = song.artist;
    function handleConfirm() {
        store.addDeleteSongTransaction();
        store.hideModal();
    }
    function handleCancel() {
        store.hideModal();
    }
    let modalClass = "modal";
    if (store.isDeleteSongModalOpen()){
        //console.log("marked OPEN in deleteSongModal");
        modalClass+=" is-visible";
    }
    return (
        <div 
            className={modalClass}
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-song-root'>
                    <div className="modal-north">
                        Remove song?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently remove {title} by {artist} from the playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            className="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            className="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}
export default DeleteSongModal;