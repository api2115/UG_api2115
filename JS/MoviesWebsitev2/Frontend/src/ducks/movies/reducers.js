import types from "./types";


export function moviesReducer(state=[],action){
    switch(action.type){
        case types.MOVIE_LIST:
            return [...action.payload]
        case types.MOVIE_CREATE:
            return [...state,action.payload]
        case types.MOVIE_ONE:
            return action.payload
        case types.MOVIE_DELETE:
            return [...state.filter(el=>el.id!==action.payload)]
        case types.MOVIE_EDIT:
            return [...state.map(el=>el.id===action.payload.id?action.payload:el)]
        default:
            return state
    }
}

