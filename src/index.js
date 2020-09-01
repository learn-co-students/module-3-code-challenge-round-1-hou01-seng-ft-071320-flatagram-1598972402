// write your code here
document.addEventListener("DOMContentLoaded", () => {
    getImage()
    enableLikes()
    enablePostComment()
    enableUnlikes()
})

const imgTitle = document.querySelector(".title")
const imgSpot = document.querySelector(".image")
const imgLikes = document.querySelector(".likes")
const imgCommentsUl = document.querySelector(".comments")
const likeButton = document.querySelector(".like-button")
const commentForm = document.querySelector(".comment-form")
const likeSection = document.querySelector(".likes-section")

const getImage = () => {
    fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    .then((image) => {
        showImg(image)
    })
}

const showImg = (singleImage) => {
    imgTitle.innerText = singleImage.title
    imgSpot.src = singleImage.image
    imgLikes.innerText = `${singleImage.likes} likes`
    showComments(singleImage.comments)
}

const showComments = (commentsArray) => {
    while (imgCommentsUl.firstChild) imgCommentsUl.removeChild(imgCommentsUl.firstChild)
    commentsArray.forEach((comment) => {
        const imageLi = document.createElement('li')
        imageLi.innerText = comment.content
        imageLi.dataset.commentId = comment.id

        imageLi.addEventListener('click', (e) => {
            e.preventDefault()
            let commentId= e.target.dataset.commentId
            let target = e.target
            deleteComment(commentId, target)
        })

        imgCommentsUl.append(imageLi)
    });
}

const enableLikes = () => {
    likeButton.innerHTML = '❤️'
    likeButton.addEventListener('click', (e) => {
        e.preventDefault()
        getLikes()
    })
}

const getLikes = () => {
    fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    .then((image) => {
        addLikes(image.likes)
    })
}

const addLikes = (number) => {

    let likeNumber = {
        likes: number + 1
    }

    fetch('http://localhost:3000/images/1', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(likeNumber)
    })
    .then(res => res.json())
    .then((image) => {
        refreshLikes(image)
    })
}

const refreshLikes = (singleImage) => {
    imgLikes.innerText = `${singleImage.likes} likes`
}

const enablePostComment = () => {
    const commentField = document.querySelector(".comment-input")

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let comment = commentField.value
        createComment(comment)
        e.target.reset()
    })
}

const createComment = (commentToBePosted) => {

    let newComment = {
        "imageId": 1,
        "content": commentToBePosted
    }

    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newComment)
    })
    .then(res => res.json())
    .then((comment) => {
        addComment(comment)
    })
}

const addComment = (newestComment) => {
    const imageLi = document.createElement('li')
    imageLi.innerText = newestComment.content
    imageLi.dataset.commentId = newestComment.id

    imageLi.addEventListener('click', (e) => {
        e.preventDefault()
        let commentId= e.target.dataset.commentId
        let target = e.target
        deleteComment(commentId, target)
    })
    imgCommentsUl.append(imageLi)
}

const enableUnlikes = () => {
    const unlikeButton = document.createElement('button')
    unlikeButton.className = "unlike-button"
    unlikeButton.innerHTML =  '💔'
    unlikeButton.addEventListener('click', (e) => {
        e.preventDefault()
        negativeGetLikes()
    })

    likeSection.append(unlikeButton)
}

const negativeGetLikes = () => {
    fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    .then((image) => {
        subtractLikes(image.likes)
    })
}

const subtractLikes = (number) => {

    let likeNumber = {
        likes: number - 1
    }

    fetch('http://localhost:3000/images/1', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(likeNumber)
    })
    .then(res => res.json())
    .then((image) => {
        refreshLikes(image)
    })
}

const deleteComment = (id, target) => {

    fetch(`http://localhost:3000/comments/${id}`, {
        method: 'delete'
    })
    .then(res => res.json())
    .then(target.remove())
}