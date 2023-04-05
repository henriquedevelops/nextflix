/* 

This code declares a new global namespace for the Express module in 
TypeScript. It extends the Request interface of Express by adding a new 
property user of type User, which can be used to store user data in the 
request object for use in subsequent middleware functions or route handlers.

*/

import { User } from "../entities/User";

declare global {
  namespace Express {
    export interface Request {
      userIsAdmin: Boolean;
    }
  }
}
