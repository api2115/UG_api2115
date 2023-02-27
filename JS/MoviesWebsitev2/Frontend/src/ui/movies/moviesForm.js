import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import {createMovie,getMoviesList} from "../../ducks/movies/operations";
import {getPersonsList} from "../../ducks/persons/operations";
import {useNavigate} from "react-router-dom";
import {useEffect,useState} from 'react'
import * as Yup from 'yup'
import "../../app.scss"


const MoviesForm = ({ createMovie, refresh, setRefresh,getPersonsList,persons,getMoviesList,titles}, props) => {
    let navigate=useNavigate()


    useEffect(()=>{
        getPersonsList()
        getMoviesList()
    },[refresh])

    const handleSubmit = (values) => {
        if(values.director.id==="0"){
            delete values.director
        }
        createMovie(values)
        setRefresh(!refresh)
        navigate("/movies")
    }


    const ValidationSchema=Yup.object().shape({
        title: Yup.string()
            .required('Wymagane')
            .notOneOf(titles,"tytuł jest duplikatem"),
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


    return (
        <div>
            <h3>Movie form</h3>
            <Formik
                initialValues={{
                    title: '',
                    genre: '',
                    release_date:'',
                    description:'',
                    image_url:'',
                    director:{id:''}
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={ValidationSchema}
                enableReinitialize={true}>
                {({errors,touched})=>(
                <Form>
                    <Field name="title" placeholder="tytuł" key="title"/>
                    {errors.title && touched.title ? (
                        <div>{errors.title}</div>
                    ) : null}
                    <Field name="genre" placeholder="garunek" key="genre"/>
                    {errors.genre && touched.genre ? (
                        <div>{errors.genre}</div>
                    ) : null}
                    <Field name="release_date" placeholder="data wydania" key="release_date"/>
                    {errors.release_date && touched.release_date ? (
                        <div>{errors.release_date}</div>
                    ) : null}
                    <Field name="description" placeholder="opis" key="description"/>
                    {errors.description && touched.description ? (
                        <div>{errors.description}</div>
                    ) : null}
                    <Field name="image_url" placeholder="okładka" key="image_url"/>
                    {errors.image_url && touched.image_url ? (
                        <div>{errors.image_url}</div>
                    ) : null}
                    <Field name="director.id" as="select" key="director">
                        <option value={""} label={"wybierz reżysera"} key="wybor"/>
                        <option value={0} label={"BRAK"} key="brak"/>
                        {persons.length>0?
                            persons.map(person=>{
                                return(
                                <option value={person.id} key={person.id} label={person.first_name+" "+person.last_name}/>
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
    )
}

const mapStateToProps = (state) => {
    return {
        persons:state.persons,
        titles:state.movies.map(item=>item.title)
    };
}

const mapDispatchToProps = ({
    createMovie,
    getPersonsList,
    getMoviesList
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesForm);