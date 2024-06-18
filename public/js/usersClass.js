/**
 * Class representing a user.
 */
export class Users {
  /**
   * Create a user.
   *
   * @param {number} id - The user's unique identifier.
   * @param {string} email - The user's email address.
   * @param {string} firstName - The user's first name.
   * @param {string} lastName - The user's last name.
   * @param {string} state - The user's activation state.
   */
  constructor(id, email, firstName, lastName, state) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.state = state;
  }

  /**
   * Creates table elements for the user.
   *
   * @returns {HTMLTableRowElement} The created table row element containing user data.
   */
  createTableElements() {
    const tr = document.createElement("tr");
    tr.setAttribute("id", this.id);

    // create element for each column
    const tdEmail = this.createTableCell(this.email);
    const tdFirstName = this.createTableCell(this.firstName);
    const tdLastName = this.createTableCell(this.lastName);
    const tdState = this.createTableCell(this.state);

    tr.append(tdEmail, tdFirstName, tdLastName, tdState);

    // Create the close button
    const deleteButton = this.createDeleteButton();
    tdEmail.appendChild(deleteButton);

    // check user state and create for active button for pending users
    const tdButton = document.createElement("td");
    if (this.state !== "active") {
      const activeButton = this.createActivateButton();
      tdButton.appendChild(activeButton);
    }
    tr.appendChild(tdButton);
    return tr;
  }

  /**
   * Creates a table cell (td) element with the specified content.
   *
   * @param {String} content - The content to be placed inside the table cell.
   * @returns {HTMLTableCellElement} The created table cell element with the given content.
   */
  createTableCell(content) {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
  }

  /**
   * Create an event listener for deleting a user from table
   *
   * @returns {HTMLAnchorElement} The created button element with the delete functionality.
   */
  createDeleteButton() {
    const button = document.createElement("a");
    button.textContent = "delete";
    button.className = "closebtn";
    return button;
  }

  /**
   * Creates an event listener for the activation button.
   *
   * @returns {HTMLAnchorElement} The created button element with the activation functionality.
   */
  createActivateButton() {
    const button = document.createElement("a");
    button.textContent = "Activate";
    button.className = "activebtn";
    return button;
  }

  /**
   * Deletes a user from back end and call a function to remove user row
   *
   */
  async deleteUser() {
    try {
      const response = await fetch(`/users/${this.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      // remove user row
      this.removeRow();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  /**
   *
   * Send a put to backend and change state to active
   */
  async activateUser() {
    try {
      const response = await fetch(`/users/${this.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          email: this.email,
          firstName: this.fn,
          lastName: this.ln,
          state: "active",
        }),
      });
      const result = await response.json();
      console.log("Success:", result);

      // remove pending stuff
      this.removePending();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  /**
   *
   * Look for row id and remove the last td and change pending to active for 2nd to last td
   */
  removePending() {
    const tr = document.getElementById(this.id);
    // remove last child - the activation button
    const toRemove = tr.lastChild;
    // toRemove.remove();
    toRemove.querySelector("a").remove();
    // replace active
    const toReplace = tr.querySelector("td:nth-child(4)");
    toReplace.textContent = "active";
  }

  /**
   *
   * remove the row
   */
  removeRow() {
    const tr = document.getElementById(this.id);
    tr.remove();
  }
}
