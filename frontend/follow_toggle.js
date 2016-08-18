class FollowToggle {
  constructor($object) {
    this.$object = $object;
    this.$userId = $object.data().userId;
    this.$followState = $object.data().initialFollowState;
    this.render();
    this.handleClick();
  }

  render () {
    if (this.$followState === "unfollowed") {
      this.$object.text("Follow!");
    } else if (this.$followState === "followed") {
      this.$object.text("Unfollow!");
    } else if (this.$followState === "unfollowing") {
      this.$object.text("Unfollowing");
    } else if (this.$followState === "following") {
      this.$object.text("Following");
    }
  }

  handleClick () {

    let followToggleObject = this;
    this.$object.on("click", function (event) {
      event.preventDefault();

      if (followToggleObject.$followState === "unfollowed") {
        followToggleObject.$followState = "following";
        followToggleObject.render();

        $.ajax({
          method: "POST",
          url: `/users/${followToggleObject.$userId}/follow`,
          dataType: "json",
          success: function (){
            followToggleObject.$followState = "followed";
            followToggleObject.render();
          }
        });
      } else {
        followToggleObject.$followState = "unfollowing";
        followToggleObject.render();

        $.ajax({
          method: "DELETE",
          url: `/users/${followToggleObject.$userId}/follow`,
          dataType: "json",
          success: function () {
            followToggleObject.$followState = "unfollowed";
            followToggleObject.render();
          }
        });
      }
    });
  }

}

module.exports = FollowToggle;
