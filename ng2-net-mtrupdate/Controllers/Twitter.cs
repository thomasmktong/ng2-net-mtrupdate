using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TweetSharp;

namespace ng2_net_mtrupdate.Controllers
{
    public class Twitter
    {
        public static List<Tuple<string, DateTime>> GetTweets()
        {
            string consumerKey = "TUwqOvdVlGYh4LpQl7koqAVis";
            string consumerSecret = "M8EgJItWhyB9vGU2SVRGhs9W8aRYvcxfxy1NhW1oPWWOk4qPrj";
            string accessToken = "238939375-ukYfU9UXZnHEoHZlTeUDwtXm1xzBv7EOGLVnjXTq";
            string accessTokenSecret = "LjMDPOCE6wIyYXVQLX9ybRrdNYgSfcSyKhdkcSTdCCszE";

            var service = new TwitterService(consumerKey, consumerSecret);
            service.AuthenticateWith(accessToken, accessTokenSecret);

            var options = new ListTweetsOnUserTimelineOptions
            {
                ScreenName = "mtrupdate",
                Count = 50,
                ExcludeReplies = true
            };

            var tweets = service.ListTweetsOnUserTimeline(options)
                                .Where(t => t.Language.Equals("en"))
                                .OrderBy(t => t.CreatedDate)
                                .Select(t => new Tuple<string, DateTime>(t.TextAsHtml, t.CreatedDate))
                                .ToList();

            return tweets;
        }
    }
}