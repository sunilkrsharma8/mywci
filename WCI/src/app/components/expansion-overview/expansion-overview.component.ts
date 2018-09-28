import { Component, OnInit, AfterViewInit, ViewChild, AfterViewChecked, ElementRef, Output, Input, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-expansion-overview',
  templateUrl: './expansion-overview.component.html',
  styleUrls: ['./expansion-overview.component.css']
})
export class ExpansionOverviewComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  @Input() dataList: Array<any>;
  @Input() displayedHeaderColumns: Array<any>;
  @Input() appModuleName: String;
  @Input() parrentComponent: any;
  sortedData: any;
  isShowAlertBox: boolean;
  prevItemCopy: any = null;
  currentItemCopy: any = null;
  preMatExpansionPanel: any = null;
  currentMatExpansionPanel: any = null;
  sortedOrderBy: any = { 'active': null, 'direction': null };
  targetUrl: string;
  modelHeaderContent: string = "Really Lose Changes?";
  modelBodyContent: string = "Completing this action will cause you to lose any unsaved changes. Are you sure you want to continue?";
  newItem: any;
  constructor(private router: Router) { }
  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataList && changes.dataList.currentValue && changes.dataList.currentValue.length) {
      this.sortedData = changes.dataList.currentValue;
    }
  }

 public sortData(sort: MatSort) {
    const data = this.dataList.slice();
    if (!sort.active) {
      this.sortedData = data;
      return;
    } else {
      if (sort.direction == '' && !this.sortedOrderBy.direction) {
        sort.direction = 'asc';
      } else {
        if (this.sortedOrderBy.active && (sort.active == this.sortedOrderBy.active)) {
          sort.direction = this.sortedOrderBy.direction;
        } else {
          sort.direction = 'asc';
        }
      }
      switch (sort.direction) {
        case 'asc':
          sort.direction = 'desc'
          break;
        case 'desc':
          sort.direction = 'asc'
          break;
      }
      this.sortedOrderBy.direction = sort.direction;
      this.sortedOrderBy.active = sort.active;
    }
    this.parrentComponent.sortFilter(sort, data);
  }


