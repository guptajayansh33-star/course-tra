const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const errorMessage = document.getElementById("errorMessage");
        const loginBtn = document.getElementById("loginBtn");
        const btnText = loginBtn.querySelector(".btn-text");
        const btnArrow = loginBtn.querySelector(".btn-arrow");
        const btnLoader = loginBtn.querySelector(".btn-loader");

        // Show loading state
        loginBtn.disabled = true;
        btnText.textContent = "Signing in...";
        if (btnArrow) btnArrow.style.display = "none";
        if (btnLoader) btnLoader.style.display = "flex";
        errorMessage.textContent = "";

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

                // Success animation
                btnText.textContent = "Welcome!";
                loginBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
                if (btnLoader) btnLoader.style.display = "none";

                setTimeout(function() {
                    window.location.href = "dashboard.html";
                }, 600);

            } else {

                // Reset button
                loginBtn.disabled = false;
                btnText.textContent = "Sign In";
                if (btnArrow) btnArrow.style.display = "flex";
                if (btnLoader) btnLoader.style.display = "none";
                loginBtn.style.background = "";

                errorMessage.textContent = data.message;

                // Shake the login box on error
                const loginBox = document.getElementById("loginBox");
                if (loginBox) {
                    loginBox.style.animation = "none";
                    loginBox.offsetHeight; // trigger reflow
                    loginBox.style.animation = "shakeBox 0.5s ease-out";
                }

            }

        } catch (error) {

            console.error(error);

            // Reset button
            loginBtn.disabled = false;
            btnText.textContent = "Sign In";
            if (btnArrow) btnArrow.style.display = "flex";
            if (btnLoader) btnLoader.style.display = "none";
            loginBtn.style.background = "";

            errorMessage.textContent =
                "Something went wrong. Please try again.";

        }

    });
}