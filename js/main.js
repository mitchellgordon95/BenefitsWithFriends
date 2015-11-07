window.fbAfterInit = function () {
    // If they're not logged in, redirect to the welcome screen
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('Logged in.');
            // Grab the matches from parse and display them

            // First grab the user's name and id from fb
            FB.api("/me", "get", null, function (me) {
                // Fill out the user's name in the page
                $("#user-name").text(me.name);

                // Load the user's matches by default
                loadMatches(me.id);

                // If they click on the "My Friends" tab, load their friends
                $("#nav-friends").click(function () {loadFriends(me);});
                // If they click on the "My Matches" tab, load their matches 
                $("#nav-matches").click(function () {loadMatches(me);});
            });

            // Grab the user's picture and display it
            FB.api("/me/picture", "get", {type: "normal"}, function(pic) {
                $("#user-img").attr("src", pic.data.url);
            });
        }
        else {
            window.location = "/";
        }
    });

    // Logout link
    $("#logout").click(function () {
        FB.logout(function(resp) {
            window.location = "/";
        });
    });
}
 
Parse.initialize("rWB4sQEkPtLUeIrbx2GpPeNMMDA3EJvKk9r36J0g", "ZRtTy8bml8mfZqIFJDcHHjOtFwgNxulepypqaMwY");

var DTFs = Parse.Object.extend("DTFs");

function resetContent() {
    $("#content-main, #fwb, #owl, #friends").hide(); 
}

function loadMatches(user) {
    resetContent();
    // Use the user's id to see if they've selected any friends
    var query = new Parse.Query(DTFs);
    query.equalTo("user_id", user.id);
    query.find({success: function(dtfs) {
        if (dtfs.length == 0) {
            // Then tell the user they have not selected anyone.
            $("#content-main").text("You haven't selected any friends yet! Click on My Friends to select some.");
            $("#content-main").show();
        }
        else {
            // TODO: Lookup the selected friends to see if they reciprocate
        }

    }, error: function(err) {
        console.log("Error" + JSON.stringify(err));
        $("#content-main").text("Whoops! There was an error. Sorry! Try again later?");
        $("#content-main").show();
    }});
}

function loadFriends(user) {
    resetContent();
    // Use the user's id to see if they've selected any friends
    var query = new Parse.Query(DTFs);
    query.equalTo("user_id", user.id);
    query.find({success: function(dtfs) {
        // Get a list of the user's taggable friends (you can't get a full list of friends any more)
        FB.api("v2.0/me/friends", "get", null, function(friends) {
            console.log(JSON.stringify(friends));
        });

    }, error: function(err) {
        console.log("Error: " + JSON.stringify(err));
        $("#content-main").text("Whoops! There was an error. Sorry! Try again later?");
        $("#content-main").show();
    }});
}
