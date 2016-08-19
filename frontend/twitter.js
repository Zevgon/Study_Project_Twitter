const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$(function(){
  $("button.follow-toggle").each( (idx, buttonObject) => {
    new FollowToggle($(buttonObject));
  });

  $("nav.users-search").each( (idx, nav) => {
    new UsersSearch($(nav));
  });

  $("body").each( (idx, body) => {
    new TweetCompose($(body));
  });
});
