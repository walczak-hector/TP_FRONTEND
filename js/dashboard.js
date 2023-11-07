
document.addEventListener("DOMContentLoaded", () => {
    const characterList = document.getElementById("characterList");

    // Función para cargar los personajes
    const loadCharacters = () => {
        const token = "eyhbGciOiJIUzI1NeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ5NTJiNmFiZmU4MmYxMTAwODU3MTIiLCJuYW1lIjoiYiIsImVtYWlsIjoiYiIsImlhdCI6MTY5OTMxNDY5MCwiZXhwIjoxNjk5MzE4MjkwfQ.-UhdtjM2VC3_Joiu63zTyq2XIOVcx2ZgeGouLUQrj5MiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTEwYzMwZTk3NGI0YzcwMzA0Y2EyZjQiLCJuYW1lIjoidGVzdF9uYW1lIiwiZW1haWwiOiJhIiwiaWF0IjoxNjk5MzA3NjE2LCJleHAiOjE2OTkzMTEyMTZ9.1Y7T0JGhFrWURlwZsRrbIwkMQ5CyqXqMQ0PDIatbwDU"; // Obtén el token almacenado en localStorage

        function parseJwt (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            }

            var decodedToken = parseJwt(token);
            const user_id = decodedToken.userId;
            console.log(user_id);
        axios.get(`http://localhost:80/dashboard/${user_id}`)
                .then(response => {
                const characters = response.data;
                characterList.innerHTML = ""; // Limpia la lista de personajes antes de agregar los nuevos

                characters.forEach(character => {
                    const characterContainer = document.createElement("div");
                characterContainer.className = "character-container";

                // Crear un elemento de imagen por cada personaje
                const characterImage1 = document.createElement("img");
                characterImage1.src = character.avatar;
                characterImage1.alt = character.avatar;
                characterImage1.className = "clothing";

                const characterImage2 = document.createElement("img");
                characterImage2.src = character.upper;
                characterImage2.alt = character.upper;
                characterImage2.id = "blusa";
                characterImage2.className = "clothing";

                const characterImage3 = document.createElement("img");
                characterImage3.src = character.lower;
                characterImage3.alt = character.lower;
                characterImage3.id = "pants";
                characterImage3.className = "clothing";

                const characterImage4 = document.createElement("img");
                characterImage4.src = character.shoes;
                characterImage4.alt = character.shoes;
                characterImage4.id = "shoes";
                characterImage4.className = "clothing";


/*                    const deleteButton = document.createElement("button");
                    deleteButton.innerText = "Eliminar";
                    deleteButton.dataset.characterId = character._id;

                    deleteButton.style.position = "absolute";  
                    deleteButton.style.zIndex = "1"; 
                    deleteButton.addEventListener("click", () => {
                        const characterId = deleteButton.dataset.characterId;
                        deleteCharacter(characterId);
                    });*/

                    characterContainer.appendChild(characterImage1);
                    characterContainer.appendChild(characterImage2);
                    characterContainer.appendChild(characterImage3);
                    characterContainer.appendChild(characterImage4);
                    //characterContainer.appendChild(deleteButton);

                    characterList.appendChild(characterContainer);
                });
            })
            .catch(error => {
                console.error("Error al obtener los personajes:", error);
                setTimeout(loadCharacters, 2000); 
            });
    };
/*
    const deleteCharacter = (characterId) => {
        axios.delete(`http://localhost:80/dashboard/${characterId}`)
            .then(response => {
                loadCharacters();
            })
            .catch(error => {
                console.error("Error al eliminar el personaje:", error);
            });
    };*/

    loadCharacters();
});