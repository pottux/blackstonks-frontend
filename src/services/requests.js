import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const getExpenses = () => {
    return axios.get(`${API_URL}/api/expenses`)
        .then(function (response) {
            //console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
}

export const postRating = (name, rating) => {
    return axios.post(`${API_URL}/api/ratings`, {
        name,
        rating,
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
}