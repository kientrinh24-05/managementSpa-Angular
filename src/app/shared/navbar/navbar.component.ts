import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/lib/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public name: string;

  constructor(private authenticationService: AuthenticationService) { 
  }

  ngOnInit(): void {
    this.getUserName()
  }
  getUserName () {
    this.name =JSON.parse(localStorage.getItem('user')).username ;
  }
  logout() {
    this.authenticationService.logout();
  }  
}
