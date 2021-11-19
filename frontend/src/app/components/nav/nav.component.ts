import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;
  public category: any;
  constructor(private api: ApiService,private router:Router) {
    this.category = this.api.getAllCategory();
  }

  change(va: any) {
    
    this.isMenuCollapsed = true;

    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([`category/${va}/1`]);
  }); 
  }
  ngOnInit(): void {

  }

}
