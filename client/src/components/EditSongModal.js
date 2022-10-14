import React, { Component } from 'react';

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

    render() {
        const {songId, currentList} = this.props;
        let title="", artist="", youTubeId="";
        if (currentList && songId!=null && songId<currentList.songs.length){
            title=currentList.songs[songId].title;
            artist=currentList.songs[songId].artist;
            youTubeId=currentList.songs[songId].youTubeId;
        }
        if (this.state.title){title=this.state.title};
        if (this.state.artist){artist=this.state.artist};
        if (this.state.youTubeId){youTubeId=this.state.youTubeId};

        return (
            <div 
                className="modal" 
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
                                    onChange={this.handleUpdateTitle}
                                    value={title}/>

                                <div className="modal-prompt" id="artist-prompt">Artist:</div>
                                <input
                                    id="edit-song-modal-artist-textfield"
                                    className='modal-textfield'
                                    type='text'
                                    onKeyPress={this.handleKeyPress}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleUpdateArtist}
                                    value={artist}/>  
                                                
                                <div className="modal-prompt" id="youTubeId-prompt">YouTube Id:</div>
                                <input
                                    id="edit-song-modal-youTubeId-textfield"
                                    className='modal-textfield'
                                    type='text'
                                    onKeyPress={this.handleKeyPress}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleUpdateYouTubeId}
                                    value={youTubeId}/>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                className="modal-button" 
                                onClick={this.handleConfirm}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                className="modal-button" 
                                onClick={this.handleCancel}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}