import { authHeader } from '../helpers';
import axios from 'axios'

export const carService = {
    carGetAll,
    carCreate,
    carRemove,
    carUpdate

};

function carGetAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`/cars`, requestOptions)
        .then(cars => {
            return cars.data
        })
}
/**
 * 
 * @param {car} car 
 */
function carCreate(car) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post('/cars', {
        ...car
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {car} car 
 */
function carUpdate(car) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.post(`/cars/${car.id}`, {
        ...car
    }, requestOptions).then(data => {
        return data.data
    })
}
/**
 * 
 * @param {id} id 
 */
function carRemove(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.delete(`/cars/${id}`, requestOptions).then(data => {
        return data.data
    })
}



