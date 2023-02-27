import axios from "axios";
import * as actions from './actions';

export const getMoviesList = () => {
    return async dispatch => {
        const response = await
            axios.get('http://localhost:5000/api/movies');
        dispatch(actions.movieListAction(response.data));
    }
}

export const createMovie = (newMovie) => {
    return async dispatch => {
        try {
            const response = await
                axios.post('http://localhost:5000/api/movies', newMovie);
            if(response.status === 201)
                dispatch(actions.movieCreateAction(response.data));
        } catch(ex) {

        }
    }
}

export const getOneMovie = (id)=>{
    return async dispatch=>{
        const response = await
            axios.get('http://localhost:5000/api/movies/'+String(id))
        dispatch(actions.movieOneAction(response.data))
    }
}

export const deleteMovie = (id)=>{
    return async dispatch=>{
        const response = await
            axios.delete('http://localhost:5000/api/movies/'+String(id))
        dispatch(actions.movieDeleteAction(String(id)))
    }
}

export const editMovie = (id,newMovie)=>{
    return async dispatch=>{
        const response = await
            axios.put('http://localhost:5000/api/movies/'+String(id),newMovie)
        dispatch(actions.movieEditAction(response.data))
    }
}