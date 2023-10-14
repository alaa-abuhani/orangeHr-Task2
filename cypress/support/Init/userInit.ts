import { ICreateEmployeePayload } from "../API/payload/userAPIPayload";
import GenericHepler from "../helpers/genericFunctions";

export default class userInit {
  static InitUser(): ICreateEmployeePayload {
    let creatUserPayload: ICreateEmployeePayload = {
      user: {
        email: `ala${GenericHepler.GenericRandomString()}@gmail.com`,
        password: "1234567",
        username: `ala${GenericHepler.GenericRandomString()}`,
      },
    };
    return creatUserPayload;
  }
}
