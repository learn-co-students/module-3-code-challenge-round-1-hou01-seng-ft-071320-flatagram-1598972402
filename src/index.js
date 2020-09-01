// write your code here
document.addEventListener("DOMContentLoaded", () => {
    getImage()
    enableLikes()
    enablePostComment()
})

const imgTitle = document.querySelector("body > div > div > h2")
const imgSpot = document.querySelector("body > div > div > img")
const imgLikes = document.querySelector("body > div > div > div > span")
const imgCommentsUl = document.querySelector("body > div > div > ul")
const likeButton = document.querySelector("body > div > div > div > button")
const commentForm = document.querySelector("body > div > div > form")

const getImage = () => {
    fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    // .then(console.log)
    .then((image) => {
        showImg(image)
    })
}

const showImg = (singleImage) => {
    imgTitle.innerText = singleImage.title
    imgSpot.src = singleImage.image
    imgLikes.innerText = `${singleImage.likes} likes`
    showComments(singleImage.comments)
    // while (imgCommentsUl.firstChild) imgCommentsUl.removeChild(imgCommentsUl.firstChild)
    // singleImage.comments.forEach((comment) => {
    //     const imageLi = document.createElement('li')
    //     imageLi.innerText = comment.content

    //     imgCommentsUl.append(imageLi)
    // });
}

const showComments = (commentsArray) => {
    while (imgCommentsUl.firstChild) imgCommentsUl.removeChild(imgCommentsUl.firstChild)
    commentsArray.forEach((comment) => {
        const imageLi = document.createElement('li')
        imageLi.innerText = comment.content

        imgCommentsUl.append(imageLi)
    });
}

const enableLikes = () => {
    likeButton.addEventListener('click', (e) => {
        e.preventDefault()
        getLikes()
    })
}

const getLikes = () => {
    fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    // .then(console.log)
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
    // .then(console.log)
    .then((image) => {
        refreshImg(image)
    })
}


const enablePostComment = () => {
    const commentField = document.querySelector("body > div > div > form > input")
    console.log(commentForm)

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let comment = commentField.value
        postComment(comment)
        e.target.reset()

    })
}

const postComment = (commentToBePosted) => {

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
    // .then(console.log)
    .then((comment) => {
        addComment(comment)
    })

}

const addComment = (newestComment) => {
        const imageLi = document.createElement('li')
        imageLi.innerText = newestComment.content

        imgCommentsUl.append(imageLi)
}


// const getComments = () => {
//     fetch('http://localhost:3000/comments')
//     .then(res => res.json())
//     .then(console.log)
//     // .then((comments) => {
//     // })
// }

const refreshImg = (singleImage) => {
    imgTitle.innerText = singleImage.title
    imgSpot.src = singleImage.image
    imgLikes.innerText = `${singleImage.likes} likes`
}