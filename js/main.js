/* DARK MODE / LIGHT MODE */

// Sélection du bouton de changement de thème
const themeToggle = document.querySelector(".theme-toggle");

// Vérifie que le bouton existe sur la page
if (themeToggle) {

    // Sélection de l'icône à l'intérieur du bouton
    const icone = themeToggle.querySelector("i");

    // Récupère le thème enregistré
    const themeSauvegarde = localStorage.getItem("theme");

    // Si le thème enregistré est sombre
    if (themeSauvegarde === "dark") {

        document.documentElement.setAttribute("data-theme", "dark");

        icone.classList.remove("bi-moon-fill");
        icone.classList.add("bi-sun-fill");

    }

    // Changement de thème au clic
    themeToggle.addEventListener("click", function () {

        const themeActuel = document.documentElement.getAttribute("data-theme");

        if (themeActuel === "dark") {

            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");

            icone.classList.remove("bi-sun-fill");
            icone.classList.add("bi-moon-fill");

        } else {

            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");

            icone.classList.remove("bi-moon-fill");
            icone.classList.add("bi-sun-fill");

        }

    });

}

/* ==========================
   NAVBAR DYNAMIQUE
========================== */

// Sélection de la barre de navigation
const navbar = document.querySelector(".navbar");

// Vérifie que la navbar existe
if (navbar) {

    // Détecte le défilement de la page
    window.addEventListener("scroll", function () {

        // Si on dépasse 80 pixels
        if (window.scrollY > 80) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}
/* ==========================
   MENU HAMBURGER
========================== */

// Sélection des éléments
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Vérifie que les éléments existent
if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}
/* ==========================
   COMPTE À REBOURS
========================== */

// Vérifie que les éléments existent
const joursElement = document.getElementById("jours");

if (joursElement) {

    const dateConference = new Date("March 12, 2027 09:00:00").getTime();

    function mettreAJourCountdown() {

        const maintenant = new Date().getTime();

        const difference = dateConference - maintenant;

        const jours = Math.floor(difference / (1000 * 60 * 60 * 24));

        const heures = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const secondes = Math.floor(
            (difference % (1000 * 60)) /
            1000
        );

        document.getElementById("jours").textContent = String(jours).padStart(2, "0");
        document.getElementById("heures").textContent = String(heures).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("secondes").textContent = String(secondes).padStart(2, "0");

        if (difference <= 0) {

            clearInterval(intervalCountdown);

        }

    }

    const intervalCountdown = setInterval(mettreAJourCountdown, 1000);

    mettreAJourCountdown();

}
/* ANNEE DYNAMIQUE */
const anneeElement = document.getElementById("annee");

if (anneeElement) {

    anneeElement.textContent = new Date().getFullYear();

}

/* BACKTOP TOP */
const boutonRetourHaut = document.getElementById("backToTop");

if (boutonRetourHaut) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            boutonRetourHaut.classList.add("visible");

        } else {

            boutonRetourHaut.classList.remove("visible");

        }

    });

    boutonRetourHaut.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* ==========================
   ONGLETS PROGRAMME
========================== */

// Sélectionne tous les boutons
const boutonsProgramme = document.querySelectorAll(".tab-button");

// Sélectionne tous les contenus
const contenusProgramme = document.querySelectorAll(".tab-content");

// Vérifie que l'on est sur la page Programme
if (boutonsProgramme.length > 0) {

    boutonsProgramme.forEach(function (bouton) {

        bouton.addEventListener("click", function () {

            // Désactive tous les boutons
            boutonsProgramme.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Cache tous les contenus
            contenusProgramme.forEach(function (contenu) {
                contenu.classList.remove("active");
            });

            // Active le bouton cliqué
            bouton.classList.add("active");

            // Affiche le contenu correspondant
            const id = bouton.dataset.tab;

            document.getElementById(id).classList.add("active");

        });

    });

}
/* ==========================
   ANIMATIONS AU SCROLL
========================== */

const elementsAnimes = document.querySelectorAll(".animate-on-scroll");

if (elementsAnimes.length > 0) {

    const observer = new IntersectionObserver(function (entrees) {

        entrees.forEach(function (entree) {

            if (entree.isIntersecting) {
                entree.target.classList.add("visible");
            }

        });

    });

    elementsAnimes.forEach(function (element) {
        observer.observe(element);
    });

}
/* ==========================
   COMPTEURS ANIMÉS (STATS)
========================== */

const compteurs = document.querySelectorAll(".stat-card [id^='stat-']");

