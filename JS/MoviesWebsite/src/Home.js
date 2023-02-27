import React, {useState} from "react"
import { Link } from 'react-router-dom'
import axios from "axios";


function Home({ulub,setUlub,filmy,setFilmy,refresh,setRefresh}){

    const [usuwanie,setUsuwanie] = useState(false)
    const [dlt,setDlt] = useState([])
    const [ulubione]=useState(new Set())
    const [u]=useState(new Set())
    const [newFilm] = useState({title:"",director:"",genre:"",year:1000,description:"",image_url:""})
    const [dodawanie,setDodawanie] = useState(false)
    const [sortowanie,setSortowanie] = useState(false)



    function del(){
        setUsuwanie(!usuwanie)
    }

    function d(){
        setDodawanie(!dodawanie)
    }

    function check(e){
        if(e.target.checked) {
            setDlt([...dlt,e.target.name])
        }else{
            dlt.splice(dlt.indexOf(e.target.name),1)
        }
    }

    function clear(){
        dlt.forEach(function(e){
            const idx = filmy.reduce(function(wynik,current,index){
                if(current.id===parseInt(e)){
                    wynik=index
                }
                return wynik
            },0)
            if(ulub.has(filmy[idx])){
                ulub.delete(filmy[idx])
            }
            axios.delete("http://localhost:3000/movie/"+filmy[idx].id)
            filmy.splice(idx,1)
        })
        setUsuwanie(false)
        setDlt([])
    }

    function dodaj(e){
        ulubione.add(e.target.name)
        filmy.forEach(function(film){
            if(ulubione.has(film.id.toString())){
                u.add(film)
            }
        })
        setUlub(u)
    }

    function change(e){
        newFilm[e.target.id]=e.target.value

    }

    function handleSubmit(e){
        if(newFilm.title!=="" && newFilm.genre!=="" && newFilm.director!=="" && newFilm.year>1000 && newFilm.year<(new Date().getFullYear()) && newFilm.description!==""){
            const unikalny = filmy.reduce(function(wynik,current){
                if(current.title===newFilm.title){
                    wynik.push(0)
                }
                return wynik
            },[])
            if(unikalny.includes(0)===false){
                axios.post("http://localhost:3000/movie",newFilm)
                setRefresh(!refresh)
                window.alert("Dodano")
                setDodawanie(false)
            } else {
                window.alert("Tutuł musi byc unikalny")
            }
        } else {
            window.alert("Uzupełnij wszystkie dane")
        }
        e.preventDefault()
    }

    function srt(e){
        if(e.target.id==="year" || e.target.id==="rating"){
            const naj = filmy.sort((a, b) => b[e.target.id] - a[e.target.id])
            setFilmy(naj)
        }else {
            const naj = filmy.sort((a,b)=> (a.title>b.title) ? 1 : -1 )
            setFilmy(naj)
        }
        setSortowanie(false)
    }

    function trs(e){
        if(e.target.id==="year" || e.target.id==="rating"){
            const naj = filmy.sort((a, b) => a[e.target.id] - b[e.target.id])
            setFilmy(naj)
        }else {
            const naj = filmy.sort((a,b)=> (a.title>b.title) ? -1 : 1 )
            setFilmy(naj)
        }
        setSortowanie(false)
    }


    return (
        <div className="body">
            <div className="Filtr">
                <button onClick={d}>Dodaj</button>
                <button onClick={del}>Usuń</button>
                <div className="dropDown">
                    <button className="setSortowanie" onClick={()=>setSortowanie(!sortowanie)}>Sortuj</button>
                    {sortowanie ?
                    <div className="dropMenu">
                        <p id="year" onClick={srt}>Od najnowszych</p>
                        <p id="year" onClick={trs}>Od najstarszych</p>
                        <p id="title" onClick={srt}>Tytuł(A-Z)</p>
                        <p id="Title" onClick={trs}>Tytuł(Z-A)</p>
                        <p id="rating" onClick={srt}>Najlepiej oceniane</p>
                        <p id="rating" onClick={trs}>Najgorzej oceniane</p>
                    </div> : <div/>}
                </div>
            </div>
            {filmy.length>0 ?
                <div>{filmy.map((film)=>{
                    return <div key={film.id} className="film" >
                        <div>{usuwanie ? <input type="checkbox" name={film.id} onChange={check}/> : <div></div>}</div>
                        <Link to={'/'+ film.id}><p><img className="obrazek" src={film.image_url} alt="zdjecie" /></p></Link>
                        <div>
                            <Link to={'/'+ film.title}><p key={film.id}>Tytuł:{film.title}</p></Link>
                            <p key={film.genre}>Gatunek:{film.genre}</p>
                            <p key={film.director}>Reżyser:{film.director}</p>
                            <p key={film.year}>Rok:{film.year}</p>
                        </div>
                        <div key={film.id+"stars"} className="rating">
                            <div className="stars">{[...Array(5)].map(function(current,index){
                                if(index<film.rating){
                                    return <p key={index} className="starG">☆</p>
                                }else{
                                    return <p key={index} className="star">☆</p>
                                }
                            })}</div>
                            <p key={"przycisk"}><button className="ratingbutton" name={film.id} onClick={dodaj}>Dodaj do ulubionych</button></p>
                        </div>

                    </div>
                })}</div>
                : <div/>}
            <div>{usuwanie ? <button onClick={clear}>Potwierdź</button> : <div></div>}</div>
            <div>{dodawanie ?
                <div>
                    <form className="dodawanie" onSubmit={handleSubmit}>
                        <div><p><label>Obrazek</label></p>
                            <p><input className="obrazek" id="image_url" type="url" onChange={change} /></p></div>
                        <div><p><label>Tytuł</label></p>
                            <p><input id="title" type="text" onChange={change}/></p>
                            <p><label>Gatunek</label></p>
                            <p><input id="genre" type="text" onChange={change} /></p>
                            <p><label>Reżyser</label></p>
                            <p><input id="director" type="text" onChange={change}/></p>
                            <p><label>Rok</label></p>
                            <p><input id="year" type="number" min={1000}  onChange={change}/></p></div>
                        <div><p><label>Opis</label></p>
                            <p><textarea id="description" className="opis" onChange={change}/></p></div>
                        <p className="Potwierdz"><input className="dodajPotwierdz" type="submit"/></p>
                    </form>
                </div>
                : <div></div>}</div>
        </div>
    );
}


export default Home