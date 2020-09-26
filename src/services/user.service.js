import { authHeader } from '../helpers';
import axios from 'axios'

export const userService = {
    login,
    logout,
    userGetAll,
    userGetOne,
    userCreate,
    userRemove,
    userUpdate,
    userUpdatePass

};

function login(login, senha) {
    return axios.post('/login', { login, senha })
        .then(data => {
            let user = { ...data.data }

            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        }).catch((e) => {
            return e
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function userGetAll() {
    const requestOptions = {
        method: 'GET',
    };

    return axios.get(`/usuarios`, requestOptions)
        .then(users => {
            return users.data
        })
}
function userGetOne(id) {
    const requestOptions = {
        method: 'GET',
    };

    return axios.get(`/usuarios/${id}`, requestOptions)
        .then(users => {
            return users.data
        })
}
/**
 * 
 * @param {User} user 
 */
function userCreate(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post('/usuarios', {
        ...user
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {User} user 
 */
function userUpdate(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/usuarios/${user.id}`, {
        ...user
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {User} user 
 */
function userUpdatePass(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/usuarios/pass/${user.id}`, {
        ...user
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function userRemove(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.delete(`/usuarios/${id}`, requestOptions).then(data => {
        return data.data
    })
}



