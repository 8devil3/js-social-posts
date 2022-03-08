const posts = [
    {
        id: 1,
        content:
            "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=171",
        author: {
            name: "Phil Mangione",
            image: "https://unsplash.it/300/300?image=15",
        },
        likes: 80,
        created: "2021-25-06",
    },
    {
        id: 2,
        content:
            "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=112",
        author: {
            name: "Sofia Perlari",
            image: "https://unsplash.it/300/300?image=10",
        },
        likes: 120,
        created: "2021-03-09",
    },
    {
        id: 3,
        content:
            "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=234",
        author: {
            name: "Chiara Passaro",
            image: "https://unsplash.it/300/300?image=20",
        },
        likes: 78,
        created: "2021-15-05",
    },
    {
        id: 4,
        content:
            "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=24",
        author: {
            name: "Luca Formicola",
            image: null,
        },
        likes: 56,
        created: "2021-03-04",
    },
    {
        id: 5,
        content:
            "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=534",
        author: {
            name: "Alessandro Sainato",
            image: "https://unsplash.it/300/300?image=29",
        },
        likes: 95,
        created: "2021-05-05",
    },
];

const postList = document.querySelector("#container");
const arrLikes = [];




//stampo i post
for (let i = 0; i < posts.length; i++) {
    printPost(posts[i], i);
}



//stampa post
function printPost(postContent, index) {

    //correggo la data
    let oldDate = postContent.created;
    let newDate = oldDate.slice(5, 7) + "/" + oldDate.slice(-2) + "/" + oldDate.slice(0, 4);

    
    //stampo il post
    let post = document.createElement("div");
    post.classList.add("post");
    post.innerHTML = `
        <div class="post__header">
            <div class="post-meta">                    
            ${avatar(index)}
                <div class="post-meta__data">
                    <div class="post-meta__author">${postContent.author.name}</div>
                    <div class="post-meta__time">${newDate}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${postContent.content}</div>
        <div class="post__image">
            <img src="${postContent.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="1">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">${postContent.likes}</b> persone
                </div>
            </div> 
        </div> `;

    postList.appendChild(post);
    const btnLike = document.querySelectorAll(".like-button");
    btnLike[index].addEventListener("click", addRemoveLikes);
}





//aggiunta e rimozione like
function addRemoveLikes(event) {

    //rimuovo il comportamento "to top" della pagina quando si clicca un link vuoto
    event.preventDefault();

    //cerco l'indice del post
    const indexPost = [...postList.children].indexOf(
        this.parentNode.parentNode.parentNode.parentNode
    );

    //selezioni il contatore HTML
    const addLike = this.parentNode.parentNode.querySelector("#like-counter-1");

    //destrutturo le classi del pulsante
    const likeClasses = [...this.classList];

    //cerco la classe --liked ed eventualmente incremento il contatore
    if (!likeClasses.includes("like-button--liked")) {

        //incremento il contatore HTML
        addLike.innerText = ++posts[indexPost].likes;

        //controllo che l'array dei like sia vuoto e in tal caso inserisco l'oggetto {id, like}
        if (arrLikes.length == 0) {

            //aggiungo il like all'array dedicato
            arrLikes.push({
                id: posts[indexPost].id,
                like: posts[indexPost].likes,
            });
        } else {
            
            //se l'array ha già dei valori allora li sovrascrivo
            for (let i = 0; i < arrLikes.length; i++) {
                if (arrLikes[i].id == posts[indexPost].id) {
                    arrLikes[i].like = posts[indexPost].likes;
                }
            }
        }
    } else { 

        //decremento il contatore HTML
        addLike.innerText = --posts[indexPost].likes;

        //il decremento deve avvenire nell'oggetto con lo stesso id
        for (let x = 0; x < arrLikes.length; x++) {
            if (arrLikes[x].id == posts[indexPost].id) {
                arrLikes[x].like = posts[indexPost].likes;
            }
        }
    }

    //switch classe del pulsante like
    this.classList.toggle("like-button--liked");

    console.table(arrLikes);
}





//gestione avatar
function avatar(index){

    //ricavo il nome dell'autore
    let authorName = posts[index].author.name;

    //estraggo le iniziali
    let authorInit = authorName.slice(0, 1) + authorName.slice(authorName.indexOf(' ') + 1, authorName.indexOf(' ') + 2);

    //compongo l'avatar
    let authorImg;
    if (posts[index].author.image == null) {
        return authorImg = `
            <div class="post-meta__icon profile-pic-default">
                <span>${authorInit}</span>
            </div>`;
    } else {
        return authorImg = `
            <div class="post-meta__icon">
                <img class="profile-pic" src="${posts[index].author.image}" alt="${authorName}">                    
            </div>`;     
    }
}