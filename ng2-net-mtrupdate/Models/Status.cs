using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ng2_net_mtrupdate.Models
{
    public class Status
    {
        public string line { get; set; }
        
        public bool isNormal { get; set; }

        public string latestTweetStr { get; set; }

        public DateTime? latestTweetDate { get; set; }
    }
}