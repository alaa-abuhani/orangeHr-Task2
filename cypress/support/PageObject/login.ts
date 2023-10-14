class login {
  elements = {
    userName: () =>
      cy.get(
        "#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input"
      ),
    password: () =>
      cy.get(
        "#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input"
      ),
    loginBtn: () => cy.get("button"),
    Dashboard: () =>
      cy.get(
        "#app > div.oxd-layout > div.oxd-layout-navigation > header > div.oxd-topbar-header > div.oxd-topbar-header-title > span > h6"
      ),
    //
    MessageCredentials: () =>
      cy.get(
        "#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > div > div.oxd-alert.oxd-alert--error > div.oxd-alert-content.oxd-alert-content--error > p"
      ),
    MessageRequiredUsername: () =>
      cy.get(":nth-child(2) > .oxd-input-group > .oxd-text"),
    MessageRequiresPassword: () =>
      cy.get(":nth-child(3) > .oxd-input-group > .oxd-text"),
  };

  loginValid(userName: string, password: string) {
    this.elements.userName().type(userName);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
    this.elements.Dashboard().should("contain", "Dashboard");
  }
  loginInValid(userName: string, password: string) {
    this.elements.userName().type(userName);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
    this.elements.MessageCredentials().should("contain", "Invalid credentials");
  }
  loginInEmpty() {
    // this.elements.userName().type(userName);
    // this.elements.password().type(password);
    this.elements.loginBtn().click();
    this.elements.MessageRequiredUsername().should("contain", "Required");
    this.elements.MessageRequiresPassword().should("contain", "Required");
  }
  loginInEmptyPassword(userName: string) {
    this.elements.userName().type(userName);
    this.elements.loginBtn().click();
    this.elements.MessageRequiresPassword().should("contain", "Required");
  }
  loginInEmptyUserName(password: string) {
    // this.elements.userName().type(userName);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
    this.elements.MessageRequiredUsername().should("contain", "Required");
    // this.elements.MessageRequiresPassword().should("contain", "Required");
  }
  hiddenPassword() {
    this.elements.password().should("have.attr", "type", "password");
  }
}
export default login;
