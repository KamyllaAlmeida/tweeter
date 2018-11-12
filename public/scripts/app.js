/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Creating Tweet
 function createTweet(data) {
    const $tweetHeader = $('<header>', {});
    const $image = $('<img />', {
        src: data.user.avatars.regular,
        alt: 'User profile image'
    });

    const $username = $('<span>', { class: 'username' }).append(`<strong>${data.user.name}</strong>`);
    const $handle = $('<span>', { class: 'handle' }).text(data.user.handle);
    $tweetHeader.append($image).append($username).append($handle);
    const $tweetBody = $('<p>', { class: 'tweet-body' }).text(data.content.text);
    const $tweetFooter = $('<footer>', {});
    const numDays = Math.floor((new Date() - new Date(data.created_at)) / 1000 / 60 / 60 / 24);
    const $date = $('<span>', {}).text(`${numDays} days ago`);
    const $buttonGroup = $('<span>', { class: 'button-group hidden' }).append('<i class="fas fa-flag fa-lg"></i><i class="fas fa-retweet fa-lg"></i><i class="fas fa-heart fa-lg"></i>');
    $tweetFooter.append($date).append($buttonGroup);
    const $tweetElement = $('<article>', { class: 'tweet' });
    $tweetElement.append($tweetHeader).append($tweetBody).append($tweetFooter);
    return $tweetElement;
}

//Functionalities of index page
$(document).ready(() => {
    function renderTweets(tweets) {
       const $tweetsContainer = $('#tweets-container');
       $tweetsContainer.empty();
       tweets.forEach((tweet) => {
           $tweetsContainer.append(createTweet(tweet));
       });
   }

   function loadTweets() {
    $.get('/tweets/', (data) => {
      renderTweets(data.reverse());
    });
  }

  $(function() {
    const $button = $('#compose');
    const $container = $('.new-tweet'); 
    $button.on('click', function () {
      $container.toggle();
      $('section.new-tweet textarea').focus();
    });
  });

  $('section.new-tweet form').submit((event) => {
    event.preventDefault();
    const charsUsed = $('section.new-tweet textarea')[0].textLength;
    if (charsUsed === 0) {
      $('#error_msg').html('Enter a message.');
      return;
    } else if (charsUsed > 140) {
      $('#error_msg').html('Your message has exceeded 140 characters.');
      return;
    }
    $.post('/tweets/', $('section.new-tweet form').serialize(), (err, data) => {
      loadTweets();
      if(err) {
        $('#error_msg').html('It was not possible to send the tweet.');
      } else {
        $('section.new-tweet textarea')[0].value = '';
        $('section.new-tweet form .counter')[0].innerHTML = 140;
        $('#error_msg').html('');
      }
    });
  });
  loadTweets();
});

