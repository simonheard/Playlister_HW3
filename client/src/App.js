import './App.css';
import { React } from 'react'
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from './store'
import  DeleteListModal  from './components/DeleteListModal.js'
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
    if (store.isDeleteListModalOpen()){
        //console.log("app.js isDeleteListModalOpen: true");
        deleteListModal =<DeleteListModal/>
    }
    
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            {deleteListModal}
            <Statusbar />
        </Router>
    )
}

export default App