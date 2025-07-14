window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
    try {
        const res = await fetch(`/api/news?query=${query}`);
        console.log("Fetching news for query:", query);
        const data = await res.json();

        console.log("Fetched news data:", data);
        bindData(data);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    if (!Array.isArray(articles)) {
        console.error("bindData received invalid articles:", articles);
        document.getElementById("card-container").innerHTML = "<p>Error loading news.</p>";
        return;
    }

    const cardContainer = document.getElementById("card-container");
    const templateCard = document.getElementById("template-card");
    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image || !article.title || !article.description) return;
        const cardClone = templateCard.content.cloneNode(true);
        fillDataCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}


function fillDataCard(cardClone, article) {
    const img = cardClone.querySelector("#news-image");
    const title = cardClone.querySelector("#news-title");
    const source = cardClone.querySelector("#news-source");
    const description = cardClone.querySelector("#news-dec");

    img.src = article.image; 
    title.innerHTML = article.title;
    description.innerHTML = article.description;

    const date = new Date(article.published_at).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    source.innerHTML = `${article.source} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "blank");
    });
}


let curSelectedNav = null;
function onNavClick(id) {
    fetchNews(id);
    const item = document.getElementById(id);
    curSelectedNav?.classList.remove("active");

    curSelectedNav = item;
    curSelectedNav.classList.add("active");
}

const search = document.getElementById("input-search");
const button = document.getElementById("search-button");

button.addEventListener("click", () => {
    const query = search.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function relode() {
    document.location.reload();
}
