import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const { song, index } = props;

    function handleDragStart(event){
        event.dataTransfer.setData("song", event.target.id);
    }
    function handleDragOver(event){
        event.preventDefault();
    }
    function handleDragEnter(event){
        event.preventDefault();
        setDraggedTo(true);
    }
    function handleDragLeave(event){
        event.preventDefault();
        setDraggedTo(false);
    }
    function handleDrop(event){
        event.preventDefault();
        let target =event.target;
        let targetId = target.id;
        targetId = targetId.substring(targetId.indexOf("-")+1);
        targetId = targetId.substring(0,targetId.indexOf("-"));
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-")+1);
        sourceId = sourceId.substring(0,sourceId.indexOf("-"));
        setDraggedTo(false);
        store.addMoveSongTransaction(sourceId, targetId);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;