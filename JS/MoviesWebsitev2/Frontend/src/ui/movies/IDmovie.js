import React, {useEffect,useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getOneMovie,editMovie} from "../../ducks/movies/operations";
import {getPersonsList} from "../../ducks/persons/operations";
import {connect} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import "../../app.scss"

const Idmovie = ({ refresh, setRefresh,movie,getOneMovie,persons,getPersonsList,editMovie})=>{
    const [edytowanie,setEdytowanie]=useState(false)
    let {id} = useParams()
    const [director, setDirector] = useState(undefined)

    useEffect(() => {
        if (movie!==undefined && persons.length>0){
            setDirector(persons.filter(person=>person.id===movie.director_id)[0])
        }
    }, [movie,persons])

    useEffect(()=>{
        getOneMovie(id)
        getPersonsList()
    },[refresh])

    const handleSubmit = (values) => {
        if(values.director.id==="0"){
            delete values.director
        }
        editMovie(id,values)
        setEdytowanie(!edytowanie)
        setRefresh(!refresh)
    }


    const ValidationSchema=Yup.object().shape({
        title: Yup.string()
            .required('Wymagane'),
        genre: Yup.string()
            .required('Wymagane')
            .max(50),
        release_date: Yup.date()
            .required('Wymagane'),
        description: Yup.string()
            .required('Wymagane'),
        image_url: Yup.string()
            .required('Wymagane'),
        director: Yup.object().shape({
            id: Yup.string().required("Wymagane")
        })
    })



    return(
        <div>
            <button className="editbutton" onClick={()=>setEdytowanie(!edytowanie)}>Edytuj</button>
            {edytowanie ?<div>
                    <Formik
                        initialValues={{
                            title: movie.title,
                            genre: movie.genre,
                            release_date:movie.release_date.slice(0,10),
                            description:movie.description,
                            image_url:movie.image_url,
                            director:{id:movie.director_id}
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={ValidationSchema}
                        enableReinitialize={true}>
                        {({errors,touched})=>(
                            <Form>
                                <Field name="title" placeholder="tytuł"/>
                                {errors.title && touched.title ? (
                                    <div>{errors.title}</div>
                                ) : null}
                                <Field name="genre" placeholder="gatunek"/>
                                {errors.genre && touched.genre ? (
                                    <div>{errors.genre}</div>
                                ) : null}
                                <Field name="release_date" placeholder="data wydania"/>
                                {errors.release_date && touched.release_date ? (
                                    <div>{errors.release_date}</div>
                                ) : null}
                                <Field name="description" placeholder="opis"/>
                                {errors.description && touched.description ? (
                                    <div>{errors.description}</div>
                                ) : null}
                                <Field name="image_url" placeholder="okładka"/>
                                {errors.image_url && touched.image_url ? (
                                    <div>{errors.image_url}</div>
                                ) : null}
                                <Field name="director.id" as="select">
                                    <option value={""} label={"wybierz reżysera"} key="wybor"/>
                                    <option value={0} label={"BRAK"} key="brak"/>
                                    {persons.length>0?
                                        persons.map(person=>{
                                            return(
                                                <option value={person.id} label={person.first_name+" "+person.last_name}/>
                                            )
                                        }):null

                                    }
                                </Field>
                                {errors.director && touched.director ? (
                                    <div>{errors.director.id}</div>
                                ) : null}
                                <button type="submit">Zatwierdz</button>
                            </Form>)}
                    </Formik>
                </div>
                :
                <div className="filmspace">
                    <div className="details">
                    <div className="filmbox">
                        <div>
                            reżyser:{director
                                ?<Link to={"/persons/"+director.id}>{director.first_name+" "+director.last_name}</Link>
                                :"Brak"}
                        </div>
                        <div>tytuł:{movie.title}</div>
                        <div>gatunek:{movie.genre}</div>
                        <div>data wydania:{movie.release_date && movie.release_date.slice(0,10)}</div>
                        <div>opis:{movie.description}</div>
                    </div>
                    <div className="filmimage"><img src={movie.image_url} alt="tekst zamiast zdjęcia"/></div>
                    </div>
                </div>
            }
        </div>

    )
}

const mapStateToProps = (state) => {
    return{
        movie:state.movies,
        persons:state.persons,

    }
}
const mapDispatchToProps = {
    getOneMovie,
    getPersonsList,
    editMovie
}


export default connect(mapStateToProps,mapDispatchToProps)(Idmovie)