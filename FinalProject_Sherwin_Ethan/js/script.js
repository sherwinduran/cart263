const questions = [
    {
        question: "Guess The Video Game Logo",
        options: ["Dead by Daylight", "Until Dawn", "Identity V", "Vampire: The Masquerade - Bloodhunt"],
        correct: 0,
        image: "assets/images/DBD.png"
        // https://www.pngkey.com/maxpic/u2q8i1o0o0t4y3y3/
    },
    {
        question: "Guess The Video Game Logo",
        options: ["Street Fighter V", "Injustice", "Mortal Kombat", "Tekken"],
        correct: 2,
        image: "assets/images/MK.png"
        // https://logos-world.net/mortal-kombat-logo/
    },
    {
        question: "Guess The Video Game Logo",
        options: ["Marvel Rivals", "Overwatch", "Paladins", "Apex Legends"],
        correct: 1,
        image: "assets/images/Overwatch.png"
        // https://www.citypng.com/photo/3637/round-overwatch-logo-symbol
    },
    {
        question: "Guess The Video Game Logo",
        options: ["Yakuza", "Half Life 1", "Call of Duty", "Singularity"],
        correct: 1,
        image: "assets/images/HL.png"
        // https://1000logos.net/half-life-logo/
    },
    {
        question: "Guess The Video Game Logo",
        options: ["Valkyria Chronicles", "Persona 5", "Identity V", "A Hat in Time"],
        correct: 1,
        image: "assets/images/P5.png"
        // https://1000logos.net/phantom-thieves-of-hearts-logo/
    },
    {
        question: "Guess The Video Game Logo",
        options: ["Team Fortress", "Doom", "Quake", "Wolfenstein 3D"],
        correct: 2,
        image: "assets/images/Quake.png"
        // https://commons.wikimedia.org/wiki/File:Quake_logo.svg
    },
    {
        question: "Guess The Video Game Logo",
        options: ["Portal 1", "Skyrim", "Elden Ring", "Persona 5"],
        correct: 1,
        image: "assets/images/Skyrim.png"
        // https://logowik.com/skyrim-vector-logo-8361.html
    }, 
    {
        question: "Guess The Video Game Logo",
        options: ["The Legend of Zelda", "Starfield", "Rust", "Fallout 4"],
        correct: 2,
        image: "assets/images/Rust.jpg"
        // https://www.playrust.nl/news/welcome-new-website/attachment/rust-logo/
    },
    {
        question: "Guess The Video Game Logo",
        options: ["Valorant", "League of Legends", "Fortnite", "Dota 2"],
        correct: 0,
        image: "assets/images/Valorant.png"
        // https://commons.wikimedia.org/wiki/File:Valorant_logo_-_pink_color_version_(cropped).png
    }, 
    {
        question: "Guess The Video Game Logo",
        options: ["Genshin Impact", "Assassin's Creed", "The Witcher 3: Wild Hunt", "Far Cry"],
        correct: 1,
        image: "assets/images/AsC.png"
        // https://logos-world.net/assassins-creed-logo/
    }, 
    {
        question: "Guess The Video Game Logo",
        options: ["Among Us", "Brawl Stars", "Fall Guys", "Rocket League"],
        correct: 3,
        image: "assets/images/RL.png"
        // https://logos-world.net/rocket-league-logo/
    }, 
    {
        question: "Guess The Video Game Logo",
        options: ["Palworld", "Subnautica", "Ark Survival Evolved", "Unturned"],
        correct: 2,
        image: "assets/images/Ark.png"
        // https://1000logos.net/ark-logo/
    }, 
    {
        question: "Guess The Video Game Logo",
        options: ["Minecraft", "Terraria", "Core Keeper", "Stardew Valley"],
        correct: 1,
        image: "assets/images/Terraria.png"
        // https://logos-world.net/terraria-logo/
    }, 
    {
        question: "Guess The Video Game Logo",
        options: ["Roblox", "Block Blast", "Geometry Dash", "LEGO Worlds"],
        correct: 0,
        image: "assets/images/Roblox.png"
        // https://www.citypng.com/photo/7037/hd-roblox-square-black-white-symbol-sign-icon-logo-png
    }, 
    {
        question: "Guess The Video Game Logo",
        options: ["Animal Crossing", "Captain Toad: Treasure Tracker", "Toki Tori", "Yoshi Crafted World"],
        correct: 3,
        image: "assets/images/YCW.png"
        // https://commons.wikimedia.org/wiki/File:Kingdom_Hearts_logo.svg
    }

];

let currentQuestion = 0;
let timer;
let correctCount = 0;
let confettiCanvas;
let confettiParticles = [];
let confettiAnimation = null;

// ------------------------ Elements for the quiz screen ------------------- //
let quizScreen = document.getElementById('quiz-screen');
let quizHTML = quizScreen.innerHTML;
let questionText = document.getElementById('question-text');
let optionsContainer = document.getElementById('options-container');
let nextButton = document.getElementById('next-btn');
let restartButton = document.getElementById('restart-btn');
let timerDiv = document.getElementById('timer-text');

