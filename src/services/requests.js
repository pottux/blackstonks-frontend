import axios from 'axios';

const API_URL = 'http://localhost:8000'

export const getExpenses = () => {
    return axios.get(`${API_URL}/api/expenses`)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
}