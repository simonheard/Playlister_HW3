import './App.css';
import { React } from 'react'
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from './store'
import  DeleteListModal  from './components/DeleteListModal.js'
import DeleteSongModal from './components/DeleteSongModal.js'
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
    if (store.isDeleteListModalOpen()){
        //console.log("app.js isDeleteListModalOpen: true");
        deleteListModal =<DeleteListModal/>
    }
    if(store.isDeleteSongModalOpen()){
        //console.log("app.js isDeleteSongModalOpen: true");
        deleteSongModal = <DeleteSongModal/>
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
            <Statusbar />
        </Router>
    )
}

export default App