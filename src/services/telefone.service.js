import { authHeader } from '../helpers';
import axios from 'axios'

export const telefoneService = {
    telefoneGetAll,
    telefoneCreate,
    telefoneRemove,
    telefoneUpdate,
    telefoneGet

};

function telefoneGetAll(pessoa_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/telefones`, requestOptions)
        .then(telefones => {
            return telefones.data
        })
}
function telefoneGet(pessoa_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/telefones/${id}`, requestOptions)
        .then(telefones => {
            return telefones.data
        })
}
/**
 * 
 * @param {telefone} telefone 
 */
function telefoneCreate(pessoa_id, telefone) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/telefones`, {
        ...telefone
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {telefone} telefone 
 */
function telefoneUpdate(pessoa_id, telefone) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/telefones/${telefone.id}`, {
        ...telefone
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function telefoneRemove(pessoa_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.delete(`/pessoas/${pessoa_id}/telefones/${id}`, requestOptions).then(data => {
        return data.data
    })
}



