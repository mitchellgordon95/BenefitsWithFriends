window.fbAfterInit = function () {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            window.location = "main.html";
        }
    });
}
function onlogin() {
    window.location = "main.html";
}

