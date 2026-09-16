const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const errorMessage = document.getElementById("errorMessage");

        try {

            const response = await fetch("/login", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {

                // Login successful
                sessionStorage.setItem("loggedIn", "true");

                window.location.href = "dashboard.html";

            } else {

                errorMessage.textContent = data.message;

            }

        } catch (error) {

            console.error(error);

            errorMessage.textContent =
                "Something went wrong. Please try again.";

        }

    });
}