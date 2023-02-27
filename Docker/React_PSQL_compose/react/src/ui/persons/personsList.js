import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {getPersonsList,deletePerson} from "../../ducks/persons/operations";
import {getMoviesList} from "../../ducks/movies/operations";
import {Link} from "react-router-dom";
import "../../app.scss"


const PersonsList = ({persons,getPersonsList,refresh,setRefresh,deletePerson,getMoviesList,movies},props) =>{
    const [usuwanie,setUsuwanie] = useState(false)
    const [dlt,setDlt] = useState([])
    const [sortowanie,setSortowanie] = useState(false)
    const [filtrowanie, setFiltrowanie] = useState(false)
    const [daty,setDaty] = useState([])
    const [osoby,setOsoby] = useState([])
    const [narodowosci,setNarodowosci] = useState([])

    function check(e){
        if(e.target.checked) {
            setDlt([...dlt,e.target.name])
        }else{
            dlt.splice(dlt.indexOf(e.target.name),1)
        }
    }

    function confirmDelete(){
        const movies_directors_set= new Set()
        movies.forEach(function(item){
            movies_directors_set.add(item.director_id)
        })

        for(let i=0;i<dlt.length;i++){
            if(movies_directors_set.has(parseInt(dlt[i]))){
                window.alert("Osoba jest przypisana do filmu, najpierw usuń film")
            }else {
                deletePerson(dlt[i])
            }
        }
        setRefresh(!refresh)
        setUsuwanie(!usuwanie)
        setDlt([])
    }

    function srt(e){
        if(e.target.id==="year"){
            osoby.sort((a, b) => Date.parse(b.birth_date) - Date.parse(a.birth_date))
        } else if(e.target.id==="last"){
            osoby.sort((a, b) => (a.last_name>b.last_name) ? 1 : -1)
        }else {
            osoby.sort((a,b)=> (a.first_name>b.first_name) ? 1 : -1 )
        }
        setSortowanie(false)
    }

    function trs(e){
        if(e.target.id==="year") {
            osoby.sort((a, b) => Date.parse(a.birth_date) - Date.parse(b.birth_date))
        }else if(e.target.id==="last"){
            osoby.sort((a, b) => (a.last_name>b.last_name) ? -1 : 1)
        }else {
            osoby.sort((a,b)=> (a.first_name>b.first_name) ? -1 : 1 )
        }
        setSortowanie(false)
    }

    function handlechange(e){
        if(e.target.id==="birth_date") {
            let p = persons.filter(person => person.birth_date.slice(0, 4) === e.target.value)
            setOsoby(p)
        }else{
            let p = persons.filter(person=>person.nationality===e.target.value)
            setOsoby(p)
        }
    }

    useEffect(()=>{
        getPersonsList()
        getMoviesList()
    },[refresh])

    useEffect(()=>{
        setOsoby(persons)
    },[refresh,persons])

    useEffect(()=>{
        if(persons.length>0){
            const d = new Set(persons.map(person=>person.birth_date.slice(0,4)).sort())
            setDaty(Array.from(d))
            const n = new Set(persons.map(person=>person.nationality))
            setNarodowosci(Array.from(n))
        }
    },[persons])

    return(
        <div>
            <div className="buttons">
            <div className="dropDown">
                <button className="setSortowanie" onClick={()=>setSortowanie(!sortowanie)}>Sortuj</button>
                {sortowanie ?
                    <div className="dropMenu">
                        <p id="year" onClick={srt} >Od najmłodszych</p>
                        <p id="year" onClick={trs}>Od najstarszych</p>
                        <p id="name" onClick={srt} >Imie(A-Z)</p>
                        <p id="name" onClick={trs} >Imie(Z-A)</p>
                        <p id="last" onClick={srt}>Nazwisko(A-Z)</p>
                        <p id="last" onClick={trs}>Nazwisko(Z-A)</p>
                    </div> : <div/>}
                <button className="setFiltrowanie" onClick={()=>setFiltrowanie(!filtrowanie)}>Filtruj</button>
                {filtrowanie?
                    <div className="dropMenu">
                        <p id="year">Urodzeni w roku:<select id="birth_date" onChange={handlechange}>
                            {daty.length>0?
                                daty.map(data=>{
                                    return(
                                        <option key={data} value={data}>{data}</option>
                                    )
                                }):null}
                        </select></p>
                        <p id="narodowosc">Narodowości:<select id="nationality" onChange={handlechange}>
                            {narodowosci.length>0?
                                narodowosci.map(narodowosc=>{
                                    return(
                                        <option key={narodowosc} value={narodowosc}>{narodowosc}</option>
                                    )
                                }):null}
                        </select></p>
                    </div>:null
                }
            </div>

            <Link to={"/persons/add"}><button className="addbutton">Dodaj osobe</button></Link>
            </div>
            <h3>Lista osób</h3>
            <div className={"centerbox"}>
            <div className={"personlist"}>
            {osoby.length>0?
                osoby.map(person => {
                    return (
                        <div key={person.id} className="osoba">
                            <div>{usuwanie?<input type='checkbox' name={person.id} onChange={check}/>:<div></div>}</div>
                            <Link to={"/persons/"+person.id}><div key={person.id}>
                                <div className={"personbox"}>{person.first_name + " " + person.last_name}</div>
                            </div></Link>
                        </div>)
                }):<div>oczekiwanie na osoby</div>
            }
            </div>
            </div>
            <button onClick={()=>setUsuwanie(!usuwanie)}>usun</button>
            {usuwanie?<button onClick={confirmDelete}>potwierdz</button>:<div></div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        persons:state.persons,
        movies:state.movies
    }
}
const mapDispatchToProps = {
    getPersonsList,
    deletePerson,
    getMoviesList
}


export default connect(mapStateToProps,mapDispatchToProps)(PersonsList)