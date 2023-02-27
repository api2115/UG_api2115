import React, {useEffect, useState} from "react"
import axios from "axios";
import {Link} from "react-router-dom";


export default function Id({m,filmy,refresh,setRefresh}){
    const [film,setFilm] = useState(0)
    const [edytowany] = useState({title:"",director:"",genre:"",year:"",description:"",image_url:""})
    const [rating,setRating]=useState(0)
    const [edytowanie,setEdytowanie]=useState(false)
    const [ocenianie,setOcenianie]=useState(true)
    const [usuwanie,setUsuwanie]=useState(false)

    useEffect( ()=>{
        async function fetchData() {
            if(Number.isInteger(parseInt(m))) {
                axios.get("http://localhost:3000/movie/" + m)
                    .then(resonse => setFilm(resonse.data))
            }
        }
        fetchData()
    },[m])


    function potwierdz(e){
        edytowany.title=film.title
        edytowany.director=film.director
        edytowany.genre=film.genre
        edytowany.year=film.year
        edytowany.description=film.description
        edytowany.image_url=film.image_url
        axios.put("http://localhost:3000/movie/"+m,edytowany)
            .then(response=>setRefresh(!refresh))
        setEdytowanie(!edytowanie)
    }

    function edit(e){
        if(e.target.id==="title"){
            const unikalny = filmy.reduce(function(wynik,current){
                if(current.title===e.target.value){
                    wynik.push(0)
                }
                return wynik
            },[])
            if(unikalny.includes(0)===false){
                film[e.target.id]=e.target.value
            }else {
                window.alert("Tutuł musi być unikalny")
            }
        } else if(e.target.id==="year"){
            if(e.target.value<1000 || e.target.value>(new Date().getFullYear())){
                window.alert("Zła data")
            } else {
                film[e.target.id]=e.target.value
            }
        } else if(e.target.value==="") {
            window.alert("Nie zostawiaj pustych pól")
        } else {
            film[e.target.id]=e.target.value
        }

    }
    function zapiszocene(){
        axios.patch("http://localhost:3000/movie/"+m+"/rate",null,{params: {score:rating}})
        setOcenianie(false)
    }

    function usun(){
        setUsuwanie(!usuwanie)
    }

    function potwierdzusun(){
        axios.delete("http://localhost:3000/movie/"+m)
        setRefresh(!refresh)
    }



    return(
        <>

            <div>{filmy.length>0 && film!==0 ?
                <>
                    <div>
                        <button onClick={usun} >Usun</button>
                        {usuwanie ? <Link to={"/"}><button onClick={potwierdzusun}>Potwierdz</button></Link> : <div/>}
                    </div>
                    <div className="film">
                        <p><img className="obrazek" src={film.image_url} alt="zdjecie"  /></p>
                        <div>{edytowanie ? <div>
                            <form>
                                <p>Tytuł:<input onChange={edit} id="title" defaultValue={film.title}/></p>
                                <p>Gatunek:<input onChange={edit} id="genre" defaultValue={film.genre}/></p>
                                <p>Reżyser:<input onChange={edit} id="director" defaultValue={film.director}/></p>
                                <p>Rok:<input onChange={edit} type="number" id="year" min="1000"  defaultValue={film.year}/></p>
                                <p>Opis:<textarea onChange={edit} id="description" className="opisForm">{film.description}</textarea></p>
                                <div><input onClick={potwierdz} className="dodajPotwierdz" type="submit" value="Potwierdź zmiany"/></div>
                            </form>
                        </div>
                        :
                            <div>
                                <p key={film.title} >Tytuł:{film.title}</p>
                                <p key={film.genre} >Gatunek:{film.genre}</p>
                                <p key={film.director}>Reżyser:{film.director}</p>
                                <p key={film.year}>Rok:{film.year}</p>
                                <p key={film.id}>Opis:{film.description}</p></div>
                        }</div>
                        <div key={"ocena"} className="rating">
                            {ocenianie ? <div className="st">{[...Array(5)].map(function(current,index){
                                if(index>=rating) {
                                    return <label key={index}><input type="radio" name="rating" value={index + 1}
                                                         onClick={() => setRating(index+1)}/><p className="str">☆</p>
                                    </label>
                                } else {
                                    return <label key={index}><input type="radio" name="rating" value={index + 1}
                                                         onClick={() => setRating(index+1)}/><p className="stG">☆</p>
                                    </label>
                                }
                            })}
                                    <p><button onClick={zapiszocene}>Zapisz ocene</button></p>
                            </div> :
                                <div className="stars">{[...Array(5)].map(function(current,index){
                                    if(index<rating){
                                        return <p className="starG">☆</p>
                                    }else{
                                        return <p className="star">☆</p>
                                    }
                                })}</div>
                                }
                            <p><button className="ratingbutton" onClick={()=>{setEdytowanie(!edytowanie)}}>Edytuj film</button></p>
                        </div>
                    </div>
                </>
                : <div/>}</div>
        </>
    )
}