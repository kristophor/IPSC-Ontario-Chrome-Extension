// Listen for changes to watched matches and send a notification
chrome.storage.onChanged.addListener(function(changes, area) {
    if (area === 'local' && changes.watchedMatches) {
      var watchedMatches = changes.watchedMatches.newValue;
      if (watchedMatches && watchedMatches.length) {
        var lastMatch = watchedMatches[watchedMatches.length - 1];
        var notificationOptions = {
          type: 'basic',
          title: 'Match Added to Watched List',
          message: lastMatch.name,
          iconUrl: 'icon.png',
          requireInteraction: true
        };
        chrome.notifications.create(notificationOptions);
      }
    }
  });
  