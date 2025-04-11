import {photographerTemplate} from  "../templates/photographer.js";
import {mediaTemplate} from  "../templates/media.js";
import {exportForm, displayModal, closeModal} from "../utils/contactForm.js";
import {sortAndDisplayMedia, displayMedia} from "../utils/sortMedia.js";


function getPhotographersId() {
  // Récupère la partie query de l'url (tout ce qui se trouve après le ?)
  const params = new URLSearchParams(window.location.search);

  // Récupère la valeur du paramètre "id" et la retourne.
  return params.get("id");
}

const photographerId = getPhotographersId();

let mediaData = [];

export async function getPhotographerData(photographerId) {
  try {
    // Récupère les informations du photographe et ses médias associés
    const response = await fetch("../../data/photographers.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Status: ${response.status}`);
    }
    const data = await response.json();

    // Trouve le photographe par ID
    const photographer = data.photographers.find(
      (photographer) => photographer.id == photographerId
    );

    // Filtre les médias associés au photographe
    const media = data.media.filter(
      (item) => item.photographerId == photographerId
    );

    mediaData = media;

    console.log("Médias filtrés :", media);

    return {
      photographer,
      media,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Sélectionne le body & main
const body = document.querySelector("body");
const main = document.querySelector("main");

// Ajout de d'une div pour le prix et le conteur de like
const priceCounterLikeDiv = document.createElement("div");
priceCounterLikeDiv.classList.add("price_counter_like_div");
body.appendChild(priceCounterLikeDiv);

const counterLikeDiv = document.createElement("div");
counterLikeDiv.classList.add("counter_like_div");
priceCounterLikeDiv.appendChild(counterLikeDiv);


// // Ajout d'une div mediaFiltre
// const mediaFiltre = document.createElement("div");
// mediaFiltre.classList.add("media-filtre");
// main.appendChild(mediaFiltre);

// // Ajout du label
// const label = document.createElement("label");
// label.setAttribute("for", "mySelect");
// label.textContent = "Trier par ";
// label.classList.add("labelSelect")

// // Ajout du select
// const select = document.createElement("select");
// select.setAttribute("id", "mySelect");

// // Création des options dans un tableau
// const options = [
//     {text: "Popularité", value: "popularity"},
//     {text: "Date", value: "date"},
//     {text: "Titre", value: "title"}
// ];

// // Ajout des options au select
// options.forEach(option => {
//     const optionElement = document.createElement("option");
//     optionElement.textContent = option.text;
//     optionElement.value = option.value;
//     select.appendChild(optionElement);
// });

// // Ajout du label et du select au conteneur mediaFiltre
// mediaFiltre.appendChild(label);
// mediaFiltre.appendChild(select);



// // Ajout de l'écouteur d'événement pour détecter les changements de sélection
// select.addEventListener("change", () => {
//   const selectedValue = select.value;
//   sortAndDisplayMedia(selectedValue);
// });


// Ajout d'une div media
const media = document.createElement("div");
media.classList.add("media");
main.appendChild(media);


// Ajout de la div lightboxModal
const lightboxModal = document.createElement("div");
lightboxModal.classList.add("lightbox-modal");
body.appendChild(lightboxModal);

// Ajout de la div modalContainer
const modalContainer = document.createElement("div");
modalContainer.classList.add("modalContainer");
lightboxModal.appendChild(modalContainer);


// Ajout de la div navigationLeft
const navigationLeft = document.createElement("div");
navigationLeft.classList.add("navigation-left");
modalContainer.appendChild(navigationLeft);


// Création de l'élément multimédia
const lightboxMedia = document.createElement("div");
lightboxMedia.id = "lightboxMedia";
modalContainer.appendChild(lightboxMedia);

// Ajout de la div navigationRight
const navigationRight = document.createElement("div");
navigationRight.classList.add("navigation-right");
modalContainer.appendChild(navigationRight);

// Création des icônes de chevron
const chevronLeft = document.createElement("i");
chevronLeft.classList.add("fa-solid", "fa-chevron-left");
chevronLeft.id = "chevronLeft";
navigationLeft.appendChild(chevronLeft);

const chevronRight = document.createElement("i");
chevronRight.classList.add("fa-solid", "fa-chevron-right");
chevronRight.id = "chevronRight"
navigationRight.appendChild(chevronRight);

// Création de l'icône croix 
const cross = document.createElement("i");
cross.classList.add("fa-solid", "fa-xmark");
cross.id ="cross"
navigationRight.appendChild(cross);

// Création de la légende lightboxCaption
const lightboxCaption = document.createElement("div");
lightboxCaption.id = "lightboxCaption";
lightboxCaption.classList.add("caption");
lightboxMedia.appendChild(lightboxCaption);




// Récupère la promesse retournée par la fonction getPhotographerData
getPhotographerData(photographerId).then((PhotographerData) => {
  if (PhotographerData && PhotographerData.photographer) {
    const photographerCard = photographerTemplate(
      PhotographerData.photographer
    ).getUserCardDOM();


    const parentElement = document.querySelector(".photograph-header");

    // Sélectionne la balise <a>
    const link = photographerCard.querySelector(".photographer-link");
    if (link) {
      // Déplace les enfants de <a> vers le parent de <a>
      while (link.firstChild) {
        link.parentNode.insertBefore(link.firstChild, link);
      }

      // Supprime la balise <a> qui est maintenant vide
      link.remove();
    }

    // Insère img dans photographer-header
    const img = photographerCard.querySelector(".photographer-img");
    parentElement.appendChild(img);

    // Insère à nouveau button dans photographer-header de manière à le déplacer dans l'ordre du DOM
    const button = document.querySelector(".contact_button");
    parentElement.appendChild(button);

    // Sélectionne et insère price dans la div priceCounterLikeDiv
    const price = photographerCard.querySelector(".price");
    priceCounterLikeDiv.appendChild(price);

    parentElement.appendChild(photographerCard);

    // Afiche les médias associés au photographe
    if (PhotographerData.media) {
      PhotographerData.media.forEach((mediaItem, index) => {
        manageMedia(mediaItem, index)

      });
    }
  }
});


// function sortAndDisplayMedia(criteria) {
//   let sortedData;

//   // Utilisation d'un switch pour déterminer le critère de tri
//   switch (criteria) {
//     case "popularity":  //(nombre de likes décroissant)

//       // Crée une copie du tableau mediaData pour éviter de modifier l'original
//       sortedData = [...mediaData].sort((a, b) => b.likes - a.likes);
//       break;
//     case "date" :  //(du plus récent au plus ancien)
//       sortedData = [...mediaData].sort((a, b) => new Date(b.date) - new Date(a.date));
//       break;
//     case "title" :  //(ordre alphabétique)
//       sortedData = [...mediaData].sort((a, b) => {

//         // Vérifie que a.title et b.title sont des chaînes de caractères
//         if (typeof a.title === 'string' && typeof b.title === 'string') {
//           return a.title.localeCompare(b.title);
//         }
//         // Si l'un des titres n'est pas une chaîne, retourne 0 (pas de changement d'ordre)
//         return 0;
//       });
//       break;
//     default :  // Utilise les données originales si le critère ne correspond à rien
//     sortedData = mediaData;
//   }
//   // Affiche les médias triés
//   displayMedia(sortedData);
// }

function displayMedia(data) {

  // Vide la div avant d'afficher les medias triés
  media.innerHTML = "";

  // Parcourt chaque élément du tableau de données
  data.forEach((mediaItem, index) => {
    manageMedia(mediaItem, index)
  })
}

function manageMedia(mediaItem, index) {
  const mediaCard = mediaTemplate(mediaItem).getMediaCardDOM(index);
  const mediaContainer = document.querySelector(".media");
  mediaContainer.appendChild(mediaCard);

  const fullHeart = mediaCard.querySelector(".fa-heart");
  const likesText = mediaCard.querySelector(".media-likes span");

  fullHeart.addEventListener("click", () => {

    // Récupère la valeur actuelle
    let currentLikes = parseInt(likesText.textContent, 10); 

    // Incrémente
    currentLikes++;

    // Met à jour l'affichage
    likesText.textContent = currentLikes;

    // Met à jour le total général
    updateTotalLikes();
  });


  function updateTotalLikes() {
    const likeElements = document.querySelectorAll(".media-likes span");
    let totalLikes = 0;
  
    likeElements.forEach(likeElement => {
      totalLikes += parseInt(likeElement.textContent, 10);
    });
  
    // Sélectionne la div où afficher le total des likes
    const counterLikeDiv = document.querySelector(".counter_like_div");
  
    if (counterLikeDiv) {
      // Réinitialiser le contenu de la div avant de l'actualiser
      counterLikeDiv.innerHTML = "";
  
      // Créer un span pour afficher le total des likes
      const totalLikesText = document.createElement("span");
      totalLikesText.id = "total_like";
      totalLikesText.textContent = `${totalLikes} likes`; 
  
      //Créer l'icône cœur (fullHeart)
      const fullHeart = document.createElement("i");
      fullHeart.classList.add("fa-solid", "fa-heart");
      fullHeart.id ="backFullHeart"
     
  
      // Ajouter le texte et l'icône à la div
      counterLikeDiv.appendChild(totalLikesText);
      counterLikeDiv.appendChild(fullHeart);
    } else {
      console.error("counterLikeDiv introuvable !");
    }
  
    return totalLikes; // Retourne le total des likes
  }
  
  // Appeler la fonction une première fois pour afficher les likes dès le départ
  updateTotalLikes();



  // Initialise l'index sur 0
  let currentIndex = 0;

  // Récupère les images et les vidéos
  const mediaElements = document.querySelectorAll(".media-img, .media-video");

  // Ajout d'un écouteur d'événements à chaque images
  mediaElements.forEach(media => {
    media.addEventListener("click", openLightbox);
  });

  // Ajout d'un écouter d'évènements
  cross.addEventListener("click", closeLightbox);

  // Ajout d'écouteurs d'événements pour les chevrons
  chevronLeft.addEventListener("click", navigateLightbox);
  chevronRight.addEventListener("click", navigateLightbox);

  function updateLightboxMedia(mediaElement) {
    lightboxMedia.innerHTML = ""; // Supprime l'ancien média

    let newContent;
    if (mediaElement.tagName === "IMG") {
      newContent = `<img src="${mediaElement.src}" alt="${mediaElement.alt}" class="lightbox-img">`;
    } else if (mediaElement.tagName === "VIDEO") {
      const videoAlt = mediaElement.getAttribute('data-alt'); // Récupère l'attribut data-al
      newContent = `<video src="${mediaElement.src}" controls class="lightbox-video" data-alt="${videoAlt}"></video>`;
    }
    lightboxMedia.innerHTML = newContent;
    lightboxMedia.appendChild(lightboxCaption);

    // Mettre à jour la légende avec la valeur appropriée
    if (mediaElement.tagName === "IMG") {
      lightboxCaption.innerText = mediaElement.alt;
    } else if (mediaElement.tagName === "VIDEO") {
      lightboxCaption.innerText = mediaElement.getAttribute('data-alt');
    }

  }

  function openLightbox(event) {
    const clickedMedia = event.target;
    currentIndex = parseInt(clickedMedia.getAttribute("data-index"));

    updateLightboxMedia(clickedMedia);
    lightboxModal.style.display = "flex";
  }

  function navigateLightbox(event) {
    const isLeft = event.target.id === "chevronLeft";
    currentIndex = isLeft ? currentIndex - 1 : currentIndex + 1;

    // Vérifie les limites
    if (currentIndex < 0) currentIndex = mediaElements.length - 1;
    if (currentIndex >= mediaElements.length) currentIndex = 0;

    updateLightboxMedia(mediaElements[currentIndex]);
  }

  function closeLightbox() {
    lightboxModal.style.display = "none";
  }
}


// Ajout d'un écouteur d'évènement pour remplacer onclick
const openModalButton = document.querySelector('.contact_button');
openModalButton.addEventListener('click', displayModal);

// Ajout d'un écouteur d'évènement pour remplacer onclick
const closeButton = document.querySelector('.close_button');
closeButton.addEventListener('click', closeModal);

// Appel de la fonction exportForm
exportForm();

sortAndDisplayMedia();
displayMedia();