public  findIndexOfArrayByAttr(array: Array<any>, attr: any, value: any): number {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  public addNewItem(newRecord: any): void {
    var activeitem;
    if (!this.prevItemCopy) {
      activeitem = this.currentItemCopy;
    } else {
      activeitem = this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.currentItemCopy.Id)];
    }
    if (this.currentItemCopy && this.compareRecord(activeitem)) {
      this.isShowAlertBox = true;
      this.newItem = newRecord;
    } else {
      this.sortedData.unshift(newRecord);
      this.currentItemCopy = JSON.parse(JSON.stringify(newRecord));
    }
  }

 public discardChanges(): void {
    if (this.currentItemCopy && this.currentItemCopy.Id == 0) {
      this.sortedData.splice(this.findIndexOfArrayByAttr(this.sortedData, 'Id', 0), 1);
      this.newItem = null;
      this.isShowAlertBox = false;
    } else if (this.currentItemCopy && this.currentItemCopy.Id != 0 && this.prevItemCopy && this.currentItemCopy.Id == this.prevItemCopy.Id) {
      var indx = this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.currentItemCopy.Id);
      this.sortedData[indx] = this.prevItemCopy;
      this.sortedData[indx].isExpanded = false;
      this.isShowAlertBox = false;
      this.matExpansionPanelItemClear();
    } else if (this.currentItemCopy && this.currentItemCopy.Id != 0 && this.prevItemCopy && this.currentItemCopy.Id != this.prevItemCopy.Id) {
      if (this.prevItemCopy.Id == 0) {
        this.sortedData.splice(this.findIndexOfArrayByAttr(this.sortedData, 'Id', 0), 1);
        this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.currentItemCopy.Id)] = this.currentItemCopy;
        this.newItem = null;
        this.isShowAlertBox = false;
      } else {
        var indx = this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.prevItemCopy.Id);
        this.sortedData[indx] = this.prevItemCopy;
        this.sortedData[indx].isExpanded = false;
        this.isShowAlertBox = false;
        this.preMatExpansionPanel.close();
        this.currentMatExpansionPanel.open();
        this.preMatExpansionPanel = this.currentMatExpansionPanel;
        this.prevItemCopy = this.currentItemCopy;
      }
    } else {
      if (!this.prevItemCopy && this.currentItemCopy && this.compareRecord(this.currentItemCopy)) {
        this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.currentItemCopy.Id)] = this.currentItemCopy;
      }
    }
    if (this.newItem) {
      this.sortedData.unshift(this.newItem);
      this.newItem.isExpanded = true;
      this.currentItemCopy.isExpanded = false;
      this.preMatExpansionPanel = this.currentMatExpansionPanel;
      this.prevItemCopy = this.currentItemCopy;
      this.currentItemCopy = JSON.parse(JSON.stringify(this.newItem));
    }
    if (this.parrentComponent.parrentComponent && !this.parrentComponent.parrentComponent.isActiveDefaultTab && this.parrentComponent.parrentComponent.discardTarget) {
      this.parrentComponent.parrentComponent.isActiveDefaultTab = true;
      this.parrentComponent.parrentComponent.changeSelectMenu(this.parrentComponent.parrentComponent.activeTab);
      this.parrentComponent.parrentComponent.discardTarget.nativeElement.click();
    } else if (this.targetUrl && localStorage.targetLink && JSON.parse(localStorage.targetLink).url) {
      this.router.navigateByUrl(this.targetUrl);
    }

  }

 public cancelEvent(): void {
    this.isShowAlertBox = false;
    if (this.prevItemCopy && this.preMatExpansionPanel) {
      this.currentItemCopy = this.prevItemCopy;
      this.currentMatExpansionPanel = this.preMatExpansionPanel;
    }
    this.newItem = null;
  }

 public compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

 public expandOverviewCollapse(itemData: any, matExpansionPanel: any): void {

    this.matExpansionPanelItemSwape(itemData, matExpansionPanel);
    if (!itemData.isExpanded) {
      this.matExpansionPanelCollapse(itemData, matExpansionPanel);
    } else if (itemData.isExpanded) {
      this.matExpansionPanelExpand(itemData, matExpansionPanel);
    }

  }

  public matExpansionPanelExpand(currentItem: any, currentMatExpansionPanel: any): void {
    if (currentItem.Id != 0 && this.prevItemCopy && this.currentItemCopy && this.prevItemCopy.Id == this.currentItemCopy.Id) {
      if (this.compareRecord(currentItem)) {
        currentMatExpansionPanel.open();
        this.isShowAlertBox = true;
      }
    } else if (currentItem.Id != 0 && this.prevItemCopy && this.currentItemCopy && this.prevItemCopy.Id != this.currentItemCopy.Id) {
      if ((this.prevItemCopy.Id == 0 && this.findIndexOfArrayByAttr(this.sortedData, 'Id', 0) > -1) || this.compareRecord(this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.prevItemCopy.Id)])) {
        currentMatExpansionPanel.close();
        this.preMatExpansionPanel.open();
        this.isShowAlertBox = true;
      }
    }
  }
  public matExpansionPanelCollapse(currentItem: any, currentMatExpansionPanel: any): void {
    if (currentItem.Id == 0) {
      currentMatExpansionPanel.open();
      this.isShowAlertBox = true;
    } else if (currentItem.Id != 0 && this.prevItemCopy && this.currentItemCopy && this.prevItemCopy.Id == this.currentItemCopy.Id) {
      if (this.compareRecord(currentItem)) {
        currentMatExpansionPanel.open();
        this.isShowAlertBox = true;
      } else {
        this.matExpansionPanelItemClear();
      }
    } else if (currentItem.Id != 0 && this.prevItemCopy && this.currentItemCopy && this.prevItemCopy.Id != this.currentItemCopy.Id) {
      if (this.compareRecord(this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.prevItemCopy.Id)])) {
        currentMatExpansionPanel.open();
        this.isShowAlertBox = true;
      } else {
        this.matExpansionPanelItemClear();
      }
    } else {
      this.matExpansionPanelItemClear();
    }

  }
  public matExpansionPanelItemSwape(currentItem: any, currentMatExpansionPanel: any): void {
    if (!this.prevItemCopy && !this.currentItemCopy && !this.preMatExpansionPanel && !this.currentMatExpansionPanel && this.findIndexOfArrayByAttr(this.sortedData, 'Id', 0) > -1) {
      this.prevItemCopy = this.currentItemCopy;
      this.currentItemCopy = JSON.parse(JSON.stringify(this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', 0)]));
      this.preMatExpansionPanel = this.currentMatExpansionPanel;
      this.currentMatExpansionPanel = currentMatExpansionPanel;
    } else {
      this.prevItemCopy = this.currentItemCopy;
      this.currentItemCopy = JSON.parse(JSON.stringify(currentItem));
      this.preMatExpansionPanel = this.currentMatExpansionPanel;
      this.currentMatExpansionPanel = currentMatExpansionPanel;
    }

  }
  public matExpansionPanelItemClear(): void {
    this.prevItemCopy = null;
    this.currentItemCopy = null;
    this.preMatExpansionPanel = null;
    this.currentMatExpansionPanel = null;
  }
  public compareRecord(itemData: any): boolean {
    var isItemChanged = false;
    if (itemData) {
      for (var i = 0; i < Object.keys(itemData).length; i++) {
        if (this.prevItemCopy && (itemData.Id !== 0) && (JSON.stringify(itemData[Object.keys(itemData)[i]]) !== JSON.stringify(this.prevItemCopy[Object.keys(itemData)[i]])) && (Object.keys(itemData)[i] !== 'isExpanded') && (Object.keys(itemData)[i] !== 'isFieldDisabled')) {
          this.isShowAlertBox = !this.isShowAlertBox;
          isItemChanged = true;
          break;
        }
        else if (!this.prevItemCopy && this.currentItemCopy && (itemData.Id !== 0) && (JSON.stringify(itemData[Object.keys(itemData)[i]]) !== JSON.stringify(this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.currentItemCopy.Id)][Object.keys(itemData)[i]])) && (Object.keys(itemData)[i] !== 'isExpanded') && (Object.keys(itemData)[i] !== 'isFieldDisabled')) {
          this.isShowAlertBox = !this.isShowAlertBox;
          isItemChanged = true;
          break;
        }
      }
    }
    return isItemChanged;
  }
 
 public removeClass(event): void {
    event.target.setAttribute("style", "outline: none !important;");
  }

  public compareRecordAndSetTargetUrl(): boolean {
    if (this.currentItemCopy && this.currentMatExpansionPanel) {
      var activeitem;
      if (!this.prevItemCopy) {
        activeitem = this.currentItemCopy;
      } else {
        activeitem = this.sortedData[this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.currentItemCopy.Id)];
      }
      if (this.compareRecord(activeitem) && this.currentItemCopy.Id !== 0) {
        this.currentItemCopy.isExpanded = true;
        this.currentMatExpansionPanel.open();
        this.isShowAlertBox = true;
        this.targetUrl = JSON.parse(localStorage.targetLink).url;
        return false;
      } else if (this.currentItemCopy && this.currentItemCopy.Id === 0) {
        if (this.findIndexOfArrayByAttr(this.sortedData, 'Id', this.currentItemCopy.Id) > -1) {
          this.currentItemCopy.isExpanded = true;
          this.currentMatExpansionPanel.open();
          this.isShowAlertBox = true;
          this.targetUrl = JSON.parse(localStorage.targetLink).url;
          return false;
        } else {
          this.targetUrl = JSON.parse(localStorage.targetLink).url;
          return true;
        }

      } else {
        this.currentItemCopy.isExpanded = false;
        this.currentMatExpansionPanel.close();
        this.targetUrl = JSON.parse(localStorage.targetLink).url;
        return true;
      }
    } else if (this.currentItemCopy && !this.currentMatExpansionPanel) {
      this.isShowAlertBox = true;
      return false;
    } else {
      return true;
    }
  }

}





