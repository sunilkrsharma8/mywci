import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomTileItem } from '../../../../models/customtile-item';
import { ServicesConstants } from "../../../../services/constants.service";
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Route, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-customtiles-item',
  templateUrl: './customtiles-item.component.html',
  styleUrls: ['./customtiles-item.component.css']
})
export class CustomtilesItemComponent implements OnInit {
  @Input() data: CustomTileItem;
  @Input() parrentComponent: any;
  @Input() customTileComp: any;
  @ViewChild("FileUpload") FileUpload: ElementRef;
  @ViewChild("ExecutableUpload") ExecutableUpload: ElementRef;
  @ViewChild("Img") Img: ElementRef;
  @ViewChild("matPanelExpansion") matPanelExpansion: ElementRef;
  uriChanged: boolean = false;
  disableClearImageButton: boolean = true;
  disableFetchImageButton: boolean = false;
  disableSaveButton: boolean = false;
  disableDeleteButton: boolean = false;
  disableCancelButton: boolean = false;
  imageLoadError: any;
  urlFormatError: boolean = false;
  noIconError: boolean = false;
  imageLoaded: boolean = false;
  iconLoaded: boolean = false;
  previousData: CustomTileItem;
  currentImageFromWeb: string;
  http: HttpClient;
  imgURL: string = "../../../../../assets/imgs/question-icon-small-size.png";
  typeSelected: number;


  constructor(http: HttpClient, private router: Router) {
    this.http = http;
  }

  ngOnInit() {
    let localData: any = this.data;
    this.previousData = Object.assign({}, this.data);
    //this.previousData = this.data;
    if (this.data.Icon != null) {
      let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(localData.Icon)));
      this.imgURL = "data:image/jpeg;base64," + base64String;
    }

    this.disableDeleteButton = this.data.Id != 0 ? false : true;
    this.disableFetchImageButton = false;
    this.disableSaveButton = true;
    this.disableCancelButton = true;
    this.disableClearImageButton = false;
  }

  ngAfterViewInit() {
    if (this.data.Id === 0) {
      this.parrentComponent.currentMatExpansionPanel = this.matPanelExpansion;
      this.parrentComponent.currentMatExpansionPanel .open();
      this.parrentComponent.matExpansionPanelItemSwape(this.data, this.matPanelExpansion);
    }
  }

  private getBase64ToArrayBuffer(base64String) {

    let sliceSize = 90000;
    let byteCharacters = atob(base64String);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays: Array<any> = [];
    let bytes: Array<any> = []
    for (let offset = 0; offset < bytesLength; ++offset) {
      bytes.push(byteCharacters[offset].charCodeAt(0));
    }
    return bytes;
  }

  public expandCollapse(itemData: any, matExpansionPanel: any): void {
    this.parrentComponent.expandOverviewCollapse(itemData, matExpansionPanel);
  }

  public cancel(): void {
    this.parrentComponent.isShowAlertBox = !this.parrentComponent.isShowAlertBox;
  }

  public delete(customTileData: any): void {
    this.customTileComp.deleteCustomTileItem(customTileData);
  }

  public openFileUpload(): void {
    this.FileUpload.nativeElement.click();
  }

  public imageFileChanged(event: any): void {
    this.imgURL = '';
    this.imageLoaded = false;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.imageLoaded = true;
        this.imgURL = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.disableClearImageButton = false;
      this.disableSaveButton = false;
    }
    this.disableCancelButton = false;
    event.srcElement.value = null;
  }

  public executableFileChanged(event: any): void {
    this.imgURL = '';
    this.imageLoaded = false;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.imageLoaded = true;
        this.imgURL = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.disableClearImageButton = false;
    }

  }

  public saveCustomTile(customTileData: CustomTileItem): void {
    console.log(this.imgURL);
    if (this.imageLoadError != null) {
      this.currentImageFromWeb = customTileData.Icon != null || this.imgURL != "../../../../../assets/imgs/question-icon-small-size.png" ? this.getBase64Image(this.Img.nativeElement) : null;
    }
    else {
      this.currentImageFromWeb = null;
      this.Img.nativeElement.src = "../../../../../assets/imgs/question-icon-small-size.png";
    }
    //  this.currentImageFromWeb = this.noIconError == true && this.iconLoaded == false ? null : this.getBase64Image(this.Img.nativeElement);
    if (customTileData.Title != "") {
      if (customTileData.Type == 0) {
        customTileData.Uri.toLowerCase().indexOf("http://") == -1 && customTileData.Uri.toLowerCase().indexOf("https://") == -1 ? this.urlFormatError = true : this.urlFormatError = false;
        if (!this.urlFormatError) {
          if (this.currentImageFromWeb) {
            customTileData["Icon"] = this.getBase64ToArrayBuffer(this.currentImageFromWeb);
          }
        }
      }
      else {
        if (!this.urlFormatError) {
          customTileData["Icon"] = this.currentImageFromWeb ? this.getBase64ToArrayBuffer(this.currentImageFromWeb) : null;
        }
      }
      this.customTileComp.saveCustomTileItem(customTileData);
    }
    this.disableCancelButton = true;
    this.disableSaveButton = true;
    this.disableDeleteButton = false;
  }

  public openExecutableFile(): void {
    this.ExecutableUpload.nativeElement.click();
  }


  /*public imageLoadError():void{
      console.log("IMAGE LOAD ERROR");
  }*/

  public fetchIcon(): void {
    this.imgURL = "";
    this.iconLoaded = false;
    setTimeout(() => {
      this.noIconError = true;

    }, 3000);
    this.uriChanged = true;
    if (this.data.Uri.toLowerCase().indexOf("http://") == -1 && this.data.Uri.toLowerCase().indexOf("https://") == -1) {
      this.data.Uri = "http://" + this.data.Uri;
      this.imgURL = this.data.Uri + "/favicon.ico";
      this.disableClearImageButton = false;
      this.disableFetchImageButton = true;
      this.disableSaveButton = false;
      this.imageLoaded = true;
    }
    else {
      this.imgURL = this.data.Uri + "/favicon.ico";
      this.disableClearImageButton = false;
      this.disableFetchImageButton = true;
      this.disableSaveButton = false;
      this.imageLoaded = true;
    }
  }

  public imageLoadComplete(): void {
    this.iconLoaded = true;
    this.imageLoadError = false;
  }

  private getBase64Image(img: HTMLImageElement): any {
    let canvas = document.createElement("canvas");
    canvas.width = 15;
    canvas.height = 15;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/jpeg");
    return dataURL.replace(/^data:image\/(png|jpg|jpeg|ico);base64,/, "");
  }

  public clearImage(): void {
    this.uriChanged = false;
    this.imgURL = "../../../../../assets/imgs/question-icon-small-size.png";
    this.disableClearImageButton = true;
    this.disableFetchImageButton = false;
    this.disableSaveButton = false;
    this.disableCancelButton = false;
    this.noIconError = false;
    this.imageLoaded = false;
  }

  public onKeyUpURLValidation(val: string): void {
    val.length == 0 ? this.disableFetchImageButton = true : this.disableFetchImageButton = false;
    val.length == 0 ? this.disableSaveButton = true : this.disableSaveButton = false;
    this.disableSaveButton = JSON.stringify(this.previousData.Uri) == JSON.stringify(this.data.Uri) ? true : false;
    this.disableCancelButton = JSON.stringify(this.previousData.Uri) == JSON.stringify(this.data.Uri) ? true : false;
    this.disableFetchImageButton = JSON.stringify(this.previousData.Uri) == JSON.stringify(this.data.Uri) ? true : false;
  }

  public onKeyUpNameValidation(val: string): void {
    val.length == 0 ? this.disableSaveButton = true : this.disableSaveButton = false;
    this.disableSaveButton = JSON.stringify(this.previousData.Title) == JSON.stringify(this.data.Title) ? true : false;
    this.disableCancelButton = JSON.stringify(this.previousData.Title) == JSON.stringify(this.data.Title) ? true : false;
  }

  public selectedType(val: number): void {
    this.typeSelected = val;
    this.disableSaveButton = JSON.stringify(this.previousData.Type) == JSON.stringify(this.data.Type) ? true : false;
    this.disableCancelButton = JSON.stringify(this.previousData.Type) == JSON.stringify(this.data.Type) ? true : false;
  }
}

