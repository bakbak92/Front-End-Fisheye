export function sortAndDisplayMedia(criteria) {

    // Ajout d'une div mediaFiltre
    const mediaFiltre = document.createElement("div");
    mediaFiltre.classList.add("media-filtre");
    main.appendChild(mediaFiltre);

    // Ajout du label
    const label = document.createElement("label");
    label.setAttribute("for", "mySelect");
    label.textContent = "Trier par ";
    label.classList.add("labelSelect")

    // Ajout du select
    const select = document.createElement("select");
    select.setAttribute("id", "mySelect");

    // Création des options dans un tableau
    const options = [
        {text: "Popularité", value: "popularity"},
        {text: "Date", value: "date"},
        {text: "Titre", value: "title"}
    ];

    // Ajout des options au select
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option.text;
        optionElement.value = option.value;
        select.appendChild(optionElement);
    });

    // Ajout du label et du select au conteneur mediaFiltre
    mediaFiltre.appendChild(label);
    mediaFiltre.appendChild(select);



    // Ajout de l'écouteur d'événement pour détecter les changements de sélection
    select.addEventListener("change", () => {
    const selectedValue = select.value;
    sortAndDisplayMedia(selectedValue);
    });

    let mediaData = [];

    let sortedData;
  
    // Utilisation d'un switch pour déterminer le critère de tri
    switch (criteria) {
      case "popularity":  //(nombre de likes décroissant)
  
        // Crée une copie du tableau mediaData pour éviter de modifier l'original
        sortedData = [...mediaData].sort((a, b) => b.likes - a.likes);
        break;
      case "date" :  //(du plus récent au plus ancien)
        sortedData = [...mediaData].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "title" :  //(ordre alphabétique)
        sortedData = [...mediaData].sort((a, b) => {
  
          // Vérifie que a.title et b.title sont des chaînes de caractères
          if (typeof a.title === 'string' && typeof b.title === 'string') {
            return a.title.localeCompare(b.title);
          }
          // Si l'un des titres n'est pas une chaîne, retourne 0 (pas de changement d'ordre)
          return 0;
        });
        break;
      default :  // Utilise les données originales si le critère ne correspond à rien
      sortedData = mediaData;
    }
    // Affiche les médias triés
    displayMedia(sortedData);
}

export function displayMedia(data) {

    // Vide la div avant d'afficher les medias triés
    document.querySelector(".media").innerHTML = "";

    console.log(data);
  
    // Parcourt chaque élément du tableau de données
    data.forEach((mediaItem, index) => {
      manageMedia(mediaItem, index)
    })
}