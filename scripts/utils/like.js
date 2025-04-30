export function updateTotalLikes() {
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

export function handleLike(mediaCard, index) {
    const fullHeart = mediaCard.querySelector(".fa-heart");
    const likesText = mediaCard.querySelector(".media-likes span");
    let isClicked = false;
    fullHeart.addEventListener("click", () => {
        if (!isClicked) {
        // Récupère la valeur actuelle
        let currentLikes = parseInt(likesText.textContent, 10); 

        // Incrémente
        currentLikes++;

        // Met à jour l'affichage
        likesText.textContent = currentLikes;

        // Met à jour le total général
        updateTotalLikes();
        isClicked = true;
        }
    });
    fullHeart.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (!isClicked) {
                // Récupère la valeur actuelle
                let currentLikes = parseInt(likesText.textContent, 10); 
        
                // Incrémente
                currentLikes++;
        
                // Met à jour l'affichage
                likesText.textContent = currentLikes;
        
                // Met à jour le total général
                updateTotalLikes();
                isClicked = true;
            }
        }
    });
}