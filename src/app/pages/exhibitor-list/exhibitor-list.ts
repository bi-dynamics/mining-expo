import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-exhibitor-list',
  templateUrl: './exhibitor-list.html',
  styleUrls: ['./exhibitor-list.scss'],
})


export class ExhibitorListPage {
  filterTerm: string;
  exhibitors = [];
//  filterList = [];

  constructor(private dataService: DataService) {
    this.dataService.getExhibitors().subscribe(res => {
      console.log(res);
      this.exhibitors = res;
    })
  }

  async initializeItems(){


  }

  async filterList(search) {
console.log(search);
  }


}

