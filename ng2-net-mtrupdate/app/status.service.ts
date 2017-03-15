// Imports
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Status } from './status';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StatusService {

    constructor(private http: Http) { }

    private statusUrl = '/api/Status';

    getStatus(): Observable<Status[]> {
        return this.http.get(this.statusUrl)
            .map((res: Response) => {

                var statusList = res.json();
                for (var eachStatus of statusList) {
                    switch (eachStatus.line) {
                        case 'isline':
                            eachStatus.lineName = 'Island Line';
                            eachStatus.lineColor = '#007DC5';
                            break;
                        case 'ktline':
                            eachStatus.lineName = 'Kwun Tong Line';
                            eachStatus.lineColor = '#00AB4E';
                            break;
                        case 'twline':
                            eachStatus.lineName = 'Tsuen Wan Line';
                            eachStatus.lineColor = '#ED1D24';
                            break;
                        case 'tkline':
                            eachStatus.lineName = 'Tseung Kwan O Line';
                            eachStatus.lineColor = '#7D499D';
                            break;
                        case 'tcline':
                            eachStatus.lineName = 'Tung Chung Line';
                            eachStatus.lineColor = '#F7943E';
                            break;
                        case 'erline':
                            eachStatus.lineName = 'East Rail Line';
                            eachStatus.lineColor = '#53B7E8';
                            break;
                        case 'moline':
                            eachStatus.lineName = 'Ma On Shan Line';
                            eachStatus.lineColor = '#923011';
                            break;
                        case 'wrline':
                            eachStatus.lineName = 'West Rail Line';
                            eachStatus.lineColor = '#A3238F';
                            break;
                        case 'aeline':
                            eachStatus.lineName = 'Airport Express';
                            eachStatus.lineColor = '#00888A';
                            break;
                        case 'disney':
                            eachStatus.lineName = 'Disneyland Resort Line';
                            eachStatus.lineColor = '#F173AC';
                            break;
                        case 'lightrail':
                            eachStatus.lineName = 'Light Rail';
                            eachStatus.lineColor = '#FFFFFF';
                            break;
                    }
                }

                return statusList.filter((s: any) => s.lineName);

            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
