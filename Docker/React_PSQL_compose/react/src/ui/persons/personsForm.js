import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { createPerson } from '../../ducks/persons/operations';
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup'
import "../../app.scss"

const PersonsForm = ({ createPerson, refresh, setRefresh}, props) => {
    let navigate=useNavigate()


    const handleSubmit = (values) => {
        createPerson(values);
        setRefresh(!refresh)
        navigate("/persons")
    }

    const ValidationSchema=Yup.object().shape({
        first_name: Yup.string()
            .required('Wymagane')
            .max(60),
        last_name: Yup.string()
            .required('Wymagane')
            .max(60),
        birth_date: Yup.date()
            .required('Wymagane'),
        nationality: Yup.string()
            .required('Wymagane')
            .max(60),
    })

    return (
        <div>
            <h3>Person form</h3>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    birth_date:'',
                    nationality:''
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={ValidationSchema}
                enableReinitialize={true}>
                {({errors,touched})=>(
                <Form>
                    <Field name="first_name" key="first_name" placeholder="imie"/>
                    {errors.first_name && touched.first_name ? (
                        <div>{errors.first_name}</div>
                    ) : null}
                    <Field name="last_name" key="last_name" placeholder="nazwisko"/>
                    {errors.last_name && touched.last_name ? (
                        <div>{errors.last_name}</div>
                    ) : null}
                    <Field name="birth_date" key="birth_date" placeholder="data urodzenia"/>
                    {errors.birth_date && touched.birth_date ? (
                        <div>{errors.birth_date}</div>
                    ) : null}
                    <Field name="nationality" key="nationality" as="select">
                        <option value='' label="wybierz narodowość"/>
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = ({
    createPerson
});


export default connect(mapStateToProps, mapDispatchToProps)(PersonsForm);