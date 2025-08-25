/**
 * EDUCANDÁRIO EMMANUEL JUNIOR - JAVASCRIPT PRINCIPAL
 * 
 * Arquivo: /assets/js/main.js
 * Descrição: Funcionalidades do site institucional
 * 
 * PASSO A PASSO DE CONFIGURAÇÃO:
 * 
 * 1. EMAILJS (ENVIO DE FORMULÁRIO):
 *    - Acesse: https://www.emailjs.com/
 *    - Crie uma conta gratuita
 *    - Adicione um serviço de e-mail (Gmail, Outlook, etc.)
 *    - Crie um template de e-mail com as variáveis: {{nome_aluno}}, {{responsavel}}, {{telefone}}, {{email}}, {{turma}}, {{observacoes}}, {{data_nascimento}}
 *    - Copie o SERVICE_ID, TEMPLATE_ID e PUBLIC_KEY
 *    - Substitua os valores nas constantes abaixo
 * 
 * 2. WHATSAPP:
 *    - Substitua o número no CONFIG.whatsappNumber pelo número da escola (formato: 5581999999999)
 *    - Personalize a mensagem padrão em CONFIG.whatsappMessage
 * 
 * 3. REDES SOCIAIS:
 *    - Atualize as URLs do Instagram e Facebook no CONFIG
 * 
 * 4. ENDEREÇO E MAPA:
 *    - Atualize o endereço em CONFIG.enderecoTexto
 *    - Para o mapa: vá ao Google Maps, pesquise sua escola, clique em "Compartilhar" > "Incorporar mapa" e cole a URL em CONFIG.googleMapsEmbedUrl
 * 
 * 5. E-MAIL DE CONTATO:
 *    - Substitua CONFIG.emailContato pelo e-mail da escola
 */

// =====================================================
// CONFIGURAÇÕES PRINCIPAIS (EDITÁVEL)
// =====================================================

const CONFIG = {
    // === EMAILJS (Para envio automático do formulário) ===
    // IMPORTANTE: Configure estes valores para ativar o envio automático
    emailjs: {
        serviceId: 'SEU_SERVICE_ID',        // Substitua pelo seu Service ID do EmailJS
        templateId: 'SEU_TEMPLATE_ID',      // Substitua pelo seu Template ID do EmailJS  
        publicKey: 'SEU_PUBLIC_KEY'         // Substitua pela sua Public Key do EmailJS
    },
    
    // === WHATSAPP ===
    whatsappNumber: '5581999999999',        // EDITE: Número da escola (incluir DDI+DDD: 5581...)
    whatsappMessage: 'Olá! Gostaria de informações sobre a pré-matrícula no Educandário Emmanuel Junior.',
    
    // === CONTATOS ===
    emailContato: 'contato@educandario-emmanuel.com.br',  // EDITE: E-mail da escola
    
    // === REDES SOCIAIS ===
    instagramUrl: 'https://instagram.com/educandario_emmanuel',      // EDITE: URL do Instagram
    facebookUrl: 'https://facebook.com/educandario.emmanuel',        // EDITE: URL do Facebook
    
    // === ENDEREÇO ===
    enderecoTexto: 'Rua das Flores, 123 - Jardim Primavera, Recife/PE - CEP: 50000-000',  // EDITE: Endereço completo
    
    // === GOOGLE MAPS EMBED ===
    // Para obter: Google Maps > Pesquisar escola > Compartilhar > Incorporar mapa > Copiar HTML > Extrair URL do src
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.558!2d-34.906!3d-8.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDMnMDAuMCJTIDM0wrA1NCczNi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr'  // EDITE: URL do mapa embed
};

// =====================================================
// VARIÁVEIS GLOBAIS
// =====================================================

let currentImageIndex = 0;
let galleryImages = [];
let menuToggle, navMobile, lightbox, lightboxImage, lightboxCaption;

// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Educandário Emmanuel Junior - Site carregado com sucesso!');
    
    // Inicializar componentes
    initializeElements();
    initializeNavigation();
    initializeGallery();
    initializeForm();
    initializeContacts();
    initializeUtils();
    
    console.log('✅ Todos os componentes inicializados');
});

// =====================================================
// INICIALIZAÇÃO DOS ELEMENTOS
// =====================================================

function initializeElements() {
    // Elementos de navegação
    menuToggle = document.getElementById('menu-toggle');
    navMobile = document.getElementById('nav-mobile');
    
    // Elementos da galeria
    lightbox = document.getElementById('lightbox');
    lightboxImage = document.getElementById('lightbox-image');
    lightboxCaption = document.getElementById('lightbox-caption');
    
    // Coletar imagens da galeria
    const galleryItems = document.querySelectorAll('.galeria-item');
    galleryImages = Array.from(galleryItems).map(item => ({
        src: item.dataset.src,
        alt: item.dataset.alt
    }));
}

// =====================================================
// NAVEGAÇÃO E MENU
// =====================================================

