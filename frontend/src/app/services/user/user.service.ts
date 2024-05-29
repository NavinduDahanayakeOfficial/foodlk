import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../shared/models/User';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
      next: (user: User) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(`Welcome to Foodlk ${user.name}`,'Login successful');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Login failed');
      }
    }))
  }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user: User) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Foodlk ${user.name}`,'Register successful');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register failed');
        }
      })
    )
  }

  logout(){
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(new User());
    window.location.reload();
  }

  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson){
      return JSON.parse(userJson) as User;
    }
    return new User();
  }
}
