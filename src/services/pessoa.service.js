import { authHeader } from '../helpers';
import axios from 'axios'

export const pessoaService = {
    pessoaGetAll,
    pessoaCreate,
    pessoaGetOne,
    pessoaRemove,
    pessoaUpdate,
    pessoaFilterAll,
    pessoaFindPages
};
function pessoaFilterAll(filters) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return axios.post(`/pessoas`, { ...filters }, requestOptions)
        .then(pessoas => {
            return pessoas.data
        })
}
function pessoaGetAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas`, requestOptions)
        .then(pessoas => {
            return pessoas.data
        })
}
function pessoaFindPages(filtros) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return axios.post(`/pessoas/pages`, { ...filtros }, requestOptions)
        .then(pessoas => {
            return pessoas.data
        })
}
function pessoaGetOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${id}`, requestOptions)
        .then(pessoas => {
            return pessoas.data
        })
}
/**
 * 
 * @param {pessoa} pessoa 
 */
function pessoaCreate(pessoa) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    return axios.post('/pessoas', {
        ...pessoa
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {pessoa} pessoa 
 */
function pessoaUpdate(pessoa) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa.id}`, {
        ...pessoa
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function pessoaRemove(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return axios.delete(`/pessoas/${id}`, requestOptions).then(data => {
        return data.data
    })
}



