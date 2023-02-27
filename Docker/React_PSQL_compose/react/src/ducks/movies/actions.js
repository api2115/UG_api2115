import types from './types';

export const movieListAction = (movies) => ({
    type: types.MOVIE_LIST,
    payload: movies
});

export const movieCreateAction = (newMovie) => ({
    type: types.MOVIE_CREATE,
    payload: newMovie
});

export const movieOneAction = (movie) => ({
    type : types.MOVIE_ONE,
    payload: movie
})

export const movieDeleteAction = (id) => ({
    type : types.MOVIE_DELETE,
    payload: id
})

export const movieEditAction = (newMovie) => ({
    type : types.MOVIE_EDIT,
    payload: newMovie
})