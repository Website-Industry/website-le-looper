// ============================================
// Configuration - URLs à mettre à jour
// ============================================
const CONFIG = {
    DISCORD_INVITE_URL: "https://discord.gg/aWUtah3rvF",
    INSTAGRAM_URL: "https://www.instagram.com/lelooper_toulouse/",
    FACEBOOK_URL: "https://www.facebook.com/groups/711269780777603"
};

// ============================================
// Initialisation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initDiscordLinks();
    initInstagramLinks();
    initFacebookLinks();
    initPlatformCards();
    initYear();
    initSmoothScroll();
});

// ============================================
// Navigation mobile
// ============================================
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });

    // Fermer le menu quand on clique sur un lien dans les dropdowns
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        }
    });

    // Fermer le menu avec Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            menuToggle.focus();
        }
    });
}

// ============================================
// Liens Discord
// ============================================
function initDiscordLinks() {
    const discordButtons = document.querySelectorAll('[id^="discordBtn"]');
    
    discordButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Tracking local (optionnel)
            try {
                const clickCount = localStorage.getItem('discord_clicks') || 0;
                localStorage.setItem('discord_clicks', parseInt(clickCount) + 1);
            } catch (err) {
                // Ignore si localStorage n'est pas disponible
            }
            
            // Ouvrir Discord
            if (CONFIG.DISCORD_INVITE_URL && CONFIG.DISCORD_INVITE_URL !== "https://discord.gg/TON_INVITATION") {
                window.open(CONFIG.DISCORD_INVITE_URL, '_blank', 'noopener,noreferrer');
            } else {
                // Afficher un message si l'URL n'est pas configurée
                alert('Le lien Discord sera bientôt disponible. Reviens plus tard !');
            }
        });
    });
}

// ============================================
// Liens Instagram
// ============================================
function initInstagramLinks() {
    const instagramButtons = document.querySelectorAll('[id^="instagramBtn"]');
    
    instagramButtons.forEach(button => {
        button.href = CONFIG.INSTAGRAM_URL;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        
        button.addEventListener('click', function(e) {
            if (!CONFIG.INSTAGRAM_URL || CONFIG.INSTAGRAM_URL === "https://instagram.com/TONCOMPTE") {
                e.preventDefault();
                alert('Le compte Instagram sera bientôt disponible. Reviens plus tard !');
            }
        });
    });
}

// ============================================
// Liens Facebook
// ============================================
function initFacebookLinks() {
    const facebookButtons = document.querySelectorAll('[id^="facebookBtn"]');
    
    facebookButtons.forEach(button => {
        button.href = CONFIG.FACEBOOK_URL;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
    });
}

// ============================================
// Cartes plateformes
// ============================================
function initPlatformCards() {
    // Discord
    const discordPlatformBtn = document.getElementById('discordPlatformBtn');
    if (discordPlatformBtn) {
        discordPlatformBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (CONFIG.DISCORD_INVITE_URL && CONFIG.DISCORD_INVITE_URL !== "https://discord.gg/TON_INVITATION") {
                window.open(CONFIG.DISCORD_INVITE_URL, '_blank', 'noopener,noreferrer');
            } else {
                alert('Le lien Discord sera bientôt disponible. Reviens plus tard !');
            }
        });
    }
    
    // Instagram
    const instagramPlatformBtn = document.getElementById('instagramPlatformBtn');
    if (instagramPlatformBtn) {
        instagramPlatformBtn.href = CONFIG.INSTAGRAM_URL;
        instagramPlatformBtn.target = '_blank';
        instagramPlatformBtn.rel = 'noopener noreferrer';
    }
    
    // Facebook
    const facebookPlatformBtn = document.getElementById('facebookPlatformBtn');
    if (facebookPlatformBtn) {
        facebookPlatformBtn.href = CONFIG.FACEBOOK_URL;
        facebookPlatformBtn.target = '_blank';
        facebookPlatformBtn.rel = 'noopener noreferrer';
    }
}

// ============================================
// Année automatique
// ============================================
function initYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// ============================================
// Smooth scroll pour les ancres
// ============================================
function initSmoothScroll() {
    // Vérifier si l'utilisateur préfère réduire les animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Désactiver le smooth scroll si l'utilisateur préfère réduire les animations
        return;
    }

    // Gérer les ancres internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les ancres vides ou juste "#"
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculer la position en tenant compte de la navbar fixe
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Gestion des erreurs
// ============================================
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // Ne pas afficher d'alerte à l'utilisateur pour éviter de polluer l'UX
});

// ============================================
// Amélioration de l'accessibilité au clavier
// ============================================
document.addEventListener('keydown', function(event) {
    // Navigation au clavier améliorée
    if (event.key === 'Tab') {
        // S'assurer que les éléments focusables sont bien visibles
        const focusedElement = document.activeElement;
        if (focusedElement && typeof focusedElement.scrollIntoView === 'function') {
            // ScrollIntoView est géré par le navigateur, mais on peut ajouter une logique supplémentaire si besoin
        }
    }
});

