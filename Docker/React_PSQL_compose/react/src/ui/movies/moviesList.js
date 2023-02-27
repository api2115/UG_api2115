import { connect } from "react-redux";
import React,{useEffect,useState} from "react";
import {getMoviesList,deleteMovie} from "../../ducks/movies/operations";
import {getPersonsList} from "../../ducks/persons/operations";
import {Link, useNavigate} from "react-router-dom";
import "../../app.scss"


const MoviesList = ({movies,getMoviesList,refresh,setRefresh,deleteMovie,getPersonsList,persons},props) => {
    const [usuwanie,setUsuwanie] = useState(false)
    const [dlt,setDlt] = useState([])
    const [sortowanie,setSortowanie] = useState(false)
    const [filtrowanie, setFiltrowanie] = useState(false)
    const [filmy,setFilmy] = useState([])
    const [filmysrt,setFilmysrt] = useState([])
    const [daty,setDaty] = useState([])
    const [rezyserowie,setrez] = useState([])
    const [strona,setStrona] = useState(1)
    let navigate=useNavigate()


    function check(e){
        if(e.target.checked) {
            setDlt([...dlt,e.target.name])
        }else{
            dlt.splice(dlt.indexOf(e.target.name),1)
        }
    }

    function confirmDelete(){
        for(let i=0;i<dlt.length;i++){
            deleteMovie(dlt[i])
        }
        setRefresh(!refresh)
        setUsuwanie(!usuwanie)
        setDlt([])
        navigate("/movies")
    }

    function srt(e){
        if(e.target.id==="year"){
            filmysrt.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date))
        } else if(e.target.id==="tlength"){
            filmysrt.sort((a, b) => b.title.length-a.title.length)
        }else {
            filmysrt.sort((a,b)=> (a.title>b.title) ? 1 : -1 )
        }
        setSortowanie(false)
        setStrona(1)
    }

    function trs(e){
        if(e.target.id==="year") {
            filmysrt.sort((a, b) => Date.parse(a.release_date) - Date.parse(b.release_date))
        }else if(e.target.id==="tlength"){
            filmysrt.sort((a, b) => a.title.length-b.title.length)
        }else {
            filmysrt.sort((a,b)=> (a.title>b.title) ? -1 : 1 )
        }
        setSortowanie(false)
        setStrona(1)
    }

    function handlechange(e){
        let m = movies.filter(movie=>movie.release_date.slice(0,4)===e.target.value)
        setFilmysrt(m)
    }

    function handleRezChange(e){
        if(e.target.value==="null"){
            let m = movies.filter(movie=>movie.director_id===null)
            setFilmysrt(m)

        }else{
            let m = movies.filter(movie=>parseInt(movie.director_id)===parseInt(e.target.value))
            setFilmysrt(m)
        }
    }

    useEffect(() => {
        getMoviesList()
        getPersonsList()
    }, [refresh])

    useEffect(()=>{
        setFilmysrt(movies)
    },[refresh,movies])

    useEffect(() => {
        if(filmysrt.length>0) {
            setFilmy(filmysrt.slice((strona - 1) * 2, strona * 2))
        }
    }, [refresh,filmysrt,sortowanie,strona,movies])



    useEffect(() => {
        if(movies.length>0){
            const m=new Set(movies.map(film=>film.release_date.slice(0,4)).sort())
            setDaty(Array.from(m))
            const d=Array.from(new Set(movies.map(film=>film.director_id))).filter(n=>n)
            const did = []
            if(persons.length>0) {
                d.forEach(id => did.push({
                    id: id,
                    name: persons.filter(person => person.id === id)[0]
                }))
                setrez(did)
            }
        }
    }, [movies,persons])

    return(
        <div>
            <div className="buttons">
            <div className="dropDown">
                <div className="sortowanieatm">
                    <button className="setSortowanie" onClick={()=>setSortowanie(!sortowanie)}>Sortuj</button>
                </div>
                {sortowanie ?
                    <div className="dropMenu">
                        <p id="year" onClick={srt} >Od najnowszych</p>
                        <p id="year" onClick={trs}>Od najstarszych</p>
                        <p id="title" onClick={srt} >Tytuł(A-Z)</p>
                        <p id="title" onClick={trs} >Tytuł(Z-A)</p>
                        <p id="tlength" onClick={srt}>Od najdłuższego tytułu</p>
                        <p id="tlength" onClick={trs}>Od najkrótszego tytułu</p>
                    </div> : <div/>}
                <button className="setFiltrowanie" onClick={()=>setFiltrowanie(!filtrowanie)}>Filtruj</button>
                {filtrowanie ?
                    <div className="dropMenu">
                        <p id="year" >Filmy wydane w roku:<select onChange={handlechange}>
                            {daty.length>0?
                                daty.map(data=>{
                                return(
                                    <option key={data} value={data}>{data}</option>
                                )
                            }):null}
                        </select></p>
                        <p id="director">Filmy wydane przez:<select onChange={handleRezChange}>
                            <option key={"null"} value={"null"}>Nikogo</option>
                            {rezyserowie.length>0?
                            rezyserowie.map(rez=>{
                                return(
                                    <option key={rez.id} value={rez.id}>{rez.name.first_name+" "+rez.name.last_name}</option>
                                )
                            }):null}
                        </select></p>
                    </div> : <div/>}
            </div>

            <Link to={"/movies/add"}><button className={"addbutton"}>Dodaj film</button></Link>
            </div>
            <h3>Lista filmów</h3>
            <div className="movielist">
            {filmy.length>0 && movies.length>0?
                filmy.map(movie => {
                    return (
                        <div className="movie" key={movie.title}>
                            <div>{usuwanie?<input type='checkbox' name={movie.id} onChange={check}/>:<div></div>}</div>
                        <Link to={"/movies/"+movie.id}><div key={movie.id}>
                            <img src={movie.image_url} alt={"zdjecie"}/>
                            <div className={"title"}>{movie.title}</div>
                        </div></Link>
                        </div>)
                }):<div>oczekiwanie na filmy</div>
            }
            </div>
            <button onClick={()=>setUsuwanie(!usuwanie)}>usun</button>
            {usuwanie?<button className={"movielistbutton"} onClick={confirmDelete}>potwierdz</button>:<div></div>}
            <div className="paginacja">
                <button onClick={()=>strona!==1?setStrona(strona-1):window.alert("pierwsza strona")}>poprzednia strona</button>
                <button onClick={()=>strona<filmysrt.length/2?setStrona(strona+1):window.alert("ostatnia strona")}>następna strona</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return{
        movies:state.movies,
        persons:state.persons
    }
}
const mapDispatchToProps = {
    getMoviesList,
    deleteMovie,
    getPersonsList
}


export default connect(mapStateToProps,mapDispatchToProps)(MoviesList)
