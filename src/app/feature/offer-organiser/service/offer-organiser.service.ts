import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SearchOptions} from '../model/search-options';
import {Offer} from '../model/offer';
import {ResponseInfoError} from '../../../core/error/response-info-error';

@Injectable({
  providedIn: 'root'
})
export class OfferOrganiserService {

  constructor(private router: Router,
              private httpClient: HttpClient) {
  }

  public async getAvailableTechnologies(): Promise<string[]> {
    const arr = [];
    await this.httpClient
      .get(`${environment.apiUrl}search-options/available-technologies`, {observe: 'response'})
      .toPromise()
      .then(
        (res: any) => {
          if (res instanceof HttpResponse && res.body) {
            for (const item of res.body) {
              arr.push(item.name);
            }
          }
        },
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
    return arr;
  }

  public async getAvailableExperienceLevels(): Promise<string[]> {
    const arr = [];
    await this.httpClient
      .get(`${environment.apiUrl}search-options/available-experience-levels`, {observe: 'response'})
      .toPromise()
      .then(
        (res: any) => {
          if (res instanceof HttpResponse && res.body) {
            for (const item of res.body) {
              arr.push(item.name);
            }
          }
        },
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
    return arr;
  }

  public async getWebsites(): Promise<string[]> {
    const arr = [];
    await this.httpClient
      .get(`${environment.apiUrl}search-options/available-websites`, {observe: 'response'})
      .toPromise()
      .then(
        (res: any) => {
          if (res instanceof HttpResponse && res.body) {
            for (const item of res.body) {
              arr.push(item.name);
            }
          }
        },
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
    return arr;
  }

  public async postSearchOptions(title, location, technologies, experienceLevels, websites): Promise<void> {
    await this.httpClient
      .post(`${environment.apiUrl}search-options`, {title, location, technologies, experienceLevels, websites}, {observe: 'response'})
      .toPromise()
      .then(
        () => {
        },
        (err: any) => {
          if (err && !(err.error instanceof ProgressEvent)) {
            throw new Error(err.error);
          } else {
            console.log(err);
            throw new Error('Server unavailable. Try again later.');
          }
        }
      );
  }

  public async deleteSearchOptions(searchOptionsId: number): Promise<void> {
    await this.httpClient
      .delete(`${environment.apiUrl}search-options/${searchOptionsId}`, {observe: 'response'})
      .toPromise()
      .then(
        () => {
        },
        (err: any) => {
          if (err && !(err.error instanceof ProgressEvent)) {
            throw new Error(err.error);
          } else {
            console.log(err);
            throw new Error('Server unavailable. Try again later.');
          }
        }
      );
  }

  public async getSearchOptions(): Promise<SearchOptions[]> {
    const searchOptionsList = [];

    await this.httpClient
      .get(`${environment.apiUrl}search-options`, {observe: 'response'})
      .toPromise()
      .then(
        (res: any) => {
          if (res instanceof HttpResponse && res.body) {
            for (const item of res.body) {
              const searchOptions = new SearchOptions();
              searchOptions.id = item.id;
              searchOptions.title = item.title;
              searchOptions.location = item.location;
              for (const technology of item.technologies) {
                searchOptions.technologies.push(technology.name);
              }
              for (const experienceLevel of item.experienceLevels) {
                searchOptions.experienceLevels.push(experienceLevel.name);
              }
              for (const website of item.websites) {
                searchOptions.websites.push(website.name);
              }
              searchOptionsList.push(searchOptions);
            }
          }
        },
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );

    return searchOptionsList;
  }

  public async getOffers(searchOptionsId: number): Promise<Offer[]> {
    const offerList = [];

    await this.httpClient
      .get(`${environment.apiUrl}search-options/${searchOptionsId}/offers`, {observe: 'response'})
      .toPromise()
      .then(
        (res: any) => {
          if (res instanceof HttpResponse && res.body) {
            for (const item of res.body) {
              const offer = new Offer();
              offer.id = item.id;
              offer.companyName = item.companyName;
              offer.offerName = item.offerName;
              for (const link of item.offerLinks) {
                offer.offerLinks.push(link);
              }
              offer.applied = item.applied;
              offer.skipped = item.skipped;
              offerList.push(offer);
            }
          }
        },
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
    return offerList;
  }

  public async putApplied(searchOptionsId, offerId, value): Promise<void> {
    await this.httpClient
      .put(`${environment.apiUrl}search-options/${searchOptionsId}/offers/${offerId}/applied`, {value}, {observe: 'response'})
      .toPromise()
      .catch(
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
  }

  public async putSkipped(searchOptionsId, offerId, value): Promise<void> {
    await this.httpClient
      .put(`${environment.apiUrl}search-options/${searchOptionsId}/offers/${offerId}/skipped`, {value}, {observe: 'response'})
      .toPromise()
      .catch(
        (err: any) => {
          throw new ResponseInfoError(err);
        }
      );
  }

}