function initializeNavigation() {
    // Toggle do menu mobile
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', toggleMobileMenu);
        
        // Fechar menu ao clicar em um link
        const mobileLinks = document.querySelectorAll('.nav-link-mobile');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Navegação suave para âncoras
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                closeMobileMenu();
            }
        });
    });
    
    // Header transparente no scroll
    window.addEventListener('scroll', handleScroll);
}

function toggleMobileMenu() {
    const isActive = navMobile.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    navMobile.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    
    // Focar no primeiro link do menu para acessibilidade
    const firstLink = navMobile.querySelector('.nav-link-mobile');
    if (firstLink) {
        firstLink.focus();
    }
}

function closeMobileMenu() {
    navMobile.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}

// =====================================================
// GALERIA E LIGHTBOX
// =====================================================

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.galeria-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        
        // Acessibilidade - permitir abrir com Enter
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        // Tornar focável
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Abrir imagem: ${item.dataset.alt}`);
    });
    
    // Controles do lightbox
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', showPreviousImage);
    document.getElementById('lightbox-next').addEventListener('click', showNextImage);
    
    // Controles por teclado
    document.addEventListener('keydown', handleLightboxKeydown);
}

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    
    // Prevenir scroll do body
    document.body.classList.add('lightbox-open');
    
    // Focar no botão fechar para acessibilidade
    document.getElementById('lightbox-close').focus();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    
    // Restaurar scroll do body
    document.body.classList.remove('lightbox-open');
    
    // Devolver foco para o item que abriu o lightbox
    const currentItem = document.querySelectorAll('.galeria-item')[currentImageIndex];
    if (currentItem) {
        currentItem.focus();
    }
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

function handleLightboxKeydown(e) {
    if (!lightbox.classList.contains('active')) return;
    
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
}

// =====================================================
// FORMULÁRIO DE PRÉ-MATRÍCULA
// =====================================================

function initializeForm() {
    const form = document.getElementById('form-pre-matricula');
    const telefoneInput = document.getElementById('telefone');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Máscara para telefone
        if (telefoneInput) {
            telefoneInput.addEventListener('input', applyPhoneMask);
        }
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function applyPhoneMask(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    
    e.target.value = value;
}

function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Limpar erro anterior
    clearFieldError(e);
    
    // Validações específicas
    switch(fieldName) {
        case 'nome_aluno':
        case 'responsavel':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Este campo é obrigatório.';
            } else if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 2 caracteres.';
            }
            break;
            
        case 'data_nascimento':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Data de nascimento é obrigatória.';
            } else {
                const birthDate = new Date(field.value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                
                if (age < 2 || age > 12) {
                    isValid = false;
                    errorMessage = 'Idade deve estar entre 2 e 12 anos.';
                }
            }
            break;
            
        case 'telefone':
            const phoneClean = field.value.replace(/\D/g, '');
            if (!phoneClean) {
                isValid = false;
                errorMessage = 'Telefone é obrigatório.';
            } else if (phoneClean.length < 10 || phoneClean.length > 11) {
                isValid = false;
                errorMessage = 'Telefone deve ter 10 ou 11 dígitos.';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value) {
                isValid = false;
                errorMessage = 'E-mail é obrigatório.';
            } else if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'E-mail inválido.';
            }
            break;
            
        case 'turma':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Selecione uma turma.';
            }
            break;
    }
    
    // Mostrar erro se inválido
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    field.classList.add('error');
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    field.classList.remove('error');
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = document.getElementById('btn-submit');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Validar todos os campos
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        const fieldEvent = { target: input };
        if (!validateField(fieldEvent)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showFormMessage(errorMessage, 'Por favor, corrija os erros no formulário.');
        return;
    }
    
    // Mostrar estado de carregamento
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Ocultar mensagens anteriores
    hideFormMessages();
    
    try {
        // Verificar se EmailJS está configurado
        if (CONFIG.emailjs.serviceId === 'SEU_SERVICE_ID' || 
            CONFIG.emailjs.templateId === 'SEU_TEMPLATE_ID' || 
            CONFIG.emailjs.publicKey === 'SEU_PUBLIC_KEY') {
            
            // Fallback: abrir cliente de e-mail
            await sendEmailFallback(form);
        } else {
            // Enviar via EmailJS
            await sendEmailJS(form);
        }
        
        showFormMessage(successMessage, 'Pré-matrícula enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showFormMessage(errorMessage, 'Erro ao enviar formulário. Tente novamente ou entre em contato por telefone.');
    } finally {
        // Restaurar estado do botão
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
}

async function sendEmailJS(form) {
    const formData = new FormData(form);
    const templateParams = {};
    
    // Converter FormData para objeto
    for (let [key, value] of formData.entries()) {
        templateParams[key] = value;
    }
    
    // Enviar via EmailJS
    const response = await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.templateId,
        templateParams,
        CONFIG.emailjs.publicKey
    );
    
    if (response.status !== 200) {
        throw new Error('Falha no envio via EmailJS');
    }
}

async function sendEmailFallback(form) {
    const formData = new FormData(form);
    
    // Construir corpo do e-mail
    const emailBody = `
NOVA PRÉ-MATRÍCULA - EDUCANDÁRIO EMMANUEL JUNIOR

