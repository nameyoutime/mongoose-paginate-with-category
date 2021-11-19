import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public page: any;
  public data$: any;
  public data: any;
  public id: any;
  public length = 120;
  public perpage = 5;
  constructor(private api: ApiService, private route: ActivatedRoute, private location: Location) {
    this.page = this.route.snapshot.paramMap.get('page');
    this.id = this.route.snapshot.paramMap.get('id');
    this.data$ = this.api.getCategoryPage(this.id, this.page, this.perpage);
    this.data = this.api.getCategoryPage(this.id, this.page, this.perpage);
    this.api.getCategoryCount(this.id).subscribe(data => {
      this.length = data[0];
    })
  }

  change() {
    this.location.replaceState(`/category/${this.id}/${this.page}`)
    this.data = this.api.getCategoryPage(this.id, this.page, this.perpage)

  }

  ngOnInit(): void {
  }
}
