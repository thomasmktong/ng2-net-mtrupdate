"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Imports
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var StatusService = (function () {
    function StatusService(http) {
        this.http = http;
        this.statusUrl = '/api/Status';
    }
    StatusService.prototype.getStatus = function () {
        return this.http.get(this.statusUrl)
            .map(function (res) {
            var statusList = res.json();
            for (var _i = 0, statusList_1 = statusList; _i < statusList_1.length; _i++) {
                var eachStatus = statusList_1[_i];
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
            return statusList.filter(function (s) { return s.lineName; });
        }).catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return StatusService;
}());
StatusService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StatusService);
exports.StatusService = StatusService;
//# sourceMappingURL=status.service.js.map