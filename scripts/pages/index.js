import {photographerTemplate} from  "../templates/photographer.js";

async function getPhotographers() {
  try {
    // Envoie une requête HTTP pour récupérer le fichier JSON.
    const response = await fetch("../../data/photographers.json");

    // Vérifie si la requête a réussi
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Status: ${response.status}`);
    }

    // Analyse et transforme la réponse JSON en objet JavaScript
    const data = await response.json();

    // Vérifie que les données récupérées contiennent bien la clé "photographers"
    // et que cette clé est associée à un tableau.
    if (!data.photographers || !Array.isArray(data.photographers)) {
      throw new Error(
        "Les données récupérées ne contiennent pas un tableau de photographes."
      );
    }

    // Retourne les photographes récupérés
    return { photographers: data.photographers };
  } catch (error) {
    // Gestion des erreurs potentielles
    console.error("Erreur lors de la récupération des photographes:", error);
    return {
      photographers: [],
    };
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