// --------------------------- Elements for the start screen ------------------------- //
let startScreen = document.getElementById('start-screen');
let startButton = document.getElementById('start-btn');

// -------------------------------------- Audio files----------------------- //
const correctSound = new Audio('assets/sounds/correct2.mp3');
// https://pixabay.com/users/chrisiex1-38081926/
const incorrectSound = new Audio('assets/sounds/incorrect.mp3');
// https://pixabay.com/users/freesound_community-46691455/

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
nextButton.addEventListener('click', loadNextQuestion);


// -------------- Randomize the questions----------------- //
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ----------------- Start Game Logic ------------------- //
function startGame() {
    shuffleArray(questions);
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    restartButton.style.display = 'none';

    loadQuestion();
}

// --------------------------- Restart Game Logic ------------------ //
function restartGame() {
    clearConfetti();
    currentQuestion = 0;
    correctCount = 0;

    const water = document.getElementById('water');
    water.style.height = `0%`;
    
    quizScreen.innerHTML = quizHTML;

    questionText = document.getElementById('question-text');
    optionsContainer = document.getElementById('options-container');
    nextButton = document.getElementById('next-btn');
    timerDiv = document.getElementById('timer-text');
    restartButton = document.getElementById('restart-btn');

    nextButton.addEventListener('click', loadNextQuestion);
    restartButton.addEventListener('click', restartGame);

    startScreen.style.display = 'block';
    quizScreen.style.display = 'none';
}

// ----------------- Quiz Logic --------------------- //
function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    timerDiv.style.display = 'block';
    nextButton.style.display = 'none';


// --------- Display and run the timer --------------- //
    let timeLeft = 10;
    timerDiv.textContent = timeLeft + 's';
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeoutIncorrect();
        } else {
            timerDiv.textContent = timeLeft + 's';
            timeLeft--;
        }
    }, 1000);

// --------- Update the image based on the current question --------------- //
    const imageContainer = document.querySelector('.image-container img');
    imageContainer.src = question.image;

    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.setAttribute('data-index', index);

        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = 'none';
}

// ------------------- Check Answer Logic ---------------------- //
function checkAnswer(selectedIndex) {
    clearInterval(timer);
    disableAnswers();
    const options = document.querySelectorAll('.option');
    const correctIndex = questions[currentQuestion].correct;
    const isCorrect = selectedIndex === correctIndex;

    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        correctSound.play();
        fillWaterLevel();
        launchConfetti();
    } else {
        incorrectSound.play();
    }

    correctSound.onended = incorrectSound.onended = () => {
        nextButton.style.display = 'block';
        timerDiv.style.display = 'none';
    };
}

// ------------------- Timeout Logic ---------------------- //
function timeoutIncorrect() {
    disableAnswers();
    const options = document.querySelectorAll('.option');
    const correctIndex = questions[currentQuestion].correct;

    options.forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
        }
    });

    timerDiv.style.display = 'none';
    nextButton.style.display = 'block';
}

// ------------------- Disable Answer Selection ---------------------- //
function disableAnswers() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
}

// ------------------- Load Next Question ---------------------- //
function loadNextQuestion() {
    clearConfetti();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionText.style.display = 'none';
        optionsContainer.style.display = 'none';
        nextButton.style.display = 'none';
        timerDiv.style.display = 'none';
        document.querySelector('.image-container').style.display = 'none';

        quizScreen.innerHTML = `
            <div class="end-message">
                <h1>CONGRATULATIONS! You Have Completed The Quiz.</h1>
                <h2>Your Score: <span style="color:rgb(46, 128, 145);">${correctCount}</span> out of 
                <span style="color:rgb(14, 72, 83);">${questions.length}</span></h2>
                <h2>Thank you for playing!</h2>
                <button class="restart-btn" id="restart-btn">Restart</button>
            </div>
        `;

        document.getElementById('restart-btn').addEventListener('click', restartGame);
        
        launchConfetti();
        console.log("The confetti is launching", launchConfetti);
    }
}

// ------------- Progress bar (water level)-------------------- //
function fillWaterLevel() {
    correctCount++;
    const totalQuestions = questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    const water = document.getElementById('water');
    water.style.height = `${percentage}%`;
}

// ------------- Launch Confetti -------------------- //
function launchConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    confettiParticles = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltAngleIncrement: Math.random() * 0.1 + 0.05,
    }));

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach((c) => {
            c.tiltAngle += c.tiltAngleIncrement;
            c.y += Math.cos(c.d) * 5;
            c.x += Math.sin(c.d);
            c.tilt = Math.sin(c.tiltAngle) * 15;
            context.beginPath();
            context.lineWidth = c.r;
            context.strokeStyle = c.color;
            context.moveTo(c.x + c.tilt + c.r / 2, c.y);
            context.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            context.stroke();
        });
    }

    function animate() {
        draw();
        confettiAnimation = requestAnimationFrame(animate);
    }

    animate();
}

// ------------- Clear Confetti -------------------- //
function clearConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
        confettiAnimation = null;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles = [];
}

// ------------------- Next button event listener --------------- //
nextButton.addEventListener('click', loadNextQuestion);