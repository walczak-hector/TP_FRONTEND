document.addEventListener("DOMContentLoaded", () => {
  const characterList = document.getElementById("characterList");
  function isTokenExpired(expirationTime) {
    if (!expirationTime) {
      return true;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= expirationTime;
  }

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

    let token = localStorage.getItem("key");


    if (isTokenExpired(parseInt(expirationTime, 10))) {
      alert("No se ha iniciado sesión");
        window.location.href = "login.html";
    
    } else {
      const headers = {
        "Content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      };

      const options = {
        method: "POST",
        headers,
        data: characterData,
      };

      const createResponse = await axios.post("http://localhost:80/dashboard/", characterData, { headers });
      const json = createResponse.data;

      location.reload();
    }
  };

  document.getElementById("saveButton").addEventListener("click", save);
});
