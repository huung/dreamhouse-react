import axios from 'axios'

export const favoriteService = {
    favoriteAll,
    addFavorite
}

function favoriteAll(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/favorite/${id}`).then(res => {
            resolve(res.data);
        }, err => {
            reject(err);
        })
    }) 
}

function addFavorite(info) {
    return new Promise((resolve, reject) => {
        axios.post('/favorite', info).then(res => {
            console.log('add_favorite', res.data)
            resolve(res.data)
        }, err => {
            reject(err);
        })
    })
}