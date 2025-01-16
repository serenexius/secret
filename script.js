
let audioStarted = false;
let noCount = 0;
const audio = document.getElementById('bgMusic');
const volumeControl = document.getElementById('volumeControl');


// Array of cute pickup lines
const pickupLines = [
"You have no reflection in the water because even something as beautiful as the blue water couldn't mimic the beauty you possess.",
"I could never understand how people could stare at a painting for hours, but then I saw your face.",
"They talk about how limitless the sky is, but they haven’t seen me get lost in thought when I think about you.",
"Your memory feels like home to me, so whenever my mind wanders, it always finds its way back to you.",
"If I were a singer, I would write a song about you, but since I’m not, I dedicate my heart to you.",
"If loving you would send me to hell, I’d brag to the devil about how I experienced heaven without going there.",
"If you asked me how many times you came into my mind, I’d say once—because you came and never left.",
];


// Remove loading screen after page loads
window.onload = function() {
    audio.volume = volumeControl.value / 100;
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);
};

// Audio controls
document.getElementById("audioControl").addEventListener("click", function() {
    if (audio.paused) {
        audio.play()
            .then(() => {
                audioStarted = true;
                this.textContent = "🔊";
            })
            .catch(err => {
                console.log("Audio playback failed:", err);
            });
    } else {
        audio.pause();
        this.textContent = "🎵";
    }
});

volumeControl.addEventListener("input", function() {
    audio.volume = this.value / 100;
});

// Heart animation functions
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.getElementById('hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function startHeartAnimation() {
    setInterval(createHeart, 300);
}

// Confetti animation
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ffffff'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 4000);
}

// Navigation functions
function startJourney() {
    try {
        if (!audioStarted) {
            audio.play()
                .then(() => {
                    audioStarted = true;
                    document.getElementById("audioControl").textContent = "🔊";
                })
                .catch(err => {
                    console.log("Audio playback failed:", err);
                });
        }
        nextStep(1);
    } catch (err) {
        console.log("Journey start failed:", err);
        nextStep(1); // Continue even if audio fails
    }
}

function nextStep(step) {
    const currentStep = document.querySelector('.step.active');
    const nextStep = document.getElementById('step' + step);
    
    if (currentStep && nextStep) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        
        if (step === 6) {
            setMinDateTime();
        }
    }
}

// No button interaction with improved randomization
function handleNo() {
    noCount++;
    const noBtn = document.getElementById('noBtn');
    
    if (noCount > 1) {
        const randomX = (Math.random() * 200 - 100) * (noCount / 2);
        const randomY = (Math.random() * 200 - 100) * (noCount / 2);
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        noBtn.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    setTimeout(() => {
        noBtn.style.transform = 'translate(0, 0)';
    }, 2000);
}

// Date-time validation and formatting
function setMinDateTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Minimum 30 minutes from now
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    const dateInput = document.getElementById('datetime');
    dateInput.min = minDateTime;
    
    // Set max date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxDateTime = maxDate.toISOString().slice(0, 16);
    dateInput.max = maxDateTime;
}

// Form submission with enhanced validation
document.getElementById('dateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dateTime = new Date(document.getElementById('datetime').value);
    const message = document.getElementById('message').value.trim();
    const now = new Date();
    const errorMsg = document.getElementById('dateError');
    
    if (dateTime < now) {
        errorMsg.textContent = "Please choose a future date and time! ⏰";
        errorMsg.classList.add('show');
        return;
    }

    if (message.length < 3) {
        errorMsg.textContent = "Please add a longer message! 💌";
        errorMsg.classList.add('show');
        return;
    }
    
    // Format the date for display
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    
    const formattedDate = dateTime.toLocaleDateString('en-US', options);
    
    // Set final message with enhanced formatting
    document.getElementById('finalMessage').innerHTML = `
        <span style="font-size: 3rem">It's a Date! 💝</span><br>
        <span style="font-size: 1.8rem">${formattedDate}</span><br><br>
        <span style="font-style: italic; color: #ff1493">"${message}"</span>
    `;
    
    // Start celebration animations
    for (let i = 0; i < 50; i++) {
        setTimeout(createConfetti, i * 100);
    }
    startHeartAnimation();
    
    nextStep(7);
});

// Enhanced pickup line generator with animation
function showPickupLine() {
// Remove existing pickup line if present
const existingLine = document.querySelector('.pickup-line-container');
if (existingLine) {
    existingLine.remove();
}

// Get a random pickup line
const randomLine = pickupLines[Math.floor(Math.random() * pickupLines.length)];

// Create container
const container = document.createElement('div');
container.className = 'pickup-line-container';

// Create text element
const lineElement = document.createElement('p');
lineElement.className = 'pickup-line-text';
lineElement.textContent = randomLine;

// Add text to container
container.appendChild(lineElement);

// Add container to body
document.body.appendChild(container);

// Trigger animation
setTimeout(() => {
    container.classList.add('show');
}, 100);

// Create extra celebration hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 200);
}
}
// Set minimum and maximum date-time for the input
function setMinDateTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Minimum 30 minutes from now
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    const dateInput = document.getElementById('datetime');
    dateInput.min = minDateTime;
    
    // Set max date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxDateTime = maxDate.toISOString().slice(0, 16);
    dateInput.max = maxDateTime;
}

// Form submission handler with validation
document.getElementById('dateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dateTime = new Date(document.getElementById('datetime').value);
    const message = document.getElementById('message').value.trim();
    const now = new Date();
    const errorMsg = document.getElementById('dateError');
    
    // Validate date is in the future
    if (dateTime < now) {
        errorMsg.textContent = "Please choose a future date and time! ⏰";
        errorMsg.classList.add('show');
        return;
    }

    // Validate message length
    if (message.length < 3) {
        errorMsg.textContent = "Please add a longer message! 💌";
        errorMsg.classList.add('show');
        return;
    }
    
    // Format the date for display
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    
    const formattedDate = dateTime.toLocaleDateString('en-US', options);
    
    // Display the final message
    document.getElementById('finalMessage').innerHTML = `
        <span style="font-size: 3rem">It's a Date! 💝</span><br>
        <span style="font-size: 1.8rem">${formattedDate}</span><br><br>
        <span style="font-style: italic; color: #ff1493">"${message}"</span>
    `;
});

// Call setMinDateTime when the form is loaded
setMinDateTime();