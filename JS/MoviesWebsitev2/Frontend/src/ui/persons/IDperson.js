import React, {useEffect,useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getPersonsList,editPerson} from "../../ducks/persons/operations";
import {getMoviesList} from "../../ducks/movies/operations";
import {connect} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import "../../app.scss"

const Idperson = ({persons,getPersonsList,refresh,setRefresh,editPerson,movies,getMoviesList})=>{
    let {id} = useParams()
    const [person,setPerson] = useState({})
    const [edytowanie,setEdytowanie]=useState(false)

    useEffect(()=>{
       getPersonsList()
        getMoviesList()
    },[refresh])

    useEffect(()=>{
        setPerson(persons.filter(el=>el.id===parseInt(id))[0])
    },[persons,refresh])

    const handleSubmit = (values) => {
        editPerson(id,values)
        setEdytowanie(!edytowanie)
        setRefresh(!refresh)
    }

    const ValidationSchema=Yup.object().shape({
        first_name: Yup.string()
            .required('Wymagane')
            .max(60),
        last_name: Yup.string()
            .required('Wymagane')
            .max(60),
        birth_date: Yup.string()
            .required('Wymagane'),
        nationality: Yup.string()
            .required('Wymagane')
            .max(60),
    })


    return(
        <div>
            <button onClick={()=>setEdytowanie(!edytowanie)}>Edytuj</button>
            {edytowanie?
                <Formik
                    initialValues={{
                        first_name: person.first_name,
                        last_name: person.last_name,
                        birth_date:person.birth_date.slice(0,10),
                        nationality:person.nationality
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={ValidationSchema}
                    enableReinitialize={true}>
                    {({errors,touched})=>(
                        <Form>
                            <Field name="first_name" />
                            {errors.first_name && touched.first_name ? (
                                <div>{errors.first_name}</div>
                            ) : null}
                            <Field name="last_name" />
                            {errors.last_name && touched.last_name ? (
                                <div>{errors.last_name}</div>
                            ) : null}
                            <Field name="birth_date" />
                            {errors.birth_date && touched.birth_date ? (
                                <div>{errors.birth_date}</div>
                            ) : null}
                            <Field name="nationality" as="select">
                                <option value='' label="wybierz"/>
                                <option value="PL" label="PL"/>
                                <option value="US" label="US"/>
                                <option value="DE" label="DE"/>
                                <option value="FR" label="FR"/>
                            </Field>
                            {errors.nationality && touched.nationality ? (
                                <div>{errors.nationality}</div>
                            ) : null}
                            <button type="submit">Zatwierdz</button>
                        </Form>)}
                </Formik>
        :<div>
            {person!==undefined?
                <div>
                    <div className={"centerbox"}>
                    <div className={"idpersonbox"}>
            <div>Imie:{person.first_name}</div>
            <div>Nazwisko:{person.last_name}</div>
            <div>Data urodzenia:{person.birth_date && person.birth_date.slice(0,10)}</div>
            <div>Pochodzenie:{person.nationality}</div>
                    </div>
                    </div>
                    <h3>Filmy</h3>
                    {movies.length>0?movies.map(movie=>{
                        if(movie.director_id===person.id){
                            return (
                                <Link to={"/movies/"+movie.id}><div className="titlemov">{movie.title}</div></Link>
                            )
                        }
                        })
                    :<div>brak filmów</div>}
                </div>:null}

        </div>}
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
    editPerson,
    getMoviesList
}


export default connect(mapStateToProps,mapDispatchToProps)(Idperson)