// je souhaite que l'utilisateur soit stocker
let userData = [];

// Function qui va chercher les utilisateurs
const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    // je passe valeur de droit a celle de gauche
    .then((data) => (userData = data.results));
  // pour voir le resulat faire un log directement dans la console
  // faire une async await pour etre asyncrhone

  console.log(userData);
  userDisplay();
};

fetchUser();

// function d'affichage
const userDisplay = () => {
  userData.length = 6;
  // tant que la functino fetchUser n'a pas commencé il ne fera pas ci-dessous

  // Cette fonction "dateParser" prend une date en entrée,
  // la convertit au format "jour mois année" en français (ex : "5 octobre 2024"),
  // et retourne cette date formatée.

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    // la date du jours
    let today = new Date();
    // "Parse" sert à analyser et convertir des données en un format plus utilisable ou lisible.
    let todayTimestamp = Date.parse(today);
    // ensuite je mets la date en forma timestamp qui etait de base en iso
    let timestamp = Date.parse(date);
    // ensuite j'obtien la diferrence
    //j'arrondis avec Math.ceil la valeur au dessus
    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
  };

  // en parametre je dis comment s'appelle chaque tour de map
  document.body.innerHTML = userData
    .map(
      (user) => `
    <div class="card">
    <img src=${user.picture.large} 
    alt="photo de ${user.name.last}"
    <h3>${user.name.first}</h3>
    <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
    <em>Membre depuis : ${dayCalc(user.registered.date)} jours </em>
    </div>
  `
    )
    .join("");
};
