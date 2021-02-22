import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContentService, PublicDataService, UserService } from '@sunbird/core';
import {
  ConfigService, ServerResponse, ICard, NavigationHelperService, ResourceService, BrowserCacheTtlService
} from '@sunbird/shared';


import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { RequestParam, HttpOptions } from '@sunbird/shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CreateFormApiService {
 /**
   * Contains base Url for api end points
  */
  baseUrl: string;
  constructor(public publicDataService: PublicDataService, public http: HttpClient) { }

  //Call to the actual service
  // createForm(payload) {
  //   return this.publicDataService.post(payload).pipe(map(
  //     (formConfig: ServerResponse) => {
  //       console.log('formConfig')
  //      return formConfig;
  //     }));
  // }

    readForm(payload) {
      console.log(payload, 'Read form is executed....');
    return this.publicDataService.post(payload).pipe(map(
      (formConfig: ServerResponse) => {
        console.log('formConfig')
       return formConfig;
      }));
  }


  createForm(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      //Need to add the bearer token
      headers: {
        'Authorization': 'bearer ',
        'Content-Type': 'application/json',
        'X-Authenticated-User-Token': ''
      }
    };
    //'http://localhost:3000/api/data/v1/form/read'
    return this.http.post(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: ServerResponse) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }
}
