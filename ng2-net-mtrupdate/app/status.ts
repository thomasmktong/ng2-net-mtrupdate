export class Status {
    constructor(

        // Data from Backend
        public line: string,
        public isNormal: boolean,
        public latestTweetStr: string,
        public latestTweetDate: Date,

        // Data for frontend display, values assigned in service
        public lineName: string,
        public lineColor: string
    ) { }
}