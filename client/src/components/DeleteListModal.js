import React, { Component } from 'react';
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    //const { isOpenCallback, hideModalCallback } = this.props;
    let name = store.listKeyPairMarkedForDeletion.name;
    console.log("ID name pairs: ",store.listKeyPairMarkedForDeletion);
    function handleConfirm() {
        console.log("DUMMY comfirm clicked");
    }
    function handleCancel() {
        console.log("DUMMY cancel clicked");
    }
    let modalClass = "modal";
    if (store.isDeleteListModalOpen()){
        modalClass += ".is-visible";
    }

    return (
        <div 
            className={modalClass}
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the {name} playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="delete-list-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirm}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-list-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancel}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteListModal;