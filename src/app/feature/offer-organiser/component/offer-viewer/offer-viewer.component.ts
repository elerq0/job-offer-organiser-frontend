import {Component, OnInit} from '@angular/core';
import {SearchOptions} from '../../model/search-options';
import {Offer} from '../../model/offer';
import {OfferOrganiserService} from '../../service/offer-organiser.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatTableFilter} from 'mat-table-filter';
import {State} from '../../enum/state';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-offer-viewer',
  templateUrl: './offer-viewer.component.html',
  styleUrls: ['./offer-viewer.component.scss', '../../../../shared/style/global.scss'],
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms', style({opacity: 0})),
        animate('1000ms', style({opacity: 0.8})),
      ]),
      transition(':leave', [
        animate('100ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class OfferViewerComponent implements OnInit {
  public States = State;
  public displayedColumns: string[] = ['companyName', 'offerName', 'links', 'applied', 'skipped'];
  public dataSource: MatTableDataSource<Offer>;
  public filterType: MatTableFilter;
  public filterEntity: Offer;

  public state: State;
  public errorMessage: string;
  private currentSearchOptions: SearchOptions;

  constructor(private offerOrganiserService: OfferOrganiserService) {
    this.state = State.Not_Started;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.filterType = MatTableFilter.ANYWHERE;
    this.filterEntity = new Offer();
    this.filterEntity.id = 0;
    this.filterEntity.companyName = '';
    this.filterEntity.offerName = '';
    this.filterEntity.applied = false;
    this.filterEntity.skipped = false;
  }

  public async getOffers(searchOptions: SearchOptions): Promise<void> {
    this.state = State.Loading;
    this.errorMessage = null;

    await this.offerOrganiserService.getOffers(searchOptions.id).then(
      (data: Offer[]) => {
        this.dataSource.data = data;
        this.currentSearchOptions = searchOptions;
        this.state = State.Completed;
      },
      (err: Error) => {
        this.state = State.Error;
        this.errorMessage = err.message;
      }
    );
  }

  public async setApplied(offer: Offer, value: boolean): Promise<void> {
    await this.offerOrganiserService.putApplied(this.currentSearchOptions.id, offer.id, value).then(
      () => {
        this.errorMessage = null;
        this.dataSource.data.find(x => x === offer).applied = value;
        this.forceRefreshFilter();
      },
      (err) => {
        this.state = State.Error;
        this.errorMessage = err.message;
      }
    );
  }

  public async setSkipped(offer: Offer, value: boolean): Promise<void> {
    await this.offerOrganiserService.putSkipped(this.currentSearchOptions.id, offer.id, value).then(
      () => {
        this.errorMessage = null;
        this.dataSource.data.find(x => x === offer).skipped = value;
        this.forceRefreshFilter();
      },
      (err) => {
        this.state = State.Error;
        this.errorMessage = err.message;
      }
    );
  }

  public getTotal(): number {
    return this.dataSource.data.filter(x => (this.filterEntity.applied === x.applied || this.filterEntity.applied === null) &&
      (this.filterEntity.skipped === x.skipped || this.filterEntity.skipped === null) &&
      x.companyName.toLocaleLowerCase().indexOf(this.filterEntity.companyName.toLocaleLowerCase()) !== -1 &&
      x.offerName.toLocaleLowerCase().indexOf(this.filterEntity.offerName.toLocaleLowerCase()) !== -1).length;
  }

  private forceRefreshFilter(): void {
    this.filterEntity.id += 1;
  }
}
