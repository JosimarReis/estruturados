import { authHeader } from '../helpers';
import axios from 'axios'

export const enderecoService = {
    enderecoGetAll,
    enderecoCreate,
    enderecoRemove,
    enderecoUpdate,
    enderecoGet

};

function enderecoGetAll(pessoa_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/enderecos`, requestOptions)
        .then(enderecos => {
            return enderecos.data
        })
}
function enderecoGet(pessoa_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/enderecos/${id}`, requestOptions)
        .then(enderecos => {
            return enderecos.data
        })
}
/**
 * 
 * @param {endereco} endereco 
 */
function enderecoCreate(pessoa_id, endereco) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/enderecos`, {
        ...endereco
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {endereco} endereco 
 */
function enderecoUpdate(pessoa_id, endereco) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/enderecos/${endereco.id}`, {
        ...endereco
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function enderecoRemove(pessoa_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.delete(`/pessoas/${pessoa_id}/enderecos/${id}`, requestOptions).then(data => {
        return data.data
    })
}



