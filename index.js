const toggleDarkMode = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === 'dark' ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme)

    const toggleButton = document.getElementById("darkModeToggle")
    toggleButton.innerText = currentTheme === 'dark' ? "Dark Mode" : "Light Mode";

    localStorage.setItem("theme", newTheme)
}

const setStoredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", storedTheme)

    const toggleButton = document.getElementById("darkModeToggle")
    toggleButton.innerText = storedTheme === 'dark' ? "Light Mode" : "Dark Mode";
}

// Load the theme that's been stored in LocalStorage on page load
document.addEventListener('DOMContentLoaded', setStoredTheme);

const signUp = (e) => { 
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const inputValue = emailInput.value

    if (inputValue) {
        const newsletterContainer = document.getElementById("newsletter")
        newsletterContainer.innerText = "Thank you for entering your email, you're now successfully subscribed to our mailing list! 🎉"
    } else {
        const errorContainer = document.getElementById("error")
        errorContainer.innerText = "Please enter your email address"
    }
}

const clearError = () => { 
    const errorContainer = document.getElementById("error")
    errorContainer.innerText = "";
}