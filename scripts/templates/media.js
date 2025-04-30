export function mediaTemplate(data) {
  const { id, photographerId, title, image, video, likes: initialLikes, date, price } = data;

  let mediaElement;

  if (image) {
    mediaElement = `assets/albums/${photographerId}/${image}`;
  } else if (video) {
    mediaElement = `assets/albums/${photographerId}/${video}`;
  } else {
    console.error("Aucun média (image ou vidéo) trouvé pour", title);
    return;
  }

  function getMediaCardDOM(index) {
    const article = document.createElement("article");
    article.classList.add("media-article");

    // Créer l'élément multimédia image ou vidéo

    if (image) {
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", mediaElement);
    imageElement.setAttribute("alt", `${title}`)
    imageElement.setAttribute("data-index", index);
    imageElement.classList.add("media-img");
    imageElement.setAttribute("tabindex", 0);
    article.appendChild(imageElement);
    } else if (video){
      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", mediaElement);
      videoElement.setAttribute("data-alt", `${title}`);
      videoElement.setAttribute("controls", "true");
      videoElement.setAttribute("data-index", index);
      videoElement.classList.add("media-video");
      videoElement.setAttribute("tabindex", 0);
      article.appendChild(videoElement);
    }

    const h2 = document.createElement("h2");
    h2.textContent = title;
    h2.classList.add("media-title");

    let currentLikes = initialLikes;
    const likesText = document.createElement("span");
    likesText.textContent = `${currentLikes}`;

    const p1 = document.createElement("p");
    p1.classList.add("media-likes");
    p1.appendChild(likesText);

    const p2 = document.createElement("p");
    p2.textContent = date;
    p2.classList.add("media-date");

    const p3 = document.createElement("p");
    p3.textContent = price;
    p3.classList.add("media-price");

    const fullHeart = document.createElement("i");
    fullHeart.classList.add("fa-solid", "fa-heart");
    fullHeart.setAttribute("tabindex", 0);
    p1.appendChild(fullHeart);

    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);

    return article;
  }
  return {id, photographerId, mediaElement, title, likes: initialLikes, date, price, getMediaCardDOM};
}



