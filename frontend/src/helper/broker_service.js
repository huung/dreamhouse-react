import axios from 'axios';

export const brokerService = {
    brokerAll,
    brokerById
}

function brokerAll() {
    return new Promise((resolve, reject) => {
        axios.get('/broker').then(res => {
            resolve(res.data);
        }, err => {
            reject(err);
        })
    }) 
}

function brokerById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/broker/${id}`).then(res => {
            resolve(res.data);
        }, err => {
            reject(err);
        })
    })
}