export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
    headers: {
        authorization: '7813a882-8b4e-45b6-82a9-68275120708a',
        'Content-Type': 'application/json'
    }
}

function handleResponce(responce) {
    // обработка ответа сервера. при ок возвращаем объект responce.json иначе ошибку Promise.reject(err)
    if (responce.ok) {
        return responce.json();
    }
        return Promise.reject(`Ошибка: ${responce.status}`);
}

function request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(handleResponce)
}

function get(uri) {
    // формируем итоговый адрес
    const targetUrl = config.baseUrl + uri;
    return request(targetUrl, {
        method: 'GET',
        headers: config.headers 
    })
}

function post(uri, data, method = 'POST') {
    const targetUrl = config.baseUrl + uri;
    return request(targetUrl, {
        method,
        headers: config.headers,
        body: JSON.stringify(data)
    })
}

export function getInitialUser(uri) {
    return get(uri);
}

export function getInitialCards(uri) {
    return get(uri);
}

export function setRedactionProfile(uri, data, method) {
    return post(uri, data, method);
}

export function setNewCard(uri, data, method) {
    return post(uri, data, method);
}

export function setDeleteCard(uri, data, method) {
    return post(uri, data, method);
}

export function setPutLike(uri, data, method) {
    return post(uri, data, method);
}

export function setDeleteLike(uri, data, method) {
    return post(uri, data, method);
}

export function setChangeAvatarProfile(uri, data, method) {
    return post(uri, data, method);
}

// function getOld(uri) {
//     // формируем итоговый адрес
//     const targetUrl = config.baseUrl + uri;
//     return fetch(targetUrl, {
//         method: 'GET',
//         headers: config.headers
//     })
//         .then(res => handleResponce(res))
// }

// function postOld(uri, data, method = 'POST') {
//     const targetUrl = config.baseUrl + uri;
//     return fetch(targetUrl, {
//         method,
//         headers: config.headers,
//         body: JSON.stringify(data)
//     })
//         .then(res => handleResponce(res))
// }
