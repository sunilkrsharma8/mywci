import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assetconfigurator',
  templateUrl: './assetconfigurator.component.html',
  styleUrls: ['./assetconfigurator.component.css']
})
export class AssetconfiguratorComponent implements OnInit {
  @Output() onAssetSelection: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  public setAsset(event){
    let selectedAssets: Array<any> = [];
    // for(let i = 0; i < this.tableInstrument.nativeElement.children.length; i++){
    //   let element = this.tableInstrument.nativeElement.children[i];
    //   if(element.children[0].children[0].$.checkbox.checked){
    //     selectedInstruments.push(this.filteredItems[i]);
    //   }
    // }
    this.onAssetSelection.emit(selectedAssets); 
  }
}
