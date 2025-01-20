document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('content');

    async function loadComponent(file) {
        try {
            const response = await fetch(file);
            return await response.text();
        } catch (error) {
            console.error(`Erro ao carregar o arquivo ${file}:`, error);
            return '';
        }
    }

    function loadCSS(file) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        document.head.appendChild(link);
    }

    async function loadJS(file) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = file;
            script.onload = resolve;
            script.onerror = (error) => {
                console.error(`Erro ao carregar o script ${file}:`, error);
                reject(error);
            };
            document.body.appendChild(script);
        });
    }

    async function loadComponents() {
        try {
            console.log('Carregando o carrossel...');
            const carousel = await loadComponent('components/carousel.html');
            mainContent.insertAdjacentHTML('beforeend', carousel);
            loadCSS('components/carousel.css');
            await loadJS('components/carousel.js');
            console.log('Carrossel carregado.');

            console.log('Carregando o "sobre"...');
            const about = await loadComponent('components/about.html');
            mainContent.insertAdjacentHTML('beforeend', about);
            // loadCSS('components/about.css');
            // await loadJS('components/about.js');
            console.log('Sobre carregado.');

            console.log('Carregando os patrocinadores...');
            const sponsors = await loadComponent('components/sponsors.html');
            mainContent.insertAdjacentHTML('beforeend', sponsors);
            // loadCSS('components/sponsors.css');
            // await loadJS('components/sponsors.js');
            console.log('Patrocinadores carregados.');
        } catch (error) {
            console.error('Erro ao carregar os componentes:', error);
        }
    }

    loadComponents();
});
