// Токен: 7813a882-8b4e-45b6-82a9-68275120708a
// Идентификатор группы: wff-cohort-9

// const initialCards = [];

const URL_SERVER = 'https://nomoreparties.co/v1';
const COHORT = 'wff-cohort-9';
const KEY = '7813a882-8b4e-45b6-82a9-68275120708a';


// function test() { 
//     return fetch('https://nomoreparties.co/v1/wff-cohort-9/cards', {
//         headers: {
//             authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
//         }
//     })
//         .then(res => res.json())
//         .then((result) => {
//             // console.log(result);
//             result.forEach(element => { 
//                 // console.log(element.name);
//                 // initialCards.name = elem.name;
//                 // initialCards.link = elem.link;
//                 placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
//             })
//         });
// }

// function test1() {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me', {
//         headers: {
//             authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
//         }
//     })
//         .then(res => res.json())
//         .then((result) => {
//             console.log(result);
//         });
// }


// function test2() {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me', {
//         headers: {
//             authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
//         }
//     })
//         .then((res) => {
//             if (res.headers.get('Content-Type').contains('application/json')) {
//                 return res.json();
//             }
//         });
// }

// function test4() {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me', {
//         headers: {
//             authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
//         }
//     })
//         .then(res => {
//             console.log(res.status); // какой у ответа статус?
//             console.log(res.headers.get('Content-Type')); // а Content-Type какой?
//             return res.json();
//         })
//         .then((data) => {
//             console.log(data); // а что пришло в теле?
//         });
// }

// test4();
// checkUrl('https://ya.ru/');
// getInitialCards();

// // Вывести карточки из массива initialCards на страницу
// initialCards.forEach(element => {
//     placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
// });

// EXAMPLE

// // Создаём первый промис
// const firstPromise = new Promise((resolve, reject) => {
//     if (someCondition) {
//         resolve('Первый промис');
//     } else {
//         reject();
//     }
// });

// // Создаём второй промис
// const secondPromise = new Promise((resolve, reject) => {
//     if (secondCondition) {
//         resolve('Второй промис');
//     } else {
//         reject();
//     }
// });

// // Создаём массив с промисами
// const promises = [firstPromise, secondPromise]

// // Передаём массив с промисами методу Promise.all
// Promise.all(promises)
//     .then((results) => {
//         console.log(results); // ["Первый промис", "Второй промис"]
//     });

// Таким образом, промисы — запросы на асинхронный код.Когда мы создаём промис, мы говорим движку:
// выполни вот этот код и по результатам переведи промис в статус «исполнен» или «отклонён».
// Все дальнейшие действия с результатом запроса прописывают в цепочке методов then и catch. Они принимают на вход колбэк
// с одним параметром.В этот параметр записывается либо то, что вернул предыдущий then или catch, либо то значение,
//     с которым была вызвана функция resolve или reject.

// Создаём массив с промисами


const objProfileForServer = {
    name: 'Роман',
    about: 'В процессе'
}

const objNewCard = {
    name: 'Песня про бобров',
    link: 'https://ew.com/thmb/GzVVfW8KGfimpqoVYBiPW8pEens=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mel-gibson-beaver_l-1-5088c6664b634da0873b1195062e379f.jpg'
}

const objNewCard1 = {
    name: 'some string',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    // link: 'https://cdn1.ozone.ru/s3/multimedia-a/6269924842.jpg'
    // https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg
}

// const getInitialUser = getInitialUser('/users/me');
// const getInitialCards = getInitialCards('/cards');
// post('/users/me', objProfileForServer, 'PATCH');
// post('/cards', objNewCard1, 'POST');
// post('/cards/65f46977fa88570012695e3a', {}, 'DELETE');
// post('/users/me/avatar', {avatar: "https://e7.pngegg.com/pngimages/863/315/png-clipart-javascript-world-wide-web-product-design-logo-javascript-text-orange.png"}, 'PATCH');


// setInitiaUser();

// const promises = [getInitialUser, getInitialCards];
// Передаём массив с промисами методу Promise.all
// Promise.all(promises)
//     .then((responses) => {
//         // responses — массив результатов выполнения промисов
//         responses.forEach(resp => {
//             console.log(resp)
//         })
//     })
//     .catch(err => console.log(err));