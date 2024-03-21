(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r,o,c,a,u,i){var l=e.querySelector(".places__item").cloneNode(!0),s=l.querySelector(".card__image");return s.src=t.link,s.alt=t.name,s.addEventListener("click",o),t.owner._id===c&&(l.querySelector(".card__delete-button").classList.remove("card__delete-button-hidden"),l.querySelector(".card__delete-button").addEventListener("click",n(t._id,a))),l.querySelector(".card__like-button").addEventListener("click",r(t._id,u,i)),l.querySelector(".card__title").textContent=t.name,l.querySelector(".card__like-amount").textContent=t.likes.length,l}var n={},r=document.querySelector(".popup_type_delete_card");function o(e,t){return function(o){n._id=e,o.target.closest(".places__item").classList.add("card_remove_yes-no"),n.card=o.target.closest(".places__item"),t(r)}}function c(e,t,n){return function(r){var o=this,c=r.target.closest(".card__like-group").querySelector(".card__like-amount");r.target.classList.toggle("card__like")?t("/cards/likes/"+e,{},"PUT").then((function(e){c.textContent=e.likes.length,r.target.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log("Ошибка ".concat(e," на элементе ").concat(o.name))})):n("/cards/likes/"+e,{},"DELETE").then((function(e){c.textContent=e.likes.length,r.target.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log("Ошибка ".concat(e," на элементе ").concat(o.name))}))}}function a(e){e.classList.add("popup_is-opened"),e.addEventListener("click",l),e.addEventListener("click",s),document.addEventListener("keydown",i)}function u(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",l),e.removeEventListener("click",s),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function l(e){e.target.classList.contains("popup__close")&&u(e.currentTarget)}function s(e){e.target.classList.contains("popup_is-opened")&&u(e.currentTarget)}var p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},d=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(p.inputErrorClass),r.textContent=n,r.classList.add(p.errorClass)},_=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(p.inputErrorClass),n.classList.remove(p.errorClass),n.textContent=""},f=function(e,t){e.some((function(e){return!e.validity.valid}))?(t.disabled=!0,t.classList.add(p.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(p.inactiveButtonClass))},m=function(e){var t=Array.from(e.querySelectorAll(p.inputSelector)),n=e.querySelector(p.submitButtonSelector);f(t,n),t.forEach((function(r){r.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.typeMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?_(e,t):d(e,t,t.validationMessage)}(e,r),f(t,n)}))}))},y=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){_(e,t)})),r.disabled=!0,r.classList.add(t.inactiveButtonClass)},v={baseUrl:"https://nomoreparties.co/v1/wff-cohort-9",headers:{authorization:"7813a882-8b4e-45b6-82a9-68275120708a","Content-Type":"application/json"}};function S(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function g(e){var t=v.baseUrl+e;return fetch(t,{method:"GET",headers:v.headers}).then((function(e){return S(e)})).catch((function(e){return console.log(e)}))}function h(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST",r=v.baseUrl+e;return fetch(r,{method:n,headers:v.headers,body:JSON.stringify(t)}).then((function(e){return S(e)})).catch((function(e){return console.log(e)}))}function b(e,t,n){return h(e,t,n)}function q(e,t,n){return h(e,t,n)}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var E,L=document.querySelector(".places__list"),k=document.querySelector(".popup_type_edit"),T=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_image"),A=document.querySelector(".popup_type_delete_card"),w=document.querySelector(".profile__edit-button"),P=document.querySelector(".profile__add-button"),j=document.querySelector(".popup_type_edit .popup__content .popup__form"),D=document.querySelector(".popup_type_new-card .popup__content .popup__form"),O=document.forms["control-question"],B=j.querySelector(".popup__input_type_name"),M=j.querySelector(".popup__input_type_description"),H=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),V=x.querySelector(".popup__image"),I=document.querySelector(".popup_type_edit_avatar"),N=document.forms["edit-avatar"],z=N.querySelector(".popup__input_type_url"),G=document.querySelector(".profile__image");function J(e,t){e?(console.log("грузим"),t.textContent="Сохранить..."):(console.log("заружено"),t.textContent="Сохранить")}function R(e){V.src=e.target.src,V.alt=e.target.alt,x.querySelector(".popup__caption").textContent=e.target.alt,a(x)}w.addEventListener("click",(function(){B.value=H.textContent,M.value=U.textContent,y(k.querySelector(p.formSelector),p),a(k)})),P.addEventListener("click",(function(){a(T)})),G.addEventListener("click",(function(){y(I.querySelector(p.formSelector),p),a(I)})),j.addEventListener("submit",(function(e){var t=this;e.preventDefault();var n,r=e.currentTarget.querySelector(".popup__button");J(!0,r),H.textContent=B.value,U.textContent=M.value,("/users/me",n={name:B.value,about:M.value},"PATCH",h("/users/me",n,"PATCH")).then((function(e){H.textContent=e.name,U.textContent=e.about,u(k)})).catch((function(e){return console.log("Ошибка ".concat(e," на элементе ").concat(t.name))})).finally((function(){return J(!1,r)}))})),D.addEventListener("submit",(function(e){var n=this;e.preventDefault();var r,i=e.currentTarget.querySelector(".popup__button");J(!0,i),("/cards",r={link:e.currentTarget.link.value,name:e.currentTarget["place-name"].value},"POST",h("/cards",r,"POST")).then((function(e){L.prepend(t(e,o,c,R,E,a,b,q)),D.reset(),y(T.querySelector(p.formSelector),p),u(T)})).catch((function(e){return console.log("Ошибка ".concat(e," на элементе ").concat(n.name))})).finally((function(){J(!1,i)}))})),O.addEventListener("submit",(function(e){var t,r,o=this;e.preventDefault(),(t="/cards/"+n._id,r={},"DELETE",h(t,r,"DELETE")).then((function(){n.card.remove(),u(A)})).catch((function(e){return console.log("Ошибка ".concat(e," на элементе ").concat(o.name))}))})),N.addEventListener("submit",(function(e){var t=this;e.preventDefault();var n=e.currentTarget.querySelector(".popup__button");J(!0,n);var r,o,c,a={avatar:z.value};(r=a.avatar,(o=new XMLHttpRequest).open("HEAD",r,!1),o.send(),404!=o.status)?(z.value="",("/users/me/avatar",c=a,"PATCH",h("/users/me/avatar",c,"PATCH")).then((function(e){G.style.cssText='background-image: url("'.concat(e.avatar,'")'),u(I)})).catch((function(e){return console.log("Ошибка ".concat(e," на элементе ").concat(t.name))})).finally((function(){J(!1,n)}))):d(N,z,"По указанной ссылке нет картинки")})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){m(e)}))}(p),Promise.all([("/users/me",g("/users/me")),g("/cards")]).then((function(e){var n,r,u,i=(u=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(r,u)||function(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}(r,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=i[0],s=i[1];n=l,H.textContent=n.name,U.textContent=n.about,G.style.cssText='background-image: url("'.concat(n.avatar,'")'),E=n._id,function(e){e.forEach((function(e){L.append(t(e,o,c,R,E,a,b,q))}))}(s)})).catch((function(e){return console.log(e)}))})();