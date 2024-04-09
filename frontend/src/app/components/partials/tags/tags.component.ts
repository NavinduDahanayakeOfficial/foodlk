import { FoodService } from './../../../services/food/food.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
 tags: Tag[] = [];

 constructor(private FoodService: FoodService) { 
  this.FoodService.getAllTags().subscribe((serverTags) => {
    this.tags = serverTags;
  });
 }

 ngOnInit(): void {
   
 }
}
