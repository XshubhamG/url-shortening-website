const toggleMenu = document.querySelectorAll('.menu__btn');
const navbar = document.querySelector('.navbar');
const inputLink = document.getElementById('link') as HTMLInputElement;
const shortenBtn = document.getElementById('shortenBtn');
const shortLinkContainer = document.querySelector('.shorten__link__container');


// Menu Toggle Event
toggleMenu.forEach(item => {
    item.addEventListener('click', () => {

        for (let i: number = 0; i < 2; i++) {
            toggleMenu[i].classList.toggle('inactive');
        }

        navbar?.classList.toggle('inactive');

    })
})

// Fetch api using eventlistener on shortenBtn

shortenBtn?.addEventListener('click', async () => {

    try {
        if (inputLink.value !== '') {

            let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`, { method: 'POST' });

            let data = await response.json();
            createLinkContainer(data);
            inputLink.value = '';

        } else {
            inputLink.classList.add('empty');
        }

    } catch (error) {
        console.log(error);
    }


})


// function to create list-container

function createLinkContainer(link : any) {
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

        shortLinkContainer?.append(linkContainer);
        shortLinkContainer?.classList.add('addMargin');


        copyBtn.addEventListener('click', () => {
            copy(shortenLink)
            copyBtn.textContent = 'copied';
            copyBtn.style.backgroundColor = 'hsl(255, 11%, 22%)';
        });
} 


function copy(value : HTMLParagraphElement) {
    value.textContent?navigator.clipboard.writeText(value.textContent) : null;
    value.style.color = 'black';
}


