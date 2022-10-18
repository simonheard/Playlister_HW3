import './App.css';
import { React } from 'react'
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from './store'
import  DeleteListModal  from './components/DeleteListModal.js'
import DeleteSongModal from './components/DeleteSongModal.js'
import EditSongModal from './components/EditSongModal.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar } from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    let deleteListModal;
    let deleteSongModal;
    let editSongModal;
    if (store.isDeleteListModalOpen()){
        //console.log("app.js isDeleteListModalOpen: true");
        deleteListModal =<DeleteListModal/>
    }
    if(store.isDeleteSongModalOpen()){
        //console.log("app.js isDeleteSongModalOpen: true");
        deleteSongModal = <DeleteSongModal/>
    }
    if(store.isEditSongModalOpen()){
        //console.log("app.js isEditSongModalOpen: true");
        editSongModal = <EditSongModal/>
    }
    
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            {deleteListModal}
            {deleteSongModal}
            {editSongModal}
            <Statusbar />
        </Router>
    )
}

export default App