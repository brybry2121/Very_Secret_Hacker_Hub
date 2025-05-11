document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const logoutButton = document.getElementById("logout-button");
    const systemMessageContainer = document.getElementById("system-message");

    const intelligenceForm = document.getElementById("intelligence-form");
    const pageNumberInput = document.getElementById("page-number-input");
    const hackersContainer = document.getElementById("hackers");

    const apiBaseUrl = "https://reqres.in/api";
    let authToken = "";

    // Functions
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/login`, { email, password });
            authToken = response.data.token;
            systemMessageContainer.innerText = `Access Granted with Token: ${authToken}`;
        } catch (error) {
            systemMessageContainer.innerText = "Failed to Infiltrate: Invalid credentials.";
        }
    };

    const logout = () => {
        authToken = "";
        systemMessageContainer.innerText = "Sneaked away with no trace left.";
    };

    const fetchHackers = async (pageNumber) => {
        if (!authToken) {
            hackersContainer.innerText = "Infiltrate to the system to fetch hackers.";
            return;
        }

        try {
            const response = await axios.get(`${apiBaseUrl}/users`, {
                params: { delay: 1, page: pageNumber },
            });
            const hackers = response.data.data;

            hackersContainer.innerHTML = "";
            hackers.forEach((hacker) => {
                const hackerElement = document.createElement("div");
                hackerElement.classList.add("hacker");
                hackerElement.innerHTML = `
                    <p>${hacker.first_name} ${hacker.last_name}</p>
                    <p>${hacker.email}</p>
                    <img src="${hacker.avatar}" alt="Portrait Picture">
                `;
                hackersContainer.appendChild(hackerElement);
            });
        } catch (error) {
            hackersContainer.innerText = `Failed to fetch hackers. Error: ${error.message}`;
        }
    };

    // Event Listeners
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        login(email, password);
        loginForm.reset();
    });

    logoutButton.addEventListener("click", logout);

    intelligenceForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const pageNumber = pageNumberInput.value;
        fetchHackers(pageNumber);
    });
});