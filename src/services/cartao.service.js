import { authHeader } from '../helpers';
import axios from 'axios'

export const cartaoService = {
    cartaoGetAll,
    cartaoCreate,
    cartaoRemove,
    cartaoUpdate,
    cartaoGet

};

function cartaoGetAll(pessoa_id, beneficio_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes`, requestOptions)
        .then(cartoes => {
            return cartoes.data
        })
}
function cartaoGet(pessoa_id, beneficio_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes/${id}`, requestOptions)
        .then(cartoes => {
            return cartoes.data
        })
}

/**
 * 
 * @param {cartao} cartao 
 */
function cartaoCreate(pessoa_id, beneficio_id, cartao) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes`, {
        ...cartao
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {cartao} cartao 
 */
function cartaoUpdate(pessoa_id, beneficio_id, cartao) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes/${cartao.id}`, {
        ...cartao
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function cartaoRemove(pessoa_id, beneficio_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.delete(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes/${id}`, requestOptions).then(data => {
        return data.data
    })
}



