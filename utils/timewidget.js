function addClock(){
    if ($(location).attr('href').indexOf("Calendar.jsp") === -1) return
    var $uiWidget = $('div.ui-widget');
    var $h3 = $uiWidget.find('h3').first();
    var $newH3 = $('<div>').css('float', 'left').text($h3.text())
    var $dateTime = $('<div>').css('float', 'right');
    var $container = $('<div>').css('overflow', 'hidden').append($newH3).append($dateTime);

    $h3.replaceWith($container);

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