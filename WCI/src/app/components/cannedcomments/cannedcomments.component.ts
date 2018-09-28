import { Component, OnInit, Inject, Input, Directive, Output, ViewChild, ElementRef, Injectable, EventEmitter } from '@angular/core';
import { CanActivate, CanDeactivate, Route, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { CannedCommentsDataService } from './../../services/canned-comments.data.service';
import { NoteTemplate } from './../../models/notetemplate';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as CannedCommentsActions from './../../actions/cannedcomments.actions';
import { ExpansionOverviewComponent } from './../expansion-overview/expansion-overview.component';

@Component({
  selector: 'app-cannedcomments',
  templateUrl: './cannedcomments.component.html',
  styleUrls: ['./cannedcomments.component.css']
})
export class CannedcommentsComponent implements OnInit {
  @ViewChild("expansionOverviewComp") expansionOverviewComp: ExpansionOverviewComponent;
  cannedCommentsDataService: CannedCommentsDataService;
  allNoteTemples: Observable<NoteTemplate[]>;
  allNoteTemplesSubscribedResult: Array<any>;
  appModuleName: string = 'canned-comments';
  sortBy: string;
  isSortByNameAsc: boolean = false;
  isAddRecord: boolean = false;

  displayedColumns = [{ headerCol: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Comment', value: 'Code' }, { headerCol: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Code', value: 'Code' }];
  constructor(cannedCommentsDataService: CannedCommentsDataService, private store: Store<AppState>) {
    this.cannedCommentsDataService = cannedCommentsDataService;
    this.allNoteTemples = store.select('noteTemplate');
    this.cannedCommentsDataService.getNoteTemplates().then(noteTemplates => {
      this.store.dispatch(new CannedCommentsActions.Empty());

      noteTemplates.forEach(element => {
        this.store.dispatch(new CannedCommentsActions.AddCannedComment(element));
      });
      this.allNoteTemplesSubscribed();
    });
  }

  ngOnInit() {
  }

  canDeactivate() {
    var isDeactivate = this.expansionOverviewComp.compareRecordAndSetTargetUrl();
    return isDeactivate;
  }

  private allNoteTemplesSubscribed(): void {
    this.allNoteTemples.subscribe(allNoteTemples => {
      this.allNoteTemplesSubscribedResult = allNoteTemples;
      this.newDisabled();
    });
  }
  public newDisabled(): boolean {
    var newLyAddedComment;
    if (this.expansionOverviewComp && this.expansionOverviewComp.sortedData) {
      newLyAddedComment = this.expansionOverviewComp.sortedData.find(newComment => {
        return newComment.Id === 0;
      });
    }
    if (newLyAddedComment) {
      this.isAddRecord = true;
    } else {
      this.isAddRecord = false;
    }
    return this.isAddRecord;
  }

  public defaultSort(event: any): void {
    this.sortByName(true);
  }
  public addNewCannedComment(event: any): void {
    this.expansionOverviewComp.addNewItem(new NoteTemplate());
    this.newDisabled();
  }

  public sortFilter(sort: any, data: any): any {
    this.expansionOverviewComp.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Text': return this.expansionOverviewComp.compare(a.Text, b.Text, isAsc);
        case 'Code': return this.expansionOverviewComp.compare(a.Code, b.Code, isAsc);
        default: return 0;
      }
    });

    this.store.dispatch(new CannedCommentsActions.CannedCommentSort(this.expansionOverviewComp.sortedData));
  }

  private sortByName(isAscending: boolean) {
    this.sortBy = "name";
    this.expansionOverviewComp.sortedData = this.allNoteTemplesSubscribedResult.sort(function (record1: any, record2: any): number {
      var textNameA = record1.Text.toUpperCase();
      var textNameB = record2.Text.toUpperCase();
      if (isAscending) {
        return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
      } else {
        return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
      }
    });

    this.store.dispatch(new CannedCommentsActions.CannedCommentSort(this.expansionOverviewComp.sortedData));
  }

  public deleteCannedComment(cannedCommentData: NoteTemplate) {
    this.cannedCommentsDataService.deleteNoteTemplate(cannedCommentData.Id).then(data => {
      let idx = this.expansionOverviewComp.findIndexOfArrayByAttr(this.expansionOverviewComp.sortedData, 'Id', cannedCommentData.Id);
      this.expansionOverviewComp.sortedData.splice(idx, 1);
      this.allNoteTemples.subscribe(allNoteTemples => {
        this.allNoteTemplesSubscribedResult = allNoteTemples;
        this.store.dispatch(new CannedCommentsActions.CannedCommentSort(this.expansionOverviewComp.sortedData));
        this.expansionOverviewComp.matExpansionPanelItemClear();
        this.newDisabled();
      });

    });
  }
  public saveCannedComment(cannedCommentData: NoteTemplate) {
    if (cannedCommentData.Id === 0) {
      this.cannedCommentsDataService.addNoteTemplate(cannedCommentData).then(data => {
        cannedCommentData.isExpanded = false;
        this.allNoteTemples.subscribe(allNoteTemples => {
          this.allNoteTemplesSubscribedResult = allNoteTemples;
          this.expansionOverviewComp.matExpansionPanelItemClear();
          this.newDisabled();
        });
      });
    } else {
      this.cannedCommentsDataService.updateNoteTemplate(cannedCommentData).then(data => {
        cannedCommentData.isExpanded = false;
        this.allNoteTemples.subscribe(allNoteTemples => {
          this.allNoteTemplesSubscribedResult = allNoteTemples;
          this.expansionOverviewComp.matExpansionPanelItemClear();
          this.newDisabled();
        });
      })
    }
  }
}
