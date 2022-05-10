import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/lib/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public username: string;
  constructor(private authenticationService: AuthenticationService) { 
  }

  ngOnInit(): void {
    this.getUserName()
  }
  getUserName () {
    this.username = localStorage.getItem('user');
    console.log(this.username);
    
  }
  logout() {
    this.authenticationService.logout();
  }  
}
