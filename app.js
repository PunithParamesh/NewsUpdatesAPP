const key="9afbcfa0b5a74f35bdbec7199cda649e"
const url="https://newsapi.org/v2/everything?q="

window.addEventListener("load",()=>fetchNews("india"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${key}`);
    const data=await res.json();
   bindData(data.articles)
}

function bindData(articles){
    const cardContainer=document.getElementById('card-container')
    const templateCard=document.getElementById('template-card')
  
    cardContainer.innerHTML="";

   
    articles.forEach((article)=>{
        if(!article.urlToImage)return

        const cardClone=templateCard.content.cloneNode(true)
        fillDataCard(cardClone,article);
        cardContainer.appendChild(cardClone)
    })
}

function fillDataCard(cardClone,article){
    const img=cardClone.querySelector("#news-image")
    const title=cardClone.querySelector("#news-title")
    const source=cardClone.querySelector("#news-source")
    const description=cardClone.querySelector("#news-dec")

    img.src = article.urlToImage;
    title.innerHTML=article.title
    description.innerHTML=article.description
   
   const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
   })
    source.innerHTML=`${article.source.name} - ${date}`

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'blank')
    })
};

let curSelectedNav=null
function onNavClick(id){
    fetchNews(id);
    const item=document.getElementById(id)
    curSelectedNav?.classList.remove('active')

    curSelectedNav=item
    curSelectedNav.classList.add('active')
}

const serach=document.getElementById('input-search')
const button=document.getElementById('search-button')

button.addEventListener('click',()=>{
    const query=serach.value;

    if(!query)return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null
    

})

function relode(){
    document.location.reload();
}