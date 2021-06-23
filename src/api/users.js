import axios from 'axios';

export const getUsers = () => {
    return axios.get('/users', {
        params: {
            limit: 1000
        }
    })
}

export const createUser  = ({firstName, lastName}) => {
    console.log("[API > USERS] ", firstName, lastName)
    return axios.post('/users', {
        firstName, 
        lastName
    })
}

export const deleteUser = (id) => {

    return axios.delete(`/users/${id}`)
}