import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OfferOrganiserService} from '../../service/offer-organiser.service';
import {SearchOptions} from '../../model/search-options';
import {MultiSelectDropdownComponent} from '../../../../shared/component/multi-select-dropdown/multi-select-dropdown.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectDropdownComponent} from '../../../../shared/component/select-dropdown/select-dropdown.component';
import {OfferViewerComponent} from '../offer-viewer/offer-viewer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../../shared/style/global.scss'],
  animations: [
    trigger('showHide', [
      state('hide', style({transform: 'translateX(-500px)'})),
      state('show', style({transform: 'translateX(0)'})),
      transition('hide <=> show', animate(1000))
    ]),
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

export class HomeComponent implements OnInit {
  @ViewChild('multiSelectTechnologies') multiSelectTechnologies: MultiSelectDropdownComponent;
  @ViewChild('multiSelectExperienceLevels') multiSelectExperienceLevels: MultiSelectDropdownComponent;
  @ViewChild('multiSelectWebsites') multiSelectWebsites: MultiSelectDropdownComponent;
  @ViewChild('selectSearchHistory') searchHistory: SelectDropdownComponent;
  @ViewChild('offerViewer') offerViewer: OfferViewerComponent;

  public hide: boolean;
  public form: FormGroup;
  public operationInvalid: boolean;
  public errorMessage: string;

  public availableTechnologies: string[];
  public availableExperienceLevels: string[];
  public availableWebsites: string[];
  public searchOptions: SearchOptions[];

  constructor(private formBuilder: FormBuilder, private offerOrganiserService: OfferOrganiserService) {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      location: ['', [Validators.required]],
      technology: [''],
      experienceLevel: [''],
      website: ['', [this.notEmpty]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.hide = false;
    this.operationInvalid = false;
    try {
      this.availableTechnologies = await this.offerOrganiserService.getAvailableTechnologies();
      this.availableExperienceLevels = await this.offerOrganiserService.getAvailableExperienceLevels();
      this.availableWebsites = await this.offerOrganiserService.getWebsites();

      await this.loadSearchOptions();
    } catch (err) {
      this.operationInvalid = true;
      this.errorMessage = err.message;
    }
  }

  public async onSubmit(): Promise<void> {
    this.operationInvalid = false;
    this.errorMessage = null;

    if (this.form.valid || this.form.disabled) {
      if (!this.form.controls.id.value) {
        await this.createSearchOptions();
        await this.loadSearchOptions();
        this.setCurrentSearchOptions(this.searchOptions[this.searchOptions.length - 1]);
      }
      this.hide = true;
      await this.offerViewer.getOffers(this.searchOptions.find(x => x.id === this.form.get('id').value));
    } else {
      this.operationInvalid = true;
    }
  }

  private async createSearchOptions(): Promise<void> {
    const title = this.form.get('title').value;
    const location = this.form.get('location').value;
    const technologies = this.form.get('technology').value ? this.form.get('technology').value : [];
    const experienceLevels = this.form.get('experienceLevel').value ? this.form.get('experienceLevel').value : [];
    const websites = this.form.get('website').value;
    try {
      await this.offerOrganiserService.postSearchOptions(title, location, technologies, experienceLevels, websites);
    } catch (err) {
      this.operationInvalid = true;
      this.errorMessage = err.message;
    }
  }

  private async deleteSearchOptions(): Promise<void> {
    if (this.form.controls.id.value) {
      this.operationInvalid = false;
      this.errorMessage = null;

      try {
        await this.offerOrganiserService.deleteSearchOptions(this.form.controls.id.value);
        await this.loadSearchOptions();
        this.setCurrentSearchOptions(this.searchOptions[0]);
      } catch (err) {
        this.operationInvalid = true;
        this.errorMessage = err.message;
      }
    }
  }

  private async loadSearchOptions(): Promise<void> {
    this.searchOptions = await this.offerOrganiserService.getSearchOptions();
    this.searchOptions.unshift(new SearchOptions());
    this.searchHistory.values = this.searchOptions;
  }

  public setCurrentSearchOptions(searchOptions: SearchOptions): void {
    if (searchOptions.id) {
      this.form.disable();

      this.form.controls.id.setValue(searchOptions.id);
      this.form.controls.title.setValue(searchOptions.title);
      this.form.controls.location.setValue(searchOptions.location);
      this.form.controls.technology.setValue(searchOptions.technologies);
      this.form.controls.experienceLevel.setValue(searchOptions.experienceLevels);
      this.form.controls.website.setValue(searchOptions.websites);
    } else {
      this.form.enable();

      this.multiSelectTechnologies.clear();
      this.multiSelectExperienceLevels.clear();
      this.multiSelectWebsites.clear();

      this.form.controls.id.setValue(null);
      this.form.controls.title.setValue('');
      this.form.controls.location.setValue('');
      this.form.controls.technology.setValue('');
      this.form.controls.experienceLevel.setValue('');
      this.form.controls.website.setValue('');
    }
  }

  public setTechnologies(item: any[]): void {
    this.form.controls.technology.setValue(item);
  }

  public setExperienceLevels(item: any[]): void {
    this.form.controls.experienceLevel.setValue(item);
  }

  public setWebsites(item: any[]): void {
    this.form.controls.website.setValue(item);
  }

  public notEmpty(control: AbstractControl): any {
    if (control.value && control.value.toString() === '') {
      return {empty: true};
    }
    return null;
  }
}
