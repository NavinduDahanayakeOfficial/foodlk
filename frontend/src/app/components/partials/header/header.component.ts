import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/models/User';
import { CartService } from './../../../services/cart/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;

  constructor(private cartService:CartService, private userService:UserService) {
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })

     userService.userObservable.subscribe((newUser: User) => {
      this.user = newUser;
     })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
  
}
