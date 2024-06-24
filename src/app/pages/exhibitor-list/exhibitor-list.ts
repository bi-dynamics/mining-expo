import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Browser } from '@capacitor/browser';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-exhibitor-list',
  templateUrl: './exhibitor-list.html',
  styleUrls: ['./exhibitor-list.scss'],
})


export class ExhibitorListPage {
  
  exhibitors = [];
  currentExhibitors = [];

  constructor(private dataService: DataService) {
    this.dataService.getExhibitors().subscribe(res => {
      this.exhibitors = res;
      this.currentExhibitors = res;
    })
  }

  filterExhibitors(searchTerm: string) {
    if (!searchTerm) {
      this.currentExhibitors = this.exhibitors.slice(); // Show all if no search term
      return;
    }
  
    const searchTextLower = searchTerm.toLowerCase();
    this.currentExhibitors = this.exhibitors.filter(exhibitor => {
      const exhibitorLower = exhibitor.name && exhibitor.name.toLowerCase();
      
      return exhibitorLower && exhibitorLower.includes(searchTextLower)
           ;
    });
  }

  async openLink(link: string) {
    await Browser.open({ url: link})
  }

}