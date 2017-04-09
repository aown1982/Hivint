import { Component, trigger, state, transition, animate, style, OnInit, AfterViewInit } from '@angular/core';
import { ItemsService } from '../../shared/utils/items.service';
import { ConfigService } from '../../shared/utils/config.service';
import { NotificationService } from '../../shared/utils/notification.service';
import { DataService } from '../../shared/services/data.service';
import { SubDomain, SubDomainDetails, Pagination, PaginatedResult } from '../../shared/interfaces';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('3s ease-in')
            ]),
            transition('* => void', [
                animate('3s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class HomeComponent implements OnInit {

    public itemsPerPage = 10;
    public totalItems = 0;
    public currentPage = 1;
    apiHost: string;
    subdomains: SubDomainDetails[] = [];
    _url: string;

    constructor(private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService) {
       
    }
    ngOnInit() {
        // this.apiHost = this.configService.getApiHost();

    }


    getSubdomains(url: string) {
        this._url = url;
        this.dataService.getSubdomains(url, this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<SubDomainDetails[]>) => {
                this.subdomains = res.result;// subdomains;
                console.log(this.subdomains[0]);
                this.totalItems = res.pagination.TotalItems;
            },
            error => {
            });
    }

    getIpAddresses() {
        console.log(this.subdomains);
        this.dataService.getSubdomainsIpAddress(this.subdomains, this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<SubDomainDetails[]>) => {
                this.subdomains = res.result;// subdomains;
                console.log(this.subdomains[0]);
                this.totalItems = res.pagination.TotalItems;
            },
            error => {
            });
    }
    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.getSubdomains(this._url);
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
    };





}

