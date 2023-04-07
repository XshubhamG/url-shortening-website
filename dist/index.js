"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const toggleMenu = document.querySelectorAll('.menu__btn');
const navbar = document.querySelector('.navbar');
const inputLink = document.getElementById('link');
const shortenBtn = document.getElementById('shortenBtn');
const shortLinkContainer = document.querySelector('.shorten__link__container');
toggleMenu.forEach(item => {
    item.addEventListener('click', () => {
        for (let i = 0; i < 2; i++) {
            toggleMenu[i].classList.toggle('inactive');
        }
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.toggle('inactive');
    });
});
shortenBtn === null || shortenBtn === void 0 ? void 0 : shortenBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (inputLink.value !== '') {
            let response = yield fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`, { method: 'POST' });
            let data = yield response.json();
            createLinkContainer(data);
            inputLink.value = '';
        }
        else {
            inputLink.classList.add('empty');
        }
    }
    catch (error) {
        console.log(error);
    }
}));
function createLinkContainer(link) {
    const linkContainer = document.createElement('div');
    linkContainer.classList.add('short__link');
    const fullLink = document.createElement('p');
    fullLink.innerText = inputLink.value;
    linkContainer.append(fullLink);
    const shortenLink = document.createElement('p');
    shortenLink.innerText = link.result.short_link;
    shortenLink.style.color = 'hsl(180, 66%, 49%)';
    linkContainer.append(shortenLink);
    const copyBtn = document.createElement('button');
    copyBtn.innerText = 'Copy';
    copyBtn.classList.add('primary__btn');
    linkContainer.append(copyBtn);
    shortLinkContainer === null || shortLinkContainer === void 0 ? void 0 : shortLinkContainer.append(linkContainer);
    shortLinkContainer === null || shortLinkContainer === void 0 ? void 0 : shortLinkContainer.classList.add('addMargin');
    copyBtn.addEventListener('click', () => {
        copy(shortenLink);
        copyBtn.textContent = 'copied';
        copyBtn.style.backgroundColor = 'hsl(255, 11%, 22%)';
    });
}
function copy(value) {
    value.textContent ? navigator.clipboard.writeText(value.textContent) : null;
    value.style.color = 'black';
}
//# sourceMappingURL=index.js.map