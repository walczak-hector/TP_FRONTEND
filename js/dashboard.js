document.addEventListener("DOMContentLoaded", () => {
    const characterList = document.getElementById("characterList");

    // Función para cargar los personajes
    const loadCharacters = () => {
        const token = localStorage.getItem("key"); // Obtén el token almacenado en localStorage
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }

        var decodedToken = parseJwt(token);
        const user_id = decodedToken.userId;
        axios.get(`http://localhost:80/dashboard/${user_id}`)
            .then(response => {
                const characters = response.data;
                characterList.innerHTML = "";

                characters.forEach(character => {
                    let characterContainer = document.createElement("div");
                    characterContainer.className = "character-container";

                    // Crear un elemento de imagen por cada personaje
                    let characterImage1 = document.createElement("img");
                    characterImage1.src = character.avatar;
                    characterImage1.alt = character.avatar;
                    characterImage1.className = "character";

                    let characterImage2 = document.createElement("img");
                    characterImage2.src = character.upper;
                    characterImage2.alt = character.upper;
                    characterImage2.id = "blusa";
                    characterImage2.className = "clothing";

                    let characterImage3 = document.createElement("img");
                    characterImage3.src = character.lower;
                    characterImage3.alt = character.lower;
                    characterImage3.id = "pants";
                    characterImage3.className = "clothing";

                    let characterImage4 = document.createElement("img");
                    characterImage4.src = character.shoes;
                    characterImage4.alt = character.shoes;
                    characterImage4.id = "shoes";
                    characterImage4.className = "clothing";


                    let deleteButton = document.createElement("button");
                    deleteButton.innerText = "Eliminar";
                    deleteButton.className = "eliminar";
                    deleteButton.dataset.characterId = character.id;
                    deleteButton.addEventListener("click", () => {
                        const characterId = deleteButton.dataset.characterId;
                        deleteCharacter(characterId);
                    });

                    characterContainer.appendChild(characterImage1);
                    characterContainer.appendChild(characterImage2);
                    characterContainer.appendChild(characterImage3);
                    characterContainer.appendChild(characterImage4);
                    characterContainer.appendChild(deleteButton);
                    characterList.appendChild(characterContainer);
                });
            })
            .catch(error => {
                console.error("Error al obtener los personajes:", error);
                setTimeout(loadCharacters, 2000);
            });
    };

    const deleteCharacter = (characterId) => {
        axios.delete(`http://localhost:80/dashboard/${characterId}`)
            .then(response => {
                loadCharacters();
            })
            .catch(error => {
                console.error("Error al eliminar el personaje:", error);
            });
    };

    loadCharacters();
});
