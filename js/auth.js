document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Enviar la solicitud de inicio de sesión al servidor
        try {
            const response = await axios.post("http://localhost:80/auth/login/", { email, password });
            // Manejar la respuesta del servidor
            if (response.status === 200) {
                // Inicio de sesión exitoso
                const token = response.data;

                // Almacena el token en el almacenamiento local (localStorage)
                window.localStorage.setItem("key", token);
                console.log(response.data);
                // Redirige a la página del panel de control o a donde desees
                window.location.href = "dashboard.html";
            }
        } catch (error) {
            // Manejar errores de inicio de sesión (puedes mostrar un mensaje de error)
            console.error("Error de inicio de sesión:", error);
        }
    });

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const registerEmail = document.getElementById("registerEmail").value;
        const registerPassword = document.getElementById("registerPassword").value;

        // Enviar la solicitud de registro al servidor
        try {
            const response = await axios.post("http://localhost:80/register", {
                name,
                email: registerEmail,
                password: registerPassword,
                isActive: true, // Puedes establecer el valor que desees
            });

            // Manejar la respuesta del servidor
            if (response.status === 201) {
                // Registro exitoso
                alert("Registro exitoso. Por favor, inicia sesión.");
                // Puedes redirigir a la página de inicio de sesión o mostrar un mensaje de éxito
            }
        } catch (error) {
            // Manejar errores de registro (puedes mostrar un mensaje de error)
            console.error("Error de registro:", error);
        }
    });
});
