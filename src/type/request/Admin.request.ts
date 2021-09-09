export interface SaveReqFood{
  food_itemname:String;
  food_price:String;
  food_type:String;
  food_size:String;
  }
  export interface UpdateReqFood {
    _id:string;
    food_itemname:String;
    food_price:String;
    food_type:String;
    food_size:String;
  }
  export interface GetFood {
    id: string
  }
  export interface deleteFood {
    id: string
  }