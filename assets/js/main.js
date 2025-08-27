/**
 * EDUCANDÁRIO EMMANUEL JUNIOR - JAVASCRIPT PRINCIPAL
 * 
 * Arquivo: /assets/js/main.js
 * Descrição: Funcionalidades do site institucional - Compatível com TailwindCSS
 */

// =====================================================
// CONFIGURAÇÕES PRINCIPAIS (EDITÁVEL)
// =====================================================

const CONFIG = {
    // === EMAILJS (Para envio automático do formulário) ===
    emailjs: {
        serviceId: 'SEU_SERVICE_ID',
        templateId: 'SEU_TEMPLATE_ID',
        publicKey: 'SEU_PUBLIC_KEY'
    },
    
    // === WHATSAPP ===
    whatsappNumber: '5581999999999',
    whatsappMessage: 'Olá! Gostaria de informações sobre a pré-matrícula no Educandário Emmanuel Junior.',
    
    // === CONTATOS ===
    emailContato: 'contato@educandario-emmanuel.com.br',
    
    // === REDES SOCIAIS ===
    instagramUrl: 'https://instagram.com/educandario_emmanuel',
    facebookUrl: 'https://facebook.com/educandario.emmanuel',
    
    // === ENDEREÇO ===
    enderecoTexto: 'Rua das Flores, 123 - Jardim Primavera, Recife/PE - CEP: 50000-000',
    
    // === GOOGLE MAPS EMBED ===
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.558!2d-34.906!3d-8.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDMnMDAuMCJTIDM0wrA1NCczNi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr'
};

// =====================================================
// VARIÁVEIS GLOBAIS
// =====================================================

let currentImageIndex = 0;
let galleryImages = [];

// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Educandário Emmanuel Junior - Site carregado com sucesso!');
    
    initializeNavigation();
    initializeGallery();
    initializeForm();
    initializeContacts();
    updateCurrentYear();
    
    console.log('✅ Todos os componentes inicializados');
});

// =====================================================
// NAVEGAÇÃO E MENU
// =====================================================

function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMobile = document.getElementById('nav-mobile');
    
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMobile.classList.contains('block');
            
            if (isActive) {
                navMobile.classList.add('hidden');
                navMobile.classList.remove('block');
                menuToggle.classList.remove('hamburger-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                navMobile.classList.remove('hidden');
                navMobile.classList.add('block');
                menuToggle.classList.add('hamburger-active');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Fechar menu ao clicar em links
        const mobileLinks = navMobile.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMobile.classList.add('hidden');
                navMobile.classList.remove('block');
                menuToggle.classList.remove('hamburger-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80; // altura do header fixo
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// GALERIA E LIGHTBOX
// =====================================================

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Coletar imagens
    galleryImages = Array.from(galleryItems).map(item => ({
        src: item.dataset.src,
        alt: item.dataset.alt
    }));
    
    // Event listeners para abrir lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });
    
    // Controles do lightbox
    if (lightbox) {
        document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
        document.getElementById('lightbox-overlay')?.addEventListener('click', closeLightbox);
        document.getElementById('lightbox-prev')?.addEventListener('click', showPreviousImage);
        document.getElementById('lightbox-next')?.addEventListener('click', showNextImage);
        
        // Controles por teclado
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('opacity-100')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        });
    }
    
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        lightbox.classList.add('opacity-100', 'pointer-events-auto');
        document.body.classList.add('lightbox-open');
    }
    
    function closeLightbox() {
        lightbox.classList.add('opacity-0', 'pointer-events-none');
        lightbox.classList.remove('opacity-100', 'pointer-events-auto');
        document.body.classList.remove('lightbox-open');
    }
    
    function showPreviousImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
        updateLightboxImage();
    }
    
    function showNextImage() {
        currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        if (galleryImages[currentImageIndex]) {
            const image = galleryImages[currentImageIndex];
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = image.alt;
        }
    }
}

// =====================================================
// FORMULÁRIO DE PRÉ-MATRÍCULA (simplificado para TailwindCSS)
// =====================================================

function initializeForm() {
    const form = document.getElementById('form-pre-matricula');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('btn-submit');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');
        
        // Mostrar loading
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').classList.add('hidden');
        submitBtn.querySelector('.btn-loading').classList.remove('hidden');
        
        try {
            // Simular envio (configure EmailJS para funcionalidade real)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar sucesso
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            form.reset();
            
        } catch (error) {
            // Mostrar erro
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
        } finally {
            // Restaurar botão
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').classList.remove('hidden');
            submitBtn.querySelector('.btn-loading').classList.add('hidden');
        }
    });
}

// =====================================================
// CONTATOS E LINKS
// =====================================================

function initializeContacts() {
    // WhatsApp links
    document.querySelectorAll('#whatsapp-header, #whatsapp-contato').forEach(link => {
        link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    });
    
    // E-mail
    const emailLink = document.getElementById('email-contato');
    if (emailLink) {
        emailLink.href = `mailto:${CONFIG.emailContato}`;
        emailLink.textContent = CONFIG.emailContato;
    }
    
    // Redes sociais
    const instagramLink = document.getElementById('instagram-link');
    if (instagramLink) instagramLink.href = CONFIG.instagramUrl;
    
    const facebookLink = document.getElementById('facebook-link');
    if (facebookLink) facebookLink.href = CONFIG.facebookUrl;
    
    // Endereço
    document.querySelectorAll('#endereco-texto, #footer-endereco').forEach(element => {
        element.textContent = CONFIG.enderecoTexto;
    });
    
    // E-mail no footer
    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) footerEmail.textContent = CONFIG.emailContato;
    
    // Mapa
    const googleMaps = document.getElementById('google-maps');
    if (googleMaps) googleMaps.src = CONFIG.googleMapsEmbedUrl;
}

// =====================================================
// UTILITÁRIOS
// =====================================================

function updateCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}