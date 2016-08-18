const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require('./users_search.js');

$(function(){
  $("button.follow-toggle").each( (idx, buttonObject) => {
    new FollowToggle($(buttonObject));
  });

  $("nav.users-search").each( (idx, nav) => {
    new UsersSearch($(nav));
  });
});
