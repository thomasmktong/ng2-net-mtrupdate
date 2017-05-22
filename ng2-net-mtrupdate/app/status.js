"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status = (function () {
    function Status(
        // Data from Backend
        line, isNormal, latestTweetStr, latestTweetDate, 
        // Data for frontend display, values assigned in service
        lineName, lineColor) {
        this.line = line;
        this.isNormal = isNormal;
        this.latestTweetStr = latestTweetStr;
        this.latestTweetDate = latestTweetDate;
        this.lineName = lineName;
        this.lineColor = lineColor;
    }
    return Status;
}());
exports.Status = Status;
//# sourceMappingURL=status.js.map