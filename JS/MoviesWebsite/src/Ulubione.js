import React,{useState} from "react"
import {Link} from "react-router-dom";

export default function Ulubione({ulub}){
    const [usuwanie,setUsuwanie] = useState(false)
    const [dlt,setDlt] = useState([])
    const [ulubione,setUlubione] = useState(Array.from(ulub))
    const [sortowanie,setSortowanie] = useState(false)

    function del(){
        setUsuwanie(!usuwanie)
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
            const idx = ulubione.reduce(function(wynik,current,index){
                if(current.id===parseInt(e)){
                    wynik=index
                }
                return wynik
            },0)
            ulub.delete(ulubione[idx])
            ulubione.splice(idx,1)
            console.log(ulubione,ulub)
        })
        setUsuwanie(false)
        setDlt([])
    }

    function srt(e){
        if(e.target.id==="year" || e.target.id==="rating"){
            const naj = ulubione.sort((a, b) => b[e.target.id] - a[e.target.id])
            setUlubione(naj)
        }else {
            const naj = ulubione.sort((a,b)=> (a.title>b.title) ? 1 : -1 )
            setUlubione(naj)
        }
        setSortowanie(false)
    }

    function trs(e){
        if(e.target.id==="year" || e.target.id==="rating"){
            const naj = ulubione.sort((a, b) => a[e.target.id] - b[e.target.id])
            setUlubione(naj)
        }else {
            const naj = ulubione.sort((a,b)=> (a.title>b.title) ? -1 : 1 )
            setUlubione(naj)
        }
        setSortowanie(false)
    }

    return(
        <div>
            <div className="Filtr">
                {ulubione.length>0 ?<button onClick={del}>Usuń</button> : <div/>}
                {ulubione.length>0 ?
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
                    : <div/>}
            </div>
            {ulub.size>0 ?
                <div>{ulubione.map((film)=>{
                    return <div key={film.id} className="film">
                        <div>{usuwanie ? <input type="checkbox" name={film.id} onChange={check}/> : <div/>}</div>
                        <Link to={'/'+ film.id}><p><img src={film.image_url} alt="zdjecie" className="obrazek" /></p></Link>
                        <div>
                            <Link to={'/'+ film.id}><p key={film.title}>Tytuł:{film.title}</p></Link>
                            <p key={film.genre}>Gatunek:{film.genre}</p>
                            <p key={film.director}>Reżyser:{film.director}</p>
                            <p key={film.year}>Rok:{film.year}</p>
                        </div>
                        <div className="rating">
                            <div className="stars">{[...Array(5)].map(function(current,index){
                                if(index<film.rating){
                                    return <p key={index} className="starG">☆</p>
                                }else{
                                    return <p key={index} className="star">☆</p>
                                }
                            })}</div>
                        </div>
                    </div>
                })}</div>
                : <div><h1>Nie masz ulubionych</h1></div>}
            <div>{usuwanie ? <button onClick={clear}>Potwierdź</button> : <div/>}</div>
        </div>
    )
}