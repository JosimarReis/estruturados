import { authHeader } from '../helpers';
import axios from 'axios'

export const beneficioService = {
    beneficioGetAll,
    beneficioCreate,
    beneficioRemove,
    beneficioUpdate,
    beneficioGet,
    beneficioConsulta

};

function beneficioGetAll(pessoa_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/beneficios`, requestOptions)
        .then(beneficios => {
            return beneficios.data
        })
}
function beneficioGet(pessoa_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/beneficios/${id}`, requestOptions)
        .then(beneficios => {
            return beneficios.data
        })
}
function beneficioConsulta(nb) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/beneficios/numero/${nb}`, requestOptions)
        .then(beneficios => {
            return beneficios.data
        })
}
/**
 * 
 * @param {beneficio} beneficio 
 */
function beneficioCreate(pessoa_id, beneficio) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/beneficios`, {
        ...beneficio
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {beneficio} beneficio 
 */
function beneficioUpdate(pessoa_id, beneficio) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/beneficios/${beneficio.id}`, {
        ...beneficio
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function beneficioRemove(pessoa_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.delete(`/pessoas/${pessoa_id}/beneficios/${id}`, requestOptions).then(data => {
        return data.data
    })
}



