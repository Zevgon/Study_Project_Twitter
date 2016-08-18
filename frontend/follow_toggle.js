class FollowToggle {
  constructor($object, options) {
    this.$object = $object;
    this.$userId = $object.data().userId || options.userId;
    this.$followState = $object.data().initialFollowState || options.followState;
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
        followToggleObject.$object.prop("disabled", true);
        followToggleObject.render();

        $.ajax({
          method: "POST",
          url: `/users/${followToggleObject.$userId}/follow`,
          dataType: "json",
          success: function (){
            followToggleObject.$followState = "followed";
            followToggleObject.$object.prop("disabled", false);
            followToggleObject.render();
          }
        });
      } else {
        followToggleObject.$followState = "unfollowing";
        followToggleObject.$object.prop("disabled", true);
        followToggleObject.render();

        $.ajax({
          method: "DELETE",
          url: `/users/${followToggleObject.$userId}/follow`,
          dataType: "json",
          success: function () {
            followToggleObject.$followState = "unfollowed";
            followToggleObject.$object.prop("disabled", false);
            followToggleObject.render();
          }
        });
      }
    });
  }

}

module.exports = FollowToggle;
