import login from "../../support/PageObject/login";
import recruitment from "../../support/PageObject/recruitment";

const loginObj: login = new login();
const reruitmentObj = new recruitment();

describe("recruitment functionality", () => {
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("loginpage");
    cy.visit("https://opensource-demo.orangehrmlive.com");
    cy.fixture("login.json").as("logininfo");
    cy.get("@logininfo").then((logininfo: any) => {
      loginObj.loginValid(logininfo[0].Username, logininfo[0].Password);
    });
  });
  it("Recruitment: matche number of grid Candidates between API , UI", () => {
    reruitmentObj.recruitmentPage();
    // reruitmentObj.recruitmentIntercept();
    cy.intercept(reruitmentObj.UrlIntercept()).as("recruitmentAPI");
    cy.wait("@recruitmentAPI").then((interception) => {
      const rowsNumberViaAPI = interception.response?.body.meta.total;
      //check matche rowsNumberViaAPI &  rowsNumberViUI
      reruitmentObj.checkTableRowsNumber(rowsNumberViaAPI);
      console.log(interception);
      // console.log(interception.response?.body.meta.total, "mm");
    });
  });
});
