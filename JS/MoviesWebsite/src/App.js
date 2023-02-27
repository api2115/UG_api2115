import Home from "./Home";
import Id from "./Id";
import Nav from "./Nav";
import Ulubione from "./Ulubione";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import React, {useState,useEffect} from 'react'
import "./App.scss"
import axios from "axios";



function App() {
    const [ulub,setUlub] = useState(new Set())
    const [filmy,setFilmy] = useState([])
    const [refresh,setRefresh] = useState(false)
    useEffect( ()=>{
        async function fetchData() {
            axios.get("http://localhost:3000/movies")
                .then(resonse=>setFilmy(resonse.data))
        }
        fetchData()
    },[refresh])


    return (
        <>
            <div>
                <div className="App">
                    <Router>
                        <Nav/>
                        <Switch>
                            <Route exact path="/">
                                <Home ulub={ulub} setUlub={setUlub} filmy={filmy} setFilmy={setFilmy} refresh={refresh} setRefresh={setRefresh}/>
                            </Route>
                            <Route exact path="/ulubione">
                                <Ulubione ulub={ulub}/>
                            </Route>
                            <Route exact path="/:id" render={(props)=> <Iid filmy={filmy} setFilmy={setFilmy} refresh={refresh} setRefresh={setRefresh} {...props} />}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        </>
    );
}


function Iid(props) {
    return(
        <div>
            <Id m={props.match.params.id} filmy={props.filmy} setFilmy={props.setFilmy} refresh={props.refresh} setRefresh={props.setRefresh}/>
        </div>
    )
}


export default App;

