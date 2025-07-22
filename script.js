document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('content');

    // Função para carregar arquivos HTML
    async function loadComponent(file) {
        try {
            const response = await fetch(file);
            const html = await response.text();
            mainContent.innerHTML += html; // Adiciona o conteúdo carregado
        } catch (error) {
            console.error(`Erro ao carregar o arquivo ${file}:`, error);
        }
    }

    // Função para inicializar o carrossel
    function initializeCarousel() {
        const slides = document.querySelector('.carousel .slides');
        const images = document.querySelectorAll('.carousel img');
        const prevButton = document.querySelector('.carousel .prev');
        const nextButton = document.querySelector('.carousel .next');

        let currentIndex = 0;

        function updateCarousel() {
            const width = images[0].clientWidth;
            slides.style.transform = `translateX(-${currentIndex * width}px)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
        });

        // Ajusta o carrossel quando a janela é redimensionada
        window.addEventListener('resize', updateCarousel);

        // Inicializa o carrossel
        updateCarousel();
    }

    // Carrega os componentes e inicializa o carrossel ao final
    (async () => {
        await loadComponent('components/carousel.html');
        await loadComponent('components/about.html');
        await loadComponent('components/sponsors.html');

        initializeCarousel(); // Inicializa o carrossel após carregar o HTML
    })();
});
