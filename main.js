var users = []

var user

var posts = []
var todos = []
var comments = []
var albums =[]

function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(data => data.json())
        .then(jsonUsers => {
            users = jsonUsers
            mapUsersToList()
        })
}

function getPosts() {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then(data => data.json())
        .then(jsonPosts => {
            posts = jsonPosts
            mapPostsToCards()
        })
}

function getAlbums() {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
        .then(data => data.json())
        .then(jsonAlbums => {
            albums = jsonAlbums
            mapAlbumsToList()
        })
}

function getTodos() {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`)
        .then(data => data.json())
        .then(jsonTodos => {
            todos = jsonTodos
            mapTodosToList()
        })
}

function getComments(id, index) {
    document.getElementById(`spinner${index}`).classList.remove("d-none")

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(data => data.json())
        .then(jsonComments => {
            comments = jsonComments
            mapCommentsToList(index)
        })
}

function mapUsersToList() {
    var listString = ""

    for (let i = 0; i < users.length; i++) {
        listString +=
            `
                <button id="b${i}" class="list-group-item list-group-item-action" onclick="showCards(${i})">${users[i].name}</button>
            `
    }
    document.getElementById("usersList").innerHTML = listString
}

function showCards(index) {
    document.getElementById(`b${index}`).classList.add("active")

    user = users[index]

    getPosts()
    getTodos()
    getAlbums()

    for (let i = 0; i < users.length; i++)
        if (i !== index)
            document.getElementById(`b${i}`).classList.remove("active")

    mapUserToCard(user)
}

function mapUserToCard() {
    var cardString =
        `
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${user.email}</h6>
            <hr />
            <div class="d-flex justify-content-start align-items-center mb-1">
                <i class="bi bi-geo-alt"></i>
                <p class="card-text ms-2">${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode} </p>
            </div>
            <div class="d-flex justify-content-start align-items-center mb-1">
                <i class="bi bi-telephone"></i>
                <p class="card-text ms-2">${user.phone}</p>
            </div>
            <div class="d-flex justify-content-start align-items-center mb-1">
                <i class="bi bi-building"></i>
                <p class="card-text ms-2">${user.company.name}</p>
            </div>
            <div class="d-flex justify-content-start align-items-center">
                <i class="bi bi-browser-safari"></i>
                <p class="card-text ms-2">${user.website}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("cardDiv").innerHTML = cardString
}

function mapPostsToCards() {
    var cardsString = ""

    for (let i = 0; i < posts.length; i++) {
        cardsString +=
            `
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">${posts[i].title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${posts[i].body}</h6>
                    <button class="btn btn-primary btn-sm mt-3" onclick="getComments(${posts[i].id}, ${i})">view comments</button>
                    <div id="spinner${i}" class="mt-2 d-none">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>                 
                    <ul class="list-group" id="commentsUl${i}"></ul>
                </div>
            </div>
            `
        document.getElementById("postsDiv").innerHTML = cardsString
    }

}

function mapTodosToList() {
    var listString =
        `<ul class="list-group">`
    for (let i = 0; i < todos.length; i++) {
        listString +=
            `            
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="">${todos[i].title}</span>
                <span class="">
                    ${(todos[i].completed) ? '<i class="bi bi-check2-circle text-success"></i>' : '<i class="bi bi-hourglass-split text-danger"></i>'}
                </span>
            </li>

            `
    }
    listString += `</ul>`
    document.getElementById("todosDiv").innerHTML = listString

}

function mapCommentsToList(index) {
    var commentsList = ""

    for (let i = 0; i < comments.length; i++) {
        commentsList +=
            `<li class="list-group-item">${comments[i].email}: ${comments[i].body}</li>`
    }
    document.getElementById(`commentsUl${index}`).innerHTML = commentsList
    document.getElementById(`commentsUl${index}`).classList.add("mt-2")
    document.getElementById(`spinner${index}`).classList.add("d-none")
}


function mapAlbumsToList(){
    var listString =
        `
        <ul class="list-group">
        `
    for (let i = 0; i < albums.length; i++) {
        listString += `<li class= "list-group-item d-flex justify-content-between align-items-center">
                        ${albums[i].title}
                        </li>`
        
    }
    listString += "</ul>"
    document.getElementById("albumsDiv").innerHTML = listString
}

getUsers()