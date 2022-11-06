// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';
// Change code below this line

const imageBoxRef = document.querySelector(".gallery");
imageBoxRef.style.listStyleType = "none";

const imageElements = galleryItems.map(
  ({ preview, original, description }) =>
    `<li class="gallery__item"><a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}"
    alt="${description}" /></a></li>`
);

imageBoxRef.insertAdjacentHTML("beforeend", imageElements.join(""));

// Added the functional from SimpleLightbox's library

let gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  captionPosition: "bottom",
});

const bodyRef = document.querySelector("body");

gallery.on("shown.simplelightbox", function () {
  bodyRef.style.backgroundColor = getRandomHexColor();  
});

gallery.on("changed.simplelightbox", function () {
  bodyRef.style.backgroundColor = getRandomHexColor();
});

gallery.on("close.simplelightbox", function () {
  bodyRef.style.backgroundColor = "#ffffff";
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}