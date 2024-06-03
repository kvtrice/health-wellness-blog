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

document.addEventListener('DOMContentLoaded', setStoredTheme);