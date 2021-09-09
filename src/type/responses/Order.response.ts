export interface SaveUpdateResOrder {
    _id:string;
    Customer_name:string;
    Table_no:string;
    Waiter:object
    Food:string | any;
    Order_status:number;
    createdAt: string;
    updatedAt: string;
  }