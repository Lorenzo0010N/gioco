const BackgroundImage = document.querySelector(".background-image");
const startButton = document.querySelector("#start");
const loadingAnimatedText = document.querySelector(".loading-text");
const LoadingContainer = document.querySelector(".loading-screen");
const MenuContainer = document.querySelector(".menu-container");

let speed = 100;

function load() {
    const loadingInterval = setInterval(() => {
        if (loadingTimer < 4000) {
            if (loadingTextState === 0) {
                loadingAnimatedText.innerText = "Caricamento in corso.";
                loadingTextState = 1;
            } else if (loadingTextState === 1) {
                loadingAnimatedText.innerText = "Caricamento in corso..";
                loadingTextState = 2;
            } else {
                loadingAnimatedText.innerText = "Caricamento in corso...";
                loadingTextState = 0;
            }
            loadingTimer += 500;
        } else {
            clearInterval(loadingInterval);
            loadingAnimatedText.innerText = "";
            console.log("Caricamento completato.");
            LoadingContainer.style.animation = "opacity-game-start 2.5s ease-out";
            setTimeout(() => {
                LoadingContainer.style.display = "none";
            }, 2500);
        }
    }, 500);
}

LoadingContainer.style.display = "flex";
load()

fetch('data/image.json')
    .then(response => response.json())
    .then(data => {
        const BackgroundImageLink = data.background;
        console.log("Background Image: ", BackgroundImageLink);

        // Crea 100 immagini
        for (let i = 0; i < 100; i++) {
            let Image = document.createElement("img");

            function ImageStyle() {
                Image.src = `image/${BackgroundImageLink}`;
                Image.style.top = "0";
                Image.style.left = "0";
                Image.style.width = "100vw";
                Image.style.height = "100vh";
                Image.style.zIndex = "-1";
                Image.style.margin = "0";
            }

            ImageStyle();
            BackgroundImage.appendChild(Image);
            console.log("background: ", BackgroundImageLink);
        }

        setInterval(() => {
            BackgroundImage.style.marginLeft = `-${speed}px`;
            speed += 50;
            console.log("Speed: ", speed);
        }, 50);
    })
    .catch(error => {
        console.error('JSON Error:', error);
    });

startButton.addEventListener("click", () => {
    speed = 100;
    BackgroundImage.style.marginLeft = "-100px";
    MenuContainer.style.display = "none";

    LoadingContainer.style.animation = "opacity-game-b-start 0.5s ease-in";
    LoadingContainer.style.display = "flex";
    load()

    window.scrollTo(0, 0);

    console.log("Posizione reset a 0 per marginLeft e scroll alla posizione iniziale.");
});

// Aggiornamento ciclico del testo "loading" con una durata di 1000 ms
let loadingTextState = 0;
let loadingTimer = 0;

// creazione "quadrati" ostacoli
const obstacles = document.querySelector(".obstacles");

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = "100vw";
    obstacle.style.top = `${Math.floor(Math.random() * 100)}vh`;
    obstacles.appendChild(obstacle);

    setInterval(() => {
        const obstacleLeft = parseInt(obstacle.style.left);
        if (obstacleLeft < -100) {
            obstacle.remove();
        } else {
            obstacle.style.left = `${obstacleLeft - 2}px`;
        }
    }, 20);
}

setInterval(createObstacle, 2000);

// Funzione per il movimento del personaggio
const character = document.querySelector(".character");

function moveCharacter() {
    let left = parseInt(character.style.left);
    if (left > 0) {
        character.style.left = `${left - 5}px`;
    }
}