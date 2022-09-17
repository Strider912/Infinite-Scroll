
const imageContainer = document.querySelector('.image-container')
const loader = document.querySelector('.loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0


const imageLoaded = () => {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

function setAttribute(ele, attributes) {
    for (const key in attributes) {
        ele.setAttribute(key, attributes[key])
    }
}

let photoArray = []

const count = 10
const apikey = ''
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photoArray.length
    photoArray.forEach((photo) => {
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        setAttribute(item, { href: photo.links.html, target: '_blank' })
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttribute(img, { src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description })
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        displayPhotos()
    } catch (error) {
        console.log('error in fetching', error);
    }
}

getPhotos()
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }

})