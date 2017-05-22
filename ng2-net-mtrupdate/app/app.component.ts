import { Component } from '@angular/core';
import { Status } from './status';
import { StatusService } from './status.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    moduleId: module.id,
    providers: [StatusService]
})
export class AppComponent {
    name: string = 'MTR Update';
    status: Status[];

    constructor(private statusService: StatusService) { }

    ngOnInit() {
        this.loadStatus();
    }

    loadStatus() {
        this.statusService.getStatus().subscribe(status => this.status = status, err => { console.log(err) });
    }
}