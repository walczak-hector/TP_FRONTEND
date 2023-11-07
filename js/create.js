document.addEventListener("DOMContentLoaded", () => {
    const characterList = document.getElementById("characterList");
  
    const save = async () => {
      var avatar = document.getElementById("avatar").src;
      var upper = document.getElementById("blusa").src;
      var lower = document.getElementById("pants").src;
      var shoes = document.getElementById("shoes").src;
  
      var baseUrl = window.location.origin;
      avatar = avatar.replace(baseUrl, "");
      upper = upper.replace(baseUrl, "");
      lower = lower.replace(baseUrl, "");
      shoes = shoes.replace(baseUrl, "");
  
      const characterData = {
        avatar,
        upper,
        lower,
        shoes,
      };
  
      try {
        const loginResponse = await axios.post("http://localhost:80/auth/login", {
          email: "a", 
          password: "a",
        });
  
        const token = loginResponse.data.token;
  
        const headers = {
            "Content-type": "application/json; charset=utf-8",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ5NTJiNmFiZmU4MmYxMTAwODU3MTIiLCJuYW1lIjoiYiIsImVtYWlsIjoiYiIsImlhdCI6MTY5OTMxNDY5MCwiZXhwIjoxNjk5MzE4MjkwfQ.-UhdtjM2VC3_Joiu63zTyq2XIOVcx2ZgeGouLUQrj5M`, 
          };
    
          const options = {
            method: "POST",
            headers,
            data: characterData,
          };
  
        const createResponse = await axios.post("http://localhost:80/dashboard/", characterData, { headers });
        const json = createResponse.data;
  
        location.reload();
      } catch (error) {
        const message = error.statusText || "Ocurrió un error";
        console.error("Error al crear el personaje:", error);
      }
    };
  
    document.getElementById("saveButton").addEventListener("click", save);
  });
  