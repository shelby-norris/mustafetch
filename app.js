// class Character {
//     constructor(name, image) {
//         this.name = name;
//         this.image = image;
//     }
//     renderCard() {

//     }
// }

const state = {
  currentPage: 1,
  currentName: "",
  characterData: [],
};

// Retrieve API data
async function fetchCharacters(page) {
  try {
    const response = await fetch(
      `https://starwars-databank-server.vercel.app/api/v1/characters?_page=${page}&limit=10`
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

fetchCharacters();

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

// Pagination Logic
function renderPagination(numFound) {
  const totalPages = Math.ceil(numFound / 10);

  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  // prevBtn.className = 
  prevBtn.disabled = state.currentPage === 1;
  prevBtn.onclick = async () => {
    state.currentPage--; // decrease the page number
    const data = await 
  }
}
