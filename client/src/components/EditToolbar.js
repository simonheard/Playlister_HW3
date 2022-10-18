import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    //let enabledButtonClass = "playlister-button";
    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";
    let addSongDisabled = false;
    let undoDisabled = false;
    let redoDisabled = false;
    let closeDisabled = false;
    if (!store.canAddSong()) {addSongClass += "-disabled"; addSongDisabled = true;}
    if (!store.canUndo()) {undoClass += "-disabled"; undoDisabled = true;}
    if (!store.canRedo()) {redoClass += "-disabled"; redoDisabled = true;}
    if (!store.canClose()) {closeClass += "-disabled"; closeDisabled = true;}

    function handleNewSong() {
        store.addAddSongTransaction();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={addSongDisabled}
                value="+"
                className={addSongClass}
                onClick={handleNewSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={undoDisabled}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={redoDisabled}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={closeDisabled}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;