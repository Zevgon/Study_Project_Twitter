const FollowToggle = require("./follow_toggle.js");
class UsersSearch {
  constructor (nav) {
    // debugger;
    this.$nav = $(nav);
    this.$input = nav.find("input");
    this.$ul = nav.find("ul");
    this.handleInput();
  }

  handleInput(){
    let that = this;
    this.$input.on("keyup", (event) =>{
      $.ajax({
        method: "GET",
        url: "/users/search",
        data: {query: `${that.$input[0].value}`},
        dataType: "json",
        success: function (response) {
          that.renderResults(response);
        }
      });
    });
  }

  renderResults(response) {
    this.$ul.children().remove();
    let that = this;
    response.forEach( user => {
      // debugger;
      let foundUser = $(`<li>${user.username}</li>`);
      let followState = user.followed ? "followed" : "unfollowed";
      // let button = $(`<button class = "follow-toggle"
      // data-user-id = "${user.id}"
      // data-initial-follow-state = ${followState}>
      // </button>`);
      let button = $("<button></button>");
      let toggleButton = new FollowToggle(button, {userId: user.id, followState: followState});
      that.$ul.append(foundUser);
      that.$ul.append(button);
    });
  }


}


module.exports = UsersSearch;
