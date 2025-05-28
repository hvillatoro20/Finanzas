// Configuración personalizable
const config = {
    nombre: "Alejandra María",
    edad: 26,
    fotoPrincipal: "https://via.placeholder.com/400x500/ffb6c1/e6e6fa?text=Alejandra+María",
    mensajePersonalizado: "Tu luz ilumina nuestro mundo",
    mensajesSorpresa: [
        "¡Eres increíble!",
        "¡Que todos tus sueños se hagan realidad!",
        "¡26 años de pura magia!",
        "¡Brillas más que el sol!",
        "¡El mundo es mejor contigo en él!"
    ],
    proximoCumple: new Date(new Date().getFullYear() + 1, 4, 28) // 28 de mayo del próximo año
};

// Inicialización de elementos
document.addEventListener('DOMContentLoaded', function() {
    // Configurar elementos con los valores del objeto config
    document.getElementById('nombre').textContent = config.nombre;
    document.getElementById('edad').textContent = config.edad;
    document.getElementById('profile-photo').src = config.fotoPrincipal;
    document.getElementById('personal-message').textContent = config.mensajePersonalizado;
    
    // Animación del contador de edad
    animateAgeCounter();
    
    // Configurar botones interactivos
    setupInteractiveButtons();
    
    // Mostrar confeti inicial
    triggerConfetti();
    
    // Configurar cuenta regresiva para próximo cumpleaños
    setupCountdown();
});

// Función para animar el contador de edad
function animateAgeCounter() {
    const ageElement = document.getElementById('animated-age');
    const targetAge = config.edad;
    let currentAge = 0;
    const duration = 2000; // 2 segundos
    const increment = targetAge / (duration / 16); // 60fps
    
    const animate = () => {
        currentAge += increment;
        if (currentAge < targetAge) {
            ageElement.textContent = Math.floor(currentAge);
            requestAnimationFrame(animate);
        } else {
            ageElement.textContent = targetAge;
        }
    };
    
    animate();
}

// Función para configurar los botones interactivos
function setupInteractiveButtons() {
    // Botón de sorpresa
    const surpriseBtn = document.getElementById('surprise-btn');
    surpriseBtn.addEventListener('click', showRandomMessage);
    
    // Botón de confeti
    const confettiBtn = document.getElementById('confetti-btn');
    confettiBtn.addEventListener('click', triggerConfetti);
    
    // Botón de música
    const musicBtn = document.getElementById('music-btn');
    const birthdaySong = document.getElementById('birthday-song');
    musicBtn.addEventListener('click', function() {
        if (birthdaySong.paused) {
            birthdaySong.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar canción';
        } else {
            birthdaySong.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i> Reproducir canción';
        }
    });
}

// Función para mostrar mensajes aleatorios
function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * config.mensajesSorpresa.length);
    const message = config.mensajesSorpresa[randomIndex];
    
    // Crear tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.padding = '10px 20px';
    tooltip.style.borderRadius = '10px';
    tooltip.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    tooltip.style.animation = 'fadeIn 0.5s, floatUp 2s forwards';
    
    // Posicionar tooltip
    const btnRect = document.getElementById('surprise-btn').getBoundingClientRect();
    tooltip.style.left = `${btnRect.left + btnRect.width/2 - 100}px`;
    tooltip.style.top = `${btnRect.top - 60}px`;
    
    document.body.appendChild(tooltip);
    
    // Eliminar tooltip después de 3 segundos
    setTimeout(() => {
        tooltip.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => tooltip.remove(), 500);
    }, 3000);
}

// Función para lanzar confeti
function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb6c1', '#e6e6fa', '#d8bfd8', '#ffffff']
    });
}

// Función para configurar la cuenta regresiva
function setupCountdown() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Verificar si ya pasó el cumpleaños de este año
    if (now > config.proximoCumple) {
        return;
    }
    
    // Calcular días restantes
    const diffTime = config.proximoCumple - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Mostrar cuenta regresiva
    const countdownContainer = document.getElementById('countdown-container');
    const countdownText = document.getElementById('countdown-text');
    
    countdownText.textContent = `¡Faltan ${diffDays} días para tu próximo cumple!`;
    countdownContainer.classList.remove('hidden');
}

// Efecto parallax en scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});