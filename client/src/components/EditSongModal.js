import React from 'react';
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
/*
export default class EditSongModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            artist: null,
            youTubeId: null
        }
    }
    handleUpdateTitle = (event) => {
        this.setState({title: event.target.value});
    }
    handleUpdateArtist = (event) => {
        this.setState({artist: event.target.value});
    }
    handleUpdateYouTubeId = (event) => {
        this.setState({youTubeId: event.target.value});
    }

    handleCancel = () => {
        this.props.hideEditSongModalCallback();
        this.setState({title: null, artist: null, youTubeId: null});
    }
    handleConfirm = () => {
        let oldSong, newSong;
        if (this.props.songId!=null && this.props.currentList){
            oldSong = Object.assign({},this.props.currentList.songs[this.props.songId]);
            newSong = Object.assign({},this.props.currentList.songs[this.props.songId]);
        }
        if(this.state.title){newSong.title=this.state.title}
        if(this.state.artist){newSong.artist=this.state.artist}
        if(this.state.youTubeId){newSong.youTubeId=this.state.youTubeId}
        this.props.editSongCallback(oldSong, newSong);
        this.setState({title: null, artist: null, youTubeId: null});
    }
}
*/
function EditSongModal() {
    let newTitle, newArtist, newYouTubeId, title, artist, youTubeId;
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    let index = store.currentSongIndex;
    let song = store.currentSong;
    let oldTitle = song.title;
    let oldArtist = song.artist;
    let oldYouTubeId = song.youTubeId;
    title=oldTitle;
    artist=oldArtist;
    youTubeId=oldYouTubeId;
    function handleConfirm() {
        let newSong = Object.assign({},song);
        newSong.title = title;
        newSong.artist = artist;
        newSong.youTubeId = youTubeId;
        store.addEditSongTransaction(index, song, newSong);
        store.hideModal();
    }
    function handleCancel() {
        store.hideModal();
    }
    function handleUpdateArtist(event) {
        artist = event.target.value;
    }
    function handleUpdateYouTubeId(event) {
        youTubeId = event.target.value;
    }
    function handleUpdateTitle(event) {
        title = event.target.value;
    }
    let modalClass = "modal";
    if (store.isEditSongModalOpen()){
        //console.log("marked OPEN in editSongModal");
        modalClass+=" is-visible";
    }

    return (
        <div 
            className={modalClass} 
            id="edit-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='edit-song-modal-root'>
                    <div className="modal-north">
                        Edit Song
                    </div>
                    <div className="modal-center">
                            <div className="modal-prompt" id="title-prompt">Title:</div>
                            <input
                                id="edit-song-modal-title-textfield"
                                className='modal-textfield'
                                type='text'
                                onChange={handleUpdateTitle}
                                defaultValue={title}/>

                            <div className="modal-prompt" id="artist-prompt">Artist:</div>
                            <input
                                id="edit-song-modal-artist-textfield"
                                className='modal-textfield'
                                type='text'
                                onChange={handleUpdateArtist}
                                defaultValue={artist}/>  
                                            
                            <div className="modal-prompt" id="youTubeId-prompt">YouTube Id:</div>
                            <input
                                id="edit-song-modal-youTubeId-textfield"
                                className='modal-textfield'
                                type='text'
                                onChange={handleUpdateYouTubeId}
                                defaultValue={youTubeId}/>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            className="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            className="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}
export default EditSongModal;