// write your code here
document.addEventListener("DOMContentLoaded",()=>{
    getImage()
})
const getImage=()=>{
    fetch('http://localhost:3000/images/1')
    .then (res=>res.json())
    .then (data=>{loadImage(data)})
}
const loadImage=(data)=>{
    console.log({data})
    titleCont=document.querySelector('.title')
    titleCont.innerText=data.title
    imgCont=document.querySelector('.image')
    imgCont.src=data.image
    commentCont=document.querySelector('.comments')
    commentBox=document.querySelector('.comment-input')
    commentBtn=document.querySelector('.comment-button')
    data.comments.forEach(comment => {  
            addComment(comment)
        })
    likes=document.querySelector('.likes')
    likeBtn=document.querySelector('.like-button')

    let cnt=data.likes

    likes.innerText = cnt + ' likes'

    likeBtn.addEventListener('click',()=>{
        cnt = cnt + 1
        console.log({cnt})
        likes.innerHTML=cnt + ' likes'
        addLikes(cnt)
    })
    const addLikes=(count)=>{
        const newLike={
            // imageId: 1,
            likes: count,
        }
        console.log({newLike})
        fetch('http://localhost:3000/images/1',
        {method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLike)
        })
        .then(res=>res.json())
    }

    commentBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        const inputVal=commentBox.value
        console.log({inputVal})
        createComment(inputVal)
        e.target.reset()
    })
}

const addComment=(comment)=>{
        li=document.createElement('li')
        li.innerText=comment.content
        li.dataset.commentID=comment.id
        commentCont.appendChild(li)
}

const createComment=(inputVal)=>{
    console.log(inputVal)
    const newCom={
        imageId: 1,
        content: inputVal
    }
    console.log({newCom})
    fetch('http://localhost:3000/comments',
        {method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCom)
        })
        .then(res=>res.json())
        .then(comment=> {
            console.log({comment})
            addComment(comment)
        })   
}
