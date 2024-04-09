import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food/food.service';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public foods: Food[] =[];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {

    let foodObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params)=> {
      if(params.searchTerm){
        foodObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      } else if(params.tag){
        if(params.tag === "All"){
          foodObservable = this.foodService.getAll();
        } else {
        foodObservable = this.foodService.getAllFoodsByTag(params.tag);
        }
      } else{
        foodObservable = this.foodService.getAll();
      }

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })

    }) 
  }

  ngOnInit(): void {
    
  }

}
