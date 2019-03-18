import axios from 'axios';

export const propertyService = {
    propertyAll,
    propertyById
}

function propertyAll() {
    return new Promise((resolve, reject) => {
        axios.get('/property').then(res => {
            resolve(res.data);
        }, err => {
            reject(err);
        })
    }) 
}

function propertyById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/property/${id}`).then(res => {
            resolve(res.data);
        }, err => {
            reject(err);
        })
    })
}