const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const imgArray = [
    'pic2.jpeg',
    'pic3.jpeg',
    'pic4.jpeg',
    'pic5.jpeg',
    'pic6.jpeg'
]

/* Declaring the alternative text for each image file */

const altText = {
    'pic2.jpeg': 'Alternative View of Sandwash Basin from above',
    'pic3.jpeg': 'Picture of the northern lights as they appeared in eastern Colorado',
    'pic4.jpeg': 'Picture of a unique colorful sunset in Johnstown, Colorado',
    'pic5.jpeg': 'View from the base of a flatiron rock formation in Boulder, Colorado',
    'pic6.jpeg': 'View of the front range of the Rocky Mountains from Johnstown, Colorado',
}

/* Looping through images */

for (let i = 0; i < imgArray.length; i++)
{
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${imgArray[i]}`);
    newImage.setAttribute('alt', altText[imgArray[i]]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click',updateInfo);

}

function updateInfo() {
    const clickedImg = event.target;
    displayedImage.src = clickedImg.src;
    displayedImage.alt = clickedImg.alt;
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', updateTheme);

function updateTheme() {
    currentTheme = btn.getAttribute("class");

    if (currentTheme == "dark")
    {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    }
    else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
}