Nome do Aluno: ${formData.get('nome_aluno')}
Data de Nascimento: ${formatDate(formData.get('data_nascimento'))}
Responsável: ${formData.get('responsavel')}
Telefone/WhatsApp: ${formData.get('telefone')}
E-mail: ${formData.get('email')}
Turma Pretendida: ${formData.get('turma')}

Observações:
${formData.get('observacoes') || 'Nenhuma observação.'}

---
Enviado através do site em ${new Date().toLocaleString('pt-BR')}
    `.trim();
    
    // Abrir cliente de e-mail
    const subject = encodeURIComponent('Nova Pré-Matrícula - ' + formData.get('nome_aluno'));
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:${CONFIG.emailContato}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
    
    // Mostrar instrução para o usuário
    alert('Seu cliente de e-mail foi aberto com os dados da pré-matrícula.\n\nPara ativar o envio automático, configure o EmailJS seguindo as instruções no arquivo main.js.');
}

function showFormMessage(element, message) {
    const textElement = element.querySelector('.message-text');
    if (textElement) {
        textElement.textContent = message;
    }
    element.classList.add('show');
    
    // Scroll até a mensagem
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideFormMessages() {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// =====================================================
// CONTATOS E LINKS
// =====================================================

function initializeContacts() {
    // Configurar links do WhatsApp
    const whatsappButtons = document.querySelectorAll('#whatsapp-header, #whatsapp-contato');
    whatsappButtons.forEach(button => {
        const message = encodeURIComponent(CONFIG.whatsappMessage);
        button.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    });
    
    // Configurar e-mail de contato
    const emailLinks = document.querySelectorAll('#email-contato, #footer-email');
    emailLinks.forEach(link => {
        link.href = `mailto:${CONFIG.emailContato}`;
        link.textContent = CONFIG.emailContato;
    });
    
    // Configurar redes sociais
    const instagramLink = document.getElementById('instagram-link');
    const facebookLink = document.getElementById('facebook-link');
    
    if (instagramLink) {
        instagramLink.href = CONFIG.instagramUrl;
    }
    
    if (facebookLink) {
        facebookLink.href = CONFIG.facebookUrl;
    }
    
    // Configurar endereço
    const enderecoElements = document.querySelectorAll('#endereco-texto, #footer-endereco');
    enderecoElements.forEach(element => {
        element.textContent = CONFIG.enderecoTexto;
    });
    
    // Configurar mapa
    const mapa = document.getElementById('google-maps');
    if (mapa) {
        mapa.src = CONFIG.googleMapsEmbedUrl;
    }
}

// =====================================================
// UTILIDADES
// =====================================================

function initializeUtils() {
    // Ano atual no footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Inicializar EmailJS se configurado
    if (typeof emailjs !== 'undefined' && 
        CONFIG.emailjs.publicKey !== 'SEU_PUBLIC_KEY') {
        emailjs.init(CONFIG.emailjs.publicKey);
        console.log('✅ EmailJS inicializado');
    } else {
        console.log('⚠️ EmailJS não configurado - usando fallback por e-mail');
    }
}

// =====================================================
// FUNÇÕES AUXILIARES PÚBLICAS
// =====================================================

/**
 * Função para adicionar nova imagem ao mural
 * USO: addGalleryImage('path/to/image.jpg', 'Descrição da imagem')
 */
function addGalleryImage(src, alt) {
    const galeriaGrid = document.querySelector('.galeria-grid');
    
    const newItem = document.createElement('div');
    newItem.className = 'galeria-item';
    newItem.dataset.src = src;
    newItem.dataset.alt = alt;
    newItem.setAttribute('tabindex', '0');
    newItem.setAttribute('role', 'button');
    newItem.setAttribute('aria-label', `Abrir imagem: ${alt}`);
    
    newItem.innerHTML = `
        <img src="${src}" alt="${alt}" loading="lazy">
        <div class="galeria-overlay">
            <span class="galeria-icon">🔍</span>
        </div>
    `;
    
    galeriaGrid.appendChild(newItem);
    
    // Recriar array de imagens e eventos
    galleryImages.push({ src, alt });
    const newIndex = galleryImages.length - 1;
    
    newItem.addEventListener('click', () => openLightbox(newIndex));
    newItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(newIndex);
        }
    });
}

/**
 * Função para atualizar configurações
 * USO: updateConfig({ whatsappNumber: '5581999999999' })
 */
function updateConfig(newConfig) {
    Object.assign(CONFIG, newConfig);
    console.log('✅ Configurações atualizadas:', newConfig);
    
    // Re-inicializar contatos com novas configurações
    initializeContacts();
}

// =====================================================
// LOGS DE DEBUG (REMOVER EM PRODUÇÃO)
// =====================================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.group('🔧 Modo de Desenvolvimento');
    console.log('📝 Configurações atuais:', CONFIG);
    console.log('🖼️ Imagens da galeria:', galleryImages.length);
    console.log('📱 Para adicionar imagem: addGalleryImage("path/img.jpg", "Descrição")');
    console.log('⚙️ Para atualizar config: updateConfig({ whatsappNumber: "5581999999999" })');
    console.groupEnd();
}