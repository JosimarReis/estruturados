import { authHeader } from '../helpers';
import axios from 'axios'

export const emprestimoService = {
    emprestimoGetAll,
    emprestimoCreate,
    emprestimoRemove,
    emprestimoUpdate,
    emprestimoGet

};

function emprestimoGetAll(pessoa_id, beneficio_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/emprestimos`, requestOptions)
        .then(emprestimos => {
            return emprestimos.data
        })
}
function emprestimoGet(pessoa_id, beneficio_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/emprestimos/${id}`, requestOptions)
        .then(emprestimos => {
            return emprestimos.data
        })
}

/**
 * 
 * @param {emprestimo} emprestimo 
 */
function emprestimoCreate(pessoa_id, beneficio_id, emprestimo) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/emprestimos`, {
        ...emprestimo
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {emprestimo} emprestimo 
 */
function emprestimoUpdate(pessoa_id, beneficio_id, emprestimo) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/emprestimos/${emprestimo.id}`, {
        ...emprestimo
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function emprestimoRemove(pessoa_id, beneficio_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.delete(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/emprestimos/${id}`, requestOptions).then(data => {
        return data.data
    })
}



