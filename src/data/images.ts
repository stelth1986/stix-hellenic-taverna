/**
 * Registry of every photo on the site that the admin panel can replace.
 * `fallback` is the bundled photo used until an override is set.
 */
export const IMAGE_SLOTS = [
  {
    key: "homePoster",
    label: "Video fallback image",
    page: "Home",
    fallback: "./images/hero-flatlay.jpg",
  },
  {
    key: "homeIntro",
    label: "Photo beside the intro text",
    page: "Home",
    fallback: "./images/jim-elvis.webp",
  },
  {
    key: "menuLunch",
    label: "Lunch menu card",
    page: "Home",
    fallback: "./images/souvla-wrap-fix.jpg",
  },
  {
    key: "menuDinner",
    label: "Dinner menu card",
    page: "Home",
    fallback: "./images/dinner-menu.jpg",
  },
  {
    key: "menuBeverage",
    label: "Beverage menu card",
    page: "Home",
    fallback: "./images/wine-bar.jpg",
  },
  {
    key: "bouzouki",
    label: "Bouzouki night photo",
    page: "Home",
    fallback: "./images/greek-flag-wall.jpg",
  },
  {
    key: "heroLocation",
    label: "Page banner",
    page: "Location",
    fallback: "./images/location-hero.jpg",
  },
  {
    key: "heroMenu",
    label: "Page banner",
    page: "Our Menu",
    fallback: "./images/menu-hero.jpg",
  },
  {
    key: "heroFunctions",
    label: "Page banner",
    page: "Functions",
    fallback: "./images/functions-hero.jpg",
  },
  {
    key: "functionsEvent",
    label: "Photo beside the intro text",
    page: "Functions",
    fallback: "./images/functions-event.jpg",
  },
  {
    key: "heroGallery",
    label: "Page banner",
    page: "Gallery",
    fallback: "./images/hero-flatlay.jpg",
  },
  {
    key: "heroChristmas",
    label: "Christmas page banner",
    page: "Christmas",
    fallback: "./images/functions-hero.jpg",
  },
  {
    key: "christmasStaff",
    label: "Christmas staff photo",
    page: "Christmas",
    fallback: "./images/jim-elvis-christmas.webp",
  },
  {
    key: "heroContact",
    label: "Page banner",
    page: "Contact",
    fallback: "./images/dinner-menu.jpg",
  },
];
