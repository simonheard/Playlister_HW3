import React, { Component } from 'react';

export default class DeleteSongModal extends Component {
    render() {
        const { songId, currentList, deleteSongCallback, hideDeleteSongModalCallback } = this.props;
        let title = "", artist = "";
        if (songId && currentList && songId<currentList.songs.length){
            title = currentList.songs[songId].title;
            artist = currentList.songs[songId].artist;
        }
        return (
            <div 
                className="modal" 
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
                                onClick={deleteSongCallback}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-song-cancel-button" 
                                className="modal-button" 
                                onClick={hideDeleteSongModalCallback}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}