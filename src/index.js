// write your code here
document.addEventListener("DOMContentLoaded", () => {
    //console.log('es')
    getData()
})

//load image
//load title
//load likes
//load comments

//click on heart to add likes

//add comments

//load data
const getData = () => {
    fetch('http://localhost:3000/images')
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        postData(data[0])
    })
}
//post data
const postData = (data) =>{
    const imageCard = document.querySelector(".image-card")
    //post title
    addTitle(data)
    //post picture
    addImage(data)
    //post likes
    addLikes(data)
    //post comments
    getComments()
    //add like response
    increaseLikes(data)
    //downvote
    downVoteButton()
    //decrease likes from downvoting
    decreaseLikes(data)
}

const addTitle = (data) => {
    const titleItem = document.querySelector(".title")
    titleItem.innerText = data.title
}

const addImage = (data) => {
    const imageItem = document.querySelector(".image")
    imageItem.src = data.image
}

const addLikes = (data) => {
    const likeItem = document.querySelector(".likes")
    likeItem.innerText = `${data.likes} likes`
}

//get comments

const getComments = (comments) => {
    fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(comments => {
        document.querySelector('.comments').innerHTML = ""
        comments.forEach(comment => {
            addComment(comment)
        })
        createComment(comments)
    })
}

//add comment

const addComment = (comment) => {
    const commentList = document.querySelector('.comments')
    const commentItem = document.createElement('li')
    commentItem.innerText = comment.content
    commentList.appendChild(commentItem)
    deleteButton(commentItem, comment)
}

const deleteButton = (commentItem, comment) => {
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'delete'
    commentItem.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', (e) =>{
        deleteFromDb(comment.id)
        e.target.parentElement.remove()
    })
}

const increaseLikes = (data) => {
    heartBtn = document.querySelector('.like-button')
    let likes = data.likes
    heartBtn.addEventListener('click', () => {
        likes += 1
        addLiketoDb(likes)
        getData()
    })
}

const addLiketoDb = (likes) => {
    let patchData = {
        likes: likes
    }
    fetch(('http://localhost:3000/images/1'), {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(patchData)
        }
    )
    .then(res => res.json())
}

const createComment = (comments) => {
    postBtn = document.querySelector('.comment-button')
    postBtn.addEventListener('click', (e) =>{
        let inputText = document.querySelector('.comment-input').value
        // addComment(inputText)
        addCommentToDb(inputText)
        inputText = ""
        getData()
    })
}

const addCommentToDb = (inputText) => {
    let commentInputData = {
        imageId: 1,
        content: inputText
    }
    fetch(('http://localhost:3000/comments'), {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(commentInputData)
        }
    )
    .then(res => res.json())
}

const deleteFromDb = (id) => {
    fetch((`http://localhost:3000/comments/${id}`), {
        method: 'DELETE'
        }
    )
    .then(res => res.json())
}

const downVoteButton = () => {
    heartBtn = document.querySelector('.likes')
    downVoteBtn = document.createElement('button')
    downVoteBtn.classList.add("downvote")
    downVoteBtn.innerText = "downvote"
    heartBtn.appendChild(downVoteBtn)
}

const decreaseLikes = (data) => {
    downvoteBtn = document.querySelector('.downvote')
    let likes = data.likes
    downvoteBtn.addEventListener('click', () => {
        likes -= 1
        addLiketoDb(likes)
        getData()
    })
}
