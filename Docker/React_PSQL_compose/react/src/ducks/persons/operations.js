import axios from "axios";
import * as actions from './actions';

export const getPersonsList = () => {
    return async dispatch => {
        const response = await
            axios.get('http://localhost:5000/api/persons');
        dispatch(actions.personListAction(response.data));
    }
}

export const createPerson = (newPerson) => {
    return async dispatch => {
        try {
            const response = await
                axios.post('http://localhost:5000/api/persons', newPerson);
            if(response.status === 201)
                dispatch(actions.personCreateAction(response.data));
        } catch(ex) {

        }
    }
}

export const getOnePerson = (id)=>{
    return async dispatch=>{
        const response = await
            axios.get('http://localhost:5000/api/persons/'+String(id))
        dispatch(actions.personOneAction(response.data))
    }
}

export const deletePerson = (id)=>{
    return async dispatch=>{
        const response = await
            axios.delete('http://localhost:5000/api/persons/'+String(id))
        dispatch(actions.personDeleteAction(String(id)))
    }
}

export const editPerson = (id,newPerson)=>{
    return async dispatch=>{
        const response = await
            axios.put('http://localhost:5000/api/persons/'+String(id),newPerson)
        dispatch(actions.personEditAction(response.data))
    }
}