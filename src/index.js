// write your code here
document.addEventListener("DOMContentLoaded", () => {
    getImage()
    enableLikes()
    enablePostComment()
    enableUnlikes()
})

const imgTitle = document.querySelector("body > div > div > h2")
const imgSpot = document.querySelector("body > div > div > img")
const imgLikes = document.querySelector("body > div > div > div > span")
const imgCommentsUl = document.querySelector("body > div > div > ul")
const likeButton = document.querySelector("body > div > div > div > button")
const commentForm = document.querySelector("body > div > div > form")
const likeSection = document.querySelector("body > div > div > div")

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
            deleteComment(commentId)
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
        refreshImg(image)
    })
}

const refreshImg = (singleImage) => {
    imgTitle.innerText = singleImage.title
    imgSpot.src = singleImage.image
    imgLikes.innerText = `${singleImage.likes} likes`
}

const enablePostComment = () => {
    const commentField = document.querySelector("body > div > div > form > input")

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
        deleteComment(commentId)
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
        refreshImg(image)
    })
}

const deleteComment = (id) => {

    fetch(`http://localhost:3000/comments/${id}`, {
        method: 'delete'
    })
    .then(res => res.json())
    .then(getImage())
}