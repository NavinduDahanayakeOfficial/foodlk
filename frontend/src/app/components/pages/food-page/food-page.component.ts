import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { sample_foods } from '../../../../data';
import { FoodService } from '../../../services/food/food.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  food!: Food;

  constructor(activatedRoute: ActivatedRoute, foodService: FoodService, private cartService: CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.food = foodService.getFoodById(params.id);
      }
    })
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page')
  }
}
