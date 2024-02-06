import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food/food.service';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public foods: Food[] =[];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe((params)=> {
      if(params.searchTerm){
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      } else {
        this.foods = this.foodService.getAll();
      }
    }) 
  }

  ngOnInit(): void {
    
  }

}
