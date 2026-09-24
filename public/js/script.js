const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const errorMessage = document.getElementById("errorMessage");
        const loginBtn = document.getElementById("loginBtn");
        const btnText = loginBtn ? loginBtn.querySelector(".btn-text") : null;
        const btnArrow = loginBtn ? loginBtn.querySelector(".btn-arrow") : null;
        const btnLoader = loginBtn ? loginBtn.querySelector(".btn-loader") : null;

        // Show loading state
        if (loginBtn) loginBtn.disabled = true;
        if (btnText) btnText.textContent = "Signing in...";
        if (btnArrow) btnArrow.style.display = "none";
        if (btnLoader) btnLoader.style.display = "flex";
        if (errorMessage) errorMessage.textContent = "";

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
                // Login successful (SAME LOGIC)
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("currentUser", username);

                // Success animation
                if (btnText) btnText.textContent = "Welcome!";
                if (loginBtn) loginBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";
                if (btnLoader) btnLoader.style.display = "none";

                setTimeout(function() {
                    window.location.href = "dashboard.html";
                }, 500);

            } else {
                // Reset button
                if (loginBtn) {
                    loginBtn.disabled = false;
                    loginBtn.style.background = "";
                }
                if (btnText) btnText.textContent = "Sign In";
                if (btnArrow) btnArrow.style.display = "flex";
                if (btnLoader) btnLoader.style.display = "none";

                if (errorMessage) errorMessage.textContent = data.message || "Invalid username or password";

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
            if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.style.background = "";
            }
            if (btnText) btnText.textContent = "Sign In";
            if (btnArrow) btnArrow.style.display = "flex";
            if (btnLoader) btnLoader.style.display = "none";

            if (errorMessage) {
                errorMessage.textContent = "Something went wrong. Please try again.";
            }
        }
    });
}