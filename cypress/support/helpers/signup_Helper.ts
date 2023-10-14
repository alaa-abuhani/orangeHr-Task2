import userInit from "../Init/userInit";

const baseUrl = Cypress.config().baseUrl;
export const URLs = {
  users: `${baseUrl}/api/users`,
};

export default class addUser {
  static addNewUserViaAPI() {
    cy.addNewUser(URLs.users, userInit.InitUser());
  }
}
