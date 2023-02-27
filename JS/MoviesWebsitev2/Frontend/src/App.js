import React, {useState} from "react";
import PersonsList from "./ui/persons/personsList";
import MoviesList from "./ui/movies/moviesList";
import Nav from "./ui/Nav";
import Home from "./ui/Home";
import MoviesForm from "./ui/movies/moviesForm";
import PersonsForm from "./ui/persons/personsForm";
import Idmovie from "./ui/movies/IDmovie";
import Idperson from "./ui/persons/IDperson";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";



function App() {
  const [refresh,setRefresh]= useState(false)

  return (
      <div>
        <Router>
            <Nav/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>

                <Route exact path="/persons" element={<PersonsList refresh={refresh} setRefresh={setRefresh} />}/>
                <Route exact path="persons/add" element={<PersonsForm refresh={refresh} setRefresh={setRefresh}/>}/>
                <Route exact path="/movies" element={<MoviesList refresh={refresh} setRefresh={setRefresh} />}/>
                <Route exact path="/movies/add" element={<MoviesForm refresh={refresh} setRefresh={setRefresh}/>}/>
                <Route exact path="movies/:id" element={<Idmovie refresh={refresh} setRefresh={setRefresh}/>}/>
                <Route exact path="/persons/:id" element={<Idperson refresh={refresh} setRefresh={setRefresh}/>}/>

            </Routes>

        </Router>

      </div>
  )
}

export default App;
