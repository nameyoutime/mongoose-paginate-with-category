import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public page: any;
  public data$: any;
  public data: any;

  public length = 120;
  public perpage = 5;
  constructor(private api: ApiService, private route: ActivatedRoute,private location:Location) {
    this.page = this.route.snapshot.paramMap.get('page');
    this.data$ = this.api.getProductPage(this.page, this.perpage);
    this.data = this.api.getProductPage(this.page, this.perpage);
    this.api.getProductCount().subscribe(data => {
      this.length = data[0];
    })
  }

  change() {
    this.location.replaceState(`/home/${this.page}`);
    this.data = this.api.getProductPage(this.page, this.perpage);

  }

  ngOnInit(): void {

  }

}
