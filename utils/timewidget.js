function addClock(){
    const $navbar = $('.navbar');
    var $dateTime = $('<span>').addClass('navbar-text')
    $navbar.append($dateTime);

    // Update the date and time every second
    setInterval(function() {
        var now = new Date();
        $dateTime.text(new Date().toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false
          }));
    }, 1000);
}