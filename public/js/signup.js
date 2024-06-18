/**
 * Listens to the registration form from signup.html.
 * Grabs data from input fields, sends it to the fetchUserList function, and then redirects.
 *
 * @function registration
 */
function registration() {
  const regForm = document.getElementById("registration-form");

  regForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userEmail = regForm.elements["email"];
    const userFN = regForm.elements["fn"];
    const userLN = regForm.elements["ln"];

    fetchUserList({
      email: userEmail.value,
      firstName: userFN.value,
      lastName: userLN.value,
    });
    document.location.href = "/";
  });
}

// call registration need eventlister
registration();

/**
 * Posts user data to the backend to register a user.
 *
 * @param {Object} data - The form data object to be sent to the /users endpoint.
 * @returns {Promise<Object>} A promise that resolves to the registered user object.
 * @throws {Error} Will throw an error if the fetch operation fails.
 */
async function fetchUserList(data) {
  try {
    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    // Handle error
    console.error(error);
  }
}
