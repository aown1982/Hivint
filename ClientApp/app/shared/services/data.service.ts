import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { SubDomain, SubDomainDetails, Pagination, PaginatedResult } from '../interfaces';
import { ItemsService } from '../utils/items.service';
import { ConfigService } from '../utils/config.service';
@Injectable()
export class DataService {

    _baseUrl = '';

       constructor(private http: Http,
        private itemsService: ItemsService,
        private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }

    getSubdomains(url: string, page?: number, itemsPerPage?: number): Observable<PaginatedResult<SubDomainDetails[]>> {

        var paginatedResult: PaginatedResult<SubDomainDetails[]> = new PaginatedResult<SubDomainDetails[]>();

        let headers = new Headers();
        if (page != null && itemsPerPage != null) {
            headers.append('Pagination', page + ',' + itemsPerPage);
        }
        return this.http.get(this._baseUrl + 'SampleData/enumerate/' + url , {
            headers: headers
        }).map((res: Response) => {
            console.log(res.headers.keys());
            paginatedResult.result = res.json();

            if (res.headers.get("Pagination") != null) {
                //var pagination = JSON.parse(res.headers.get("Pagination"));
                var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
                console.log(paginationHeader);
                paginatedResult.pagination = paginationHeader;
            }
            return paginatedResult;
            });
    }

    getSubdomainsIpAddress(subDomain: SubDomainDetails[], page?: number, itemsPerPage?: number): Observable<PaginatedResult<SubDomainDetails[]>> {


        var paginatedResult: PaginatedResult<SubDomainDetails[]> = new PaginatedResult<SubDomainDetails[]>();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');


        if (page != null && itemsPerPage != null) {
            headers.append('Pagination', page + ',' + itemsPerPage);
        }

        return this.http.post(this._baseUrl + 'SampleData/findIPAddresses', JSON.stringify(subDomain), {
            headers: headers
        })
            .map((res: Response) => {
                console.log(res.headers.keys());
                paginatedResult.result = res.json();

                if (res.headers.get("Pagination") != null) {
                    //var pagination = JSON.parse(res.headers.get("Pagination"));
                    var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
                    console.log(paginationHeader);
                    paginatedResult.pagination = paginationHeader;
                }
                return paginatedResult;
            });
    }
}