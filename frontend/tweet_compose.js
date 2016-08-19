class TweetCompose {
  constructor(body) {
    this.$body = $(body);
    this.$form = this.$body.find(".tweet-compose");
    console.log(this.$form);
    // this.$content = $(form).find("textarea");
    // this.$mention = $(form).find("option value");
    // debugger;
    this.$textArea = $("#tweet-text-area");
    this.$mentioned = $("#mentioned-selected");
    this.$form.on("submit", this.composeTweet.bind(this));
    this.$charsLeft = $(".chars-left");
    this.$textArea.on("keyup", (event)=>{
      this.displayCharsRemaining(event);
    });
  }

  composeTweet(event){
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: this.$form.serialize(),
      dataType: "json",
      success: function (tweet) {
        $(":input").prop("disabled", false);
        this.addTweet(tweet);
        this.clearForm();
        // this.render();
      }.bind(this)
    });
    $(":input").prop("disabled", true);
  }

  displayCharsRemaining(event) {
    let lengthOfInput = this.$textArea.val().length;
    this.$charsLeft.text(`Characters remaining: ${140 - lengthOfInput}/140`);
    // debugger;
    // console.log(event);
    // $.ajax({
    //   method: "GET",
    //   url: "",
    //   data: {query: `${that.$input[0].value}`},
    //   dataType: "json",
    //   success: function (response) {
    //     that.renderResults(response);
    //   }
  }

  addTweet (tweet) {
    let newTweet = $("<li></li>");
    let feed = this.$body.find("ul#feed");
    newTweet.text(tweet.content);
    feed.prepend(newTweet);
  }

  clearForm(){
    this.$textArea.val("");
    this.$mentioned.val("");
  }

}


module.exports = TweetCompose;
