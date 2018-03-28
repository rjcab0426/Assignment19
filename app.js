const apiKey ='4d739585306a4f20889256ac81538cec';

const main = document.querySelector('main');

window.addEventListener('load', e => {
    // register the Service Worker
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceworker.js')
            .then( reg => console.log('Rgistration of Service Worker successful'))
            .catch( err => console.log('Reg failed...'))
    }

    updateNews();
})

async function updateNews() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`); // My API KEY = 4d739585306a4f20889256ac81538cec
    const json = await res.json();  

    console.log(json.createArticles);

    main.innerHTML = json.articles.map(article => createArticle(article));
}

function createArticle(article)  {
    return `
        <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="${article.title}">
            <p>${article.description}</p>
        </a>
        </div>
    `;
}