import {API} from '../config';

export const getFolders = () => {
    return fetch(`${API}/folder/all`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(final => {return final})
    .catch(err => console.log(err))
}

export const createFolder = (folder) => {
    return fetch(`${API}/folder/createfolder`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(folder)
    })
    .then(response => response.json())
    .then(final => {return final})
    .catch(err=> console.log(err))
}

export const deleteFolder = (name) => {
    return fetch(`${API}/folder/deletefolder?name=${name}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(final => {return final})
    .catch(err=>console.log(err))
}
