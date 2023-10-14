import login from "../../support/PageObject/login";
import recruitment from "../../support/PageObject/recruitment";
import scheduleInterview from "../../support/PageObject/scheduleInterview";

const loginObj: login = new login();
const reruitmentObj: recruitment = new recruitment();
const scheduleObj: scheduleInterview = new scheduleInterview();
let id = "";

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
    // API: create candidate <- save:UserID
    cy.api({
      method: "POST",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
      body: {
        comment: null,
        consentToKeepData: false,
        contactNumber: null,
        dateOfApplication: "2023-10-14",
        email: "alaa@gmail.com",
        firstName: "alaa",
        keywords: null,
        lastName: "abuhani",
        middleName: "ghaleb",
        vacancyId: 4,
      },
    })
      .then((res) => {
        console.log(res, "post");
      })
      .then((res) => {
        id = res.body.data.id;
        console.log(id);
        cy.request({
          method: "PUT",
          url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${id}/shortlist`,
          body: {
            note: null,
          },
        })
          .then((response) => {
            expect(response.status).to.equal(200);

            console.log(response, "pput");
            console.log(response.body.data.action, "1");
            expect(response.body.data.action.label).to.equal("Shortlisted");
          })
          .then(() => {
            cy.visit(
              `https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${id}`
            ).then(() => {
              scheduleObj.scheduleInterview();
            });
          });
      });
  });
});
