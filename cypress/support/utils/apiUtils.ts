/// <reference types="cypress" />

import { ICreateEmployeePayload } from "../API/payload/userAPIPayload";
import { ICreateEmpolyeeResponse } from "../API/response/userAPIResponse";

declare global {
  namespace Cypress {
    interface Chainable {
      addNewUser: (
        requestUrl: string,
        userPayload: ICreateEmployeePayload
      ) => Chainable<ICreateEmpolyeeResponse>;
    }
  }
}
Cypress.Commands.add(
  "addNewUser",
  (requestUrl: string, userPayload: ICreateEmployeePayload) => {
    cy.api({
      method: "POST",
      url: requestUrl,
      body: userPayload,
    });
  }
);
