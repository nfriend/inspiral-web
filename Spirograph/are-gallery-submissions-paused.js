window.gallerySubmissionsAreAllowed = function () {
    return true;

    var allowSubmissions = true;
    var currentHour = (new Date()).getUTCHours();
    if (!allowSubmissions || (currentHour > 2 && currentHour < 15))
        return false;
    else
        return true;
}();