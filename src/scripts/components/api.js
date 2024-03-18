// const BASE_URL = 'https://nomoreparties.co/v1/';

// {
//     "name": "Jacques Cousteau",
//         "about": "Sailor, researcher",
//             "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
//                 "_id": "2458a5dbf48d2ce30338e441",
//                     "cohort": "wff-cohort-9"
// }

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
    headers: {
        authorization: '7813a882-8b4e-45b6-82a9-68275120708a',
        'Content-Type': 'application/json'
    }
}

// export const getInitialUser = () => {
//     // request()
//     return fetch(`${config.baseUrl}/users/me`, {
//         headers: config.headers
//     })
//         // .then((response) => {
//         //     return response.json();
//         // })
//         .then(handleResponce);
        
//        // .then(res => {
//         //     if (res.ok) {
//         //         return res.json();
//         //     }

//         //     // если ошибка, отклоняем промис
//         //     return Promise.reject(`Ошибка: ${res.status}`);
//         // });    
// }

// export const getInitialCards = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//         headers: config.headers
//     })
//         //  .then((response) => {
//         //      return response.json();
//         //  })
//         .then(handleResponce);
// }

function handleResponce(responce) {
    // реализовать обработку ответа сервера. при ок возвращаем объект responce.json иначе ошибку Promise.reject(err)
    // return responce.json();

            // .then(res => {
                if (responce.ok) {
                    return responce.json();
                }
                // если ошибка, отклоняем промис
                     return Promise.reject(`Ошибка: ${responce.status}`);
            // });
}

function get(uri) {
    // формируем итоговый адрес
    const targetUrl = config.baseUrl + uri;
    return fetch(targetUrl, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponce)
}

function post(uri, data, method = 'POST') {
    const targetUrl = config.baseUrl + uri;
    return fetch(targetUrl, {
        method,
        headers: config.headers,
        body: JSON.stringify(data)
    })
        .then(handleResponce);
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


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// const BASE_URL = 'https://jsonplaceholder.typicode.com';

// function request(uri, options) { 
//     return fetch(BASE_URL + uri, options)
//         .then((response) => { 
//             return response.json();
//         })
// }

// request('/todos')
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// request('/users/me', 'GET')
    // .then((res) => console.log(res))