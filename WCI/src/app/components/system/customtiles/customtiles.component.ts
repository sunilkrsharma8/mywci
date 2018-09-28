import { Component, OnInit, Inject, Input, Directive, Output, ViewChild, ElementRef, Injectable, EventEmitter } from '@angular/core';
import { CanActivate, CanDeactivate, Route, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
//import { ExpansionOverviewComponent } from './../expansion-overview/expansion-overview.component';
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import { CustomTileItem } from '../../../models/customtile-item';
import * as CustomTileActions from './../../../actions/customtile.actions';
import { CustomTileDataService } from './../../../services/customtiles.data.service';
import { ExpansionOverviewComponent } from '../../expansion-overview/expansion-overview.component';


@Component({
  selector: 'app-customtiles',
  templateUrl: './customtiles.component.html',
  styleUrls: ['./customtiles.component.css']
})
export class CustomtilesComponent implements OnInit {
  @ViewChild("expansionOverviewComp") expansionOverviewComp: ExpansionOverviewComponent;
  appModuleName: string = 'customtiles';
  sortBy: string;
  isSortByNameAsc: boolean = false;
  allCustomTiles: Observable<CustomTileItem[]>;
  allCustomTileSubscribedResult: Array<any>;
  customTileDataService: CustomTileDataService;
  displayedColumns = [{ headerCol: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\Name', value: 'Name' }, { headerCol: 'Type', value: 'Type' }, { headerCol: 'URL/Path', value: 'Path' }];

  constructor(customTileDataService: CustomTileDataService, private store: Store<AppState>) {
    this.customTileDataService = customTileDataService;
    this.allCustomTiles = store.select('customTileItem');
    this.customTileDataService.getCustomTilesData().then(data => {
      this.store.dispatch(new CustomTileActions.Empty());

      data.forEach(element => {
        this.store.dispatch(new CustomTileActions.AddCustomTile(element));
      });

      this.allCustomTiles.subscribe(allCustomeTile => {
        this.allCustomTileSubscribedResult = allCustomeTile;
      });

    });
  }

  canDeactivate() {
    var isDeactivate = this.expansionOverviewComp.compareRecordAndSetTargetUrl();
    return isDeactivate;
  }

  public defaultSort(event: any): void {
    this.sortByName(true);
  }

  private sortByName(isAscending: boolean) {
    this.sortBy = "name";
    this.expansionOverviewComp.sortedData = this.allCustomTileSubscribedResult.sort(function (record1: any, record2: any): number {
      var textNameA = record1.Title.toUpperCase();
      var textNameB = record2.Title.toUpperCase();
      if (isAscending) {
        return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
      } else {
        return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
      }
    });

    this.store.dispatch(new CustomTileActions.dataSort(this.expansionOverviewComp.sortedData));
  }

  sortFilter(sort: any, data: any): any {
    this.expansionOverviewComp.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Name': return this.expansionOverviewComp.compare(a.Title, b.Title, isAsc);
        case 'Type': return this.expansionOverviewComp.compare(a.Type, b.Type, isAsc);
        case 'Path': return this.expansionOverviewComp.compare(a.Uri, b.Uri, isAsc);
        default: return 0;
      }
    });

    this.store.dispatch(new CustomTileActions.dataSort(this.expansionOverviewComp.sortedData));
  }

  ngOnInit() {
  }

  public saveCustomTileItem(CustomTileData: any): void {
    if (CustomTileData.Id == 0) {
      this.customTileDataService.addCustomTile(CustomTileData).then(data => {
        CustomTileData.isFieldDisabled = false;
        CustomTileData.isExpanded = false;
        this.allCustomTiles.subscribe(allCustomTiles => {
          this.allCustomTileSubscribedResult = allCustomTiles;
          this.expansionOverviewComp.matExpansionPanelItemClear();
        });

      });
    } else {
      this.customTileDataService.updateCustomTile(CustomTileData).then(data => {
        CustomTileData.isFieldDisabled = false;
        CustomTileData.isExpanded = false;
        this.allCustomTiles.subscribe(allCustomTiles => {
          this.allCustomTileSubscribedResult = allCustomTiles;
          this.expansionOverviewComp.matExpansionPanelItemClear();
        });
      });
    }
  }

  public deleteCustomTileItem(CustomTileData: any): void {
    let _this3 = this;
    this.customTileDataService.deleteCustomTile(CustomTileData.Id).then(data => {
      let idx = _this3.expansionOverviewComp.findIndexOfArrayByAttr(_this3.expansionOverviewComp.sortedData, 'Id', CustomTileData.Id);
      _this3.expansionOverviewComp.sortedData.splice(idx, 1);
      this.allCustomTiles.subscribe(allCustomTiles => {
        this.allCustomTileSubscribedResult = allCustomTiles;
        this.expansionOverviewComp.matExpansionPanelItemClear();
      });
    });
  }

  public addNewCustomTile(event: any): void {
    this.expansionOverviewComp.addNewItem(new CustomTileItem());
  }
}