if (compteurs.length > 0) {

    const observerCompteurs = new IntersectionObserver(function (entrees) {

        entrees.forEach(function (entree) {

            if (entree.isIntersecting) {

                const element = entree.target;
                const valeurCible = parseInt(element.dataset.target);
                let valeurActuelle = 0;

                const intervalCompteur = setInterval(function () {

                    valeurActuelle += Math.ceil(valeurCible / 50);

                    if (valeurActuelle >= valeurCible) {
                        valeurActuelle = valeurCible;
                        clearInterval(intervalCompteur);
                    }

                    element.textContent = valeurActuelle;

                }, 30);

                observerCompteurs.unobserve(element);

            }

        });

    });

    compteurs.forEach(function (compteur) {
        observerCompteurs.observe(compteur);
    });

}
/* ==========================
   FILTRAGE INTERVENANTS
========================== */

const boutonsFiltre = document.querySelectorAll(".filter-btn");
const cartesIntervenants = document.querySelectorAll(".speakers-card");

if (boutonsFiltre.length > 0) {

    boutonsFiltre.forEach(function (bouton) {

        bouton.addEventListener("click", function () {

            // Étape 1 : gérer l'état actif des boutons
            boutonsFiltre.forEach(function (btn) {
                btn.classList.remove("active");
            });
            bouton.classList.add("active");

            // Étape 2 : lire la catégorie choisie
            const categorieChoisie = bouton.dataset.filter;

            // Étape 3 : afficher ou cacher chaque carte selon la catégorie
            cartesIntervenants.forEach(function (carte) {

                if (categorieChoisie === "all" || carte.dataset.category === categorieChoisie) {
                    carte.style.display = "";
                } else {
                    carte.style.display = "none";
                }

            });

        });

    });

}
/* ==========================
   VALIDATION FORMULAIRE
========================== */

const formulaire = document.getElementById("registrationForm");

if (formulaire) {

    formulaire.addEventListener("submit", function (event) {

        // Empêche l'envoi réel du formulaire (pas de backend ici)
        event.preventDefault();

        let formulaireValide = true;

        // Champs à vérifier
        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const participation = document.getElementById("participation");
        const country = document.getElementById("country");
        const message = document.getElementById("message");

        // Fonction réutilisable pour afficher une erreur
        function afficherErreur(champ, idErreur, texteErreur) {
            champ.classList.add("invalid");
            champ.classList.remove("valid");
            document.getElementById(idErreur).textContent = texteErreur;
            formulaireValide = false;
        }

        // Fonction réutilisable pour valider un champ
        function validerChamp(champ, idErreur) {
            champ.classList.add("valid");
            champ.classList.remove("invalid");
            document.getElementById(idErreur).textContent = "";
        }

        // Validation du nom (non vide)
        if (nom.value.trim() === "") {
            afficherErreur(nom, "error-nom", "Le nom complet est requis.");
        } else {
            validerChamp(nom, "error-nom");
        }

        // Validation de l'email (regex simple)
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value.trim())) {
            afficherErreur(email, "error-email", "Adresse e-mail invalide.");
        } else {
            validerChamp(email, "error-email");
        }

        // Validation du téléphone (minimum 8 chiffres)
        const chiffresPhone = phone.value.replace(/\D/g, "");
        if (chiffresPhone.length < 8) {
            afficherErreur(phone, "error-phone", "Le téléphone doit contenir au moins 8 chiffres.");
        } else {
            validerChamp(phone, "error-phone");
        }

        // Validation du type de participation
        if (participation.value === "") {
            afficherErreur(participation, "error-participation", "Veuillez choisir un type de participation.");
        } else {
            validerChamp(participation, "error-participation");
        }

        // Validation du pays
        if (country.value === "") {
            afficherErreur(country, "error-country", "Veuillez choisir un pays.");
        } else {
            validerChamp(country, "error-country");
        }

        // Validation du message (minimum 20 caractères)
        if (message.value.trim().length < 20) {
            afficherErreur(message, "error-message", "Le message doit contenir au moins 20 caractères.");
        } else {
            validerChamp(message, "error-message");
        }

        // Si tout est valide : afficher le succès et réinitialiser
        if (formulaireValide) {
            const succes = document.getElementById("successMessage");
            succes.textContent = "Votre inscription a bien été envoyée !";
            succes.classList.add("show");
            formulaire.reset();

            // Retire aussi les classes valid après reset
            [nom, email, phone, participation, country, message].forEach(function (champ) {
                champ.classList.remove("valid");
            });
        }

    });

}