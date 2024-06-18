import { Users } from "./usersClass.js";

/**
 * @async
 * @function fetchUserList
 * @returns {Promise<Object[]>} A promise that resolves to an array of user objects.
 * @throws {Error} Will throw an error if the fetch operation fails.
 */
const fetchUserList = async () => {
  try {
    const response = await fetch("/users");
    const userList = await response.json();
    return userList;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

/**
 * Fetches the list of users from the server, creates User instances for each user,
 * and appends their table elements to the DOM.
 *
 * This function fetches the user list from the server using fetchUserList(),
 * creates a User instance for each user using the Users class constructor,
 * and then calls createTableElements() method on each User instance to create
 * the table elements for each user and append them to the DOM.
 *
 * Additionally, this function attaches event listeners to the activate and delete buttons
 * within each user's table row to handle user activation and deletion.
 *
 * @async
 * @function createUserTable
 */
async function createUserTable() {
  const userContainer = document.getElementById("user-list"); // post user

  const usersList = await fetchUserList();

  usersList.forEach((user) => {
    let newUser = new Users(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.state
    );

    let tr = newUser.createTableElements();

    // Append the user's table row to the userContainer
    userContainer.appendChild(tr);

    // Find the activate button inside the user's table row
    const activateButton = tr.lastChild;
    // Attach the event listener to the activate button
    activateButton.addEventListener("click", () => {
      newUser.activateUser();
    });

    // Find the activate button inside the user's table row
    const deleteButton = tr.querySelector(".closebtn");
    // Attach the event listener to the delete button
    deleteButton.addEventListener("click", () => {
      newUser.deleteUser();
    });
  });
}

//calls function to run
createUserTable();
