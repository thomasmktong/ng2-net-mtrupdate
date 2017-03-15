using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;

namespace ng2_net_mtrupdate.Controllers
{
    public class MTR
    {
        public static List<Tuple<string, string>> LINES = new List<Tuple<string, string>>();
        public static List<Tuple<string, string>> STATIONS = new List<Tuple<string, string>>();

        static MTR()
        {
            WebRequest request = WebRequest.Create("http://www.mtr.com.hk/share/customer/js/jplannerdata_en.js");
            ((HttpWebRequest)request).UserAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
            WebResponse response = request.GetResponse();

            Stream stream = response.GetResponseStream();
            using(StreamReader reader = new StreamReader(stream))
            {
                string mtrCodeFile = reader.ReadToEnd();

                Regex regexLines = new Regex("caption[0-9]*\\s*=\\s*\"--(.*?)--\";\\s*style[0-9][\\s\\S]*?lineValue[0-9]*\\s*=\\s\"(.*?)\";", RegexOptions.Multiline | RegexOptions.IgnoreCase);
                Regex regexStations = new Regex("caption[0-9]*\\s*=\\s*\"(.*?)\";\\s*lineValue[0-9]*\\s*=\\s\"(.*?)\";", RegexOptions.Multiline | RegexOptions.IgnoreCase);

                LINES = regexLines.Matches(mtrCodeFile).Cast<Match>()
                                  .Select(m => new Tuple<string, string>(m.Groups[1].Value, m.Groups[2].Value))
                                  .ToList();

                STATIONS = regexStations.Matches(mtrCodeFile).Cast<Match>()
                                        .Select(m => new Tuple<string, string>(m.Groups[1].Value, m.Groups[2].Value))
                                        .ToList();

                // special: add light rail, it is not in MTR's script file
                LINES.Add(new Tuple<string, string>("lightrail", "lightrail"));
                STATIONS.Add(new Tuple<string, string>("light rail", "lightrail"));

                // special: add disney, in MTR script it is called disneyland resort
                // and is part of tung chung line, so may not match all the time
                LINES.Add(new Tuple<string, string>("disney", "disney"));
            }
        }
    }
}