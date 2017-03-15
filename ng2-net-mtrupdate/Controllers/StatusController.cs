using ng2_net_mtrupdate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ng2_net_mtrupdate.Controllers
{
    public class StatusController : ApiController
    {
        // GET: api/Status
        public IEnumerable<Status> Get()
        {
            var toReturn = MTR.LINES.ToDictionary(l => l.Item2, l => new Status() { line = l.Item2 });

            // see if MTR line or station names are mentioned
            // store latest tweet for each line

            var tweets = Twitter.GetTweets();
            foreach (var eachTweet in tweets)
            {
                foreach (var eachName in MTR.LINES.Union(MTR.STATIONS))
                {
                    if (eachTweet.Item1.IndexOf(eachName.Item1, StringComparison.OrdinalIgnoreCase) != -1)
                    {
                        toReturn[eachName.Item2].latestTweetStr = eachTweet.Item1;
                        toReturn[eachName.Item2].latestTweetDate = eachTweet.Item2;
                    }
                }
            }

            // determine if status is good or fail, return right away.
            // here we assume good status is overriding because there
            // could be messages like "the faulty xxx is resumed..."

            var wordsGood = new string[] { "good service", "resume", "resolve" };
            var wordsBad = new string[] { "delay", "fail", "faulty", "disrupt", "accident" };

            foreach (var eachStatus in toReturn.Values)
            {
                eachStatus.isNormal = true;

                if (!string.IsNullOrWhiteSpace(eachStatus.latestTweetStr))
                {
                    foreach (string eachBadWord in wordsBad)
                    {
                        if (eachStatus.latestTweetStr.IndexOf(eachBadWord, StringComparison.OrdinalIgnoreCase) != -1)
                        {
                            eachStatus.isNormal = false;
                            break;
                        }
                    }

                    foreach (string eachGoodWord in wordsGood)
                    {
                        if (eachStatus.latestTweetStr.IndexOf(eachGoodWord, StringComparison.OrdinalIgnoreCase) != -1)
                        {
                            eachStatus.isNormal = true;
                            break;
                        }
                    }
                }
            }

            return toReturn.Values;
        }
    }
}
