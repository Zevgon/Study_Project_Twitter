var FollowToggle = require("./follow_toggle.js");

$(function(){
  $("button.follow-toggle").each( (idx, buttonObject) => {
    new FollowToggle($(buttonObject));
  });
});
