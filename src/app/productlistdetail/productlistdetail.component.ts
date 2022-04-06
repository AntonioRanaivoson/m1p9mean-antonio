import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productlistdetail',
  templateUrl: './productlistdetail.component.html',
  styleUrls: ['./productlistdetail.component.css']
})
export class ProductlistdetailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params["nom"]);
  }

}
