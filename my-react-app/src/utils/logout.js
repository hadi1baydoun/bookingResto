// src/utils/logout.js
export const logout = () => {
    // Clear user data from local storage or session storage
    localStorage.removeItem("user");

    // Optionally, navigate to the login page or home
    window.location.href = "/login"; // Adjust the path as needed
};
