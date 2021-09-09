export interface SaveReqOrder{
    Customer_name:string;
    Table_no:string;
    Food:object[];
    }
    export interface UpdateReqOrderQueue {
      _id:string;
   
      
    }
    export interface UpdateReqOrder {
      _id:string;
      
    }
    export interface GetOrder {
      id: string
    }
    export interface deleteorder {
      id: string
    }
    export interface SearchReqOrder{
      product:object
    }