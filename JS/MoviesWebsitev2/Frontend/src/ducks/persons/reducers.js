import types from "./types";

export function personsReducer(state=[],action){
    switch(action.type){
        case types.PERSON_LIST:
            return [...action.payload]
        case types.PERSON_CREATE:
            return [...state,action.payload]
        case types.PERSON_ONE:
            return [...state,action.payload]
        case types.PERSON_DELETE:
            return [...state.filter(el=>el.id!==action.payload)]
        case types.PERSON_EDIT:
            return [...state.map(el=>el.id===action.payload.id?action.payload:el)]
        default:
            return state
    }
}
