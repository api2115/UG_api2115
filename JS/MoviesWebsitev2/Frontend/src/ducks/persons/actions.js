import types from './types';

export const personListAction = (persons) => ({
    type: types.PERSON_LIST,
    payload: persons
});

export const personCreateAction = (newPerson) => ({
    type: types.PERSON_LIST,
    payload: newPerson
});

export const personOneAction = (movie) => ({
    type: types.PERSON_ONE,
    payload: movie
});

export const personDeleteAction = (id) => ({
    type: types.PERSON_DELETE,
    payload: id
});

export const personEditAction = (newPerson) => ({
    type: types.PERSON_EDIT,
    payload: newPerson
});