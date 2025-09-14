const button = document.querySelector('#getposts')
const output = document.querySelector('#output')
const form = document.querySelector('#submit')



async function showPosts() {
    // e.preventDafault();

    try {
        const res = await fetch ( 'http://localhost:8000/api/posts' )
        console.log(res.ok)

        if(!res.ok) {
            throw new Error ('Error fetching posts')
        }
        const posts = await res.json()
        console.log(`Fetched posts`, posts)
        output.innerHTML = ""

        posts.forEach((post) => {
            const postEl = document.createElement('div')
            postEl.textContent = post.title
            output.appendChild(postEl)
        });

        
    } catch (error) {
        console.log(`Error fetching posts`, error)
    }
    
}

async function addPost(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title')
    console.log(`Submitting`, title)

    try {
        const res = await fetch ( 'http://localhost:8000/api/posts', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })

        if(!res.ok) {
            throw new Error ( 'Failed to add post')
        }

        const newPost = await res.json()

        const postEl = document.createElement('div')
        postEl.textContent = newPost.title
        output.appendChild(postEl)
        showPosts()

    } catch(error) {
        console.log(`Error adding post`)
    }
}

//Event listeners
button.addEventListener('click', showPosts)
form.addEventListener('submit', addPost)