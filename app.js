const state = {
  currentPage: 1,
  currentName: "",
};

// Retrieve API data via Search
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
  // characterContainer.className =

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    // characterElement.className =

    const imageElement = document.createElement("img");
    imageElement.src = character.image;
    imageElement.alt = character.name;
    // imageElement.className =

    const nameElement = document.createElement("h2");
    nameElement.innerHTML = character.name?.[0] || "Character not found";
    // nameElement.className =

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = character.description;

    characterElement.appendChild(imageElement);
    characterElement.appendChild(nameElement);
    characterElement.appendChild(descriptionElement);

    characterContainer.appendChild(characterElement);
  });
}

// // Pagination Logic ****** MAY NOT NEED ******
// function renderPagination(numFound) {
//   const totalPages = Math.ceil(numFound / 10);

//   const paginationContainer = document.getElementById("pagination-container");
//   paginationContainer.innerHTML = "";

//   const prevBtn = document.createElement("button");
//   prevBtn.textContent = "Previous";
//   // prevBtn.className =
//   prevBtn.disabled = state.currentPage === 1;
//   prevBtn.onclick = async () => {
//     state.currentPage--; // decrease the page number
//     const data = await searchCharacterName(
//       state.currentName,
//       state.currentPage
//     );

//     renderCharacters(characters);
//     renderPagination(data.numFound);
//   };

//   const nextBtn = document.createElement("button");
//   nextBtn.textContent = "Next";
//   // nextBtn.className =
//   nextBtn.disabled = state.currentPage === totalPages;
//   nextBtn.onclick = async () => {
//     state.currentPage++; // increase page number
//     const date = await searchCharacterName(
//       state.currentName,
//       state.currentPage
//     );

//     renderCharacters(characters);
//     renderPagination(data.numFound);
//   };

//   const pageCountElem = document.createElement("p");
//   pageCountElem.innerHTML = `Page ${state.currentPage} of ${totalPages}`;

//   paginationContainer.appendChild(prevBtn);
//   paginationContainer.appendChild(pageCountElem);
//   paginationContainer.appendChild(nextBtn);
// }

// Loading GIF
function renderLoading() {
  const characterContainer = document.getElementById("character-container");
  characterContainer.innerHTML = "";

  const loadingGif = document.createElement("img");
  loadingGif.src =
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXplMGZsb3hjdHpsMHkxdDlpbzV5ZGl2Y2w1Nm5sNmFuMWs5ZnF5NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/35KomAE3Mj421dSv1r/giphy.gif";

  loadingGif.width = "300";

  characterContainer.appendChild(loadingGif);
}

async function handleCharacterSearch(event) {
  event.preventDefault();

  const name = event.target["search-name"].value;
  console.log(name);

  const data = await searchCharacterName(name);

  renderCharacters(data);

  renderPagination(data.numFound);

  // Set Timeout so everyone can see the super cool loading Gif
}
