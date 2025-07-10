const state = {
  currentPage: 1,
  currentName: "",
};

// Search Characters
async function searchCharacterName(name) {
  state.currentName = name;

  try {
    renderLoading();
    const response = await fetch(
      `https://starwars-databank-server.vercel.app/api/v1/characters/name/${name}`
    );
    if (!response.ok) {
      throw new Error("Network Error ", response.status);
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("ERROR ", error.message);
  } finally {
    console.log("Finished getting characters");
  }
}

// Display characters on page
function renderCharacters(characters) {
  const characterContainer = document.getElementById("character-container");
  characterContainer.innerHTML = "";

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.className =
      "max-w-xl bg-slate-100 border-2 border-amber-500 shadow-xl rounded-lg items-center m-6";

    const imageElement = document.createElement("img");
    imageElement.src = character.image;
    imageElement.alt = character.name;
    imageElement.className = "rounded-t-lg";

    const nameElement = document.createElement("h2");
    nameElement.innerHTML = character.name;
    nameElement.className =
      "text-2xl lg:text-3xl text-center text-shadow-sm font-bold py-3";

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = character.description;
    descriptionElement.className = "px-2 pb-3";

    characterElement.appendChild(imageElement);
    characterElement.appendChild(nameElement);
    characterElement.appendChild(descriptionElement);

    characterContainer.appendChild(characterElement);
  });
}

// Loading GIF
function renderLoading() {
  const characterContainer = document.getElementById("character-container");
  characterContainer.innerHTML = "";

  const loadingGif = document.createElement("img");
  loadingGif.src =
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXplMGZsb3hjdHpsMHkxdDlpbzV5ZGl2Y2w1Nm5sNmFuMWs5ZnF5NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/35KomAE3Mj421dSv1r/giphy.gif";

  loadingGif.classList = "mb-10";

  loadingGif.width = "300";

  characterContainer.appendChild(loadingGif);
}

async function handleCharacterSearch(event) {
  event.preventDefault();
  characterAutoScroll();
  const name = event.target["search-name"].value;
  console.log(name);
  renderLoading();
  const data = await searchCharacterName(name);
  setTimeout(() => {
    renderCharacters(data);
  }, 4000); // Set Timeout so everyone can see the super cool loading Gif

  // if data is 0 render user search and no characters found
  if (!data || data.length === 0) {
    const characterContainer = document.getElementById("character-container");
    characterContainer.innerHTML = "";

    const noResults = document.createElement("p");
    noResults.innerHTML = `No Results Found for ${name}`;

    characterContainer.appendChild(noResults);
  }
}

// Automatically scroll to character container when search is clicked
function characterAutoScroll() {
  const characterContainer = document.getElementById("character-container");

  characterContainer.scrollIntoView({ behavior: "smooth" });
}
