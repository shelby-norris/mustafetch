class Character {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
    renderCard() {
        
    }
}


// Retrieve API data
async function fetchCharacters() {
  try {
    const response = await fetch(`https://starwars-databank-server.vercel.app/api/v1/characters`);
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
