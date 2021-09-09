export interface SaveReqWaiter {
  name: string;
  email: string;
  password: string;
  isAdmin:boolean;
  isWaiter:boolean;
}
// export interface getReqUser {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
// }
export interface getReqWaiter {
    id: string
  }

export interface getReqBill {
    Bill: string
 }