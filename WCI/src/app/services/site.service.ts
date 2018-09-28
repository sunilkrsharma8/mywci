import { Injectable } from '@angular/core';
import { Site } from '../models/site';

@Injectable()
export class SiteService {

  private sites: Site[];
  private nextId: number;

  constructor() {
    let sites = this.getSites();

    if(sites.length == 0){
      this.nextId = 0;
    }else{
      let maxId = sites[sites.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  public addSite(name: string, ipAddress: string, port: number): number {
    let site = new Site(this.nextId, name, ipAddress, port);
    let sites = this.getSites();
    sites.push(site);
    this.setLocalStorageSites(sites);
    this.nextId++;
    return this.nextId - 1;
  }

  public getSites(): Site[] {
    let localstorageitem = JSON.parse(localStorage.getItem("sites"));
    return localstorageitem == null ? [] : localstorageitem.sites
  }

  public removeSite(id: number): Site[] {
    let sites = this.getSites();
    sites = sites.filter((site)=> site.id != id);
    this.setLocalStorageSites(sites);
    return this.getSites();
  }

  private setLocalStorageSites(sites: Site[]): void{
    localStorage.setItem("sites", JSON.stringify({sites: sites}));
  }

}
