import { Food } from "../../../shared/models/Food";

export class CartItem{
    food!:Food;
    quantity:number =1;
    price:number = this.food.price;
}