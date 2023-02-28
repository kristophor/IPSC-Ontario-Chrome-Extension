function initializeFutureMatchesTable() {
  const matchFutureTable = $("#matchesFuture");
  $('#matchesFuture').before('<h2>Future Matches</h2>');
  if (matchFutureTable === null) {
    return;
  }
  matchFutureTable.addClass("table table-striped");
  const matchFutureTableHeader = matchFutureTable.find("th");
  matchFutureTableHeader.addClass("fw-bold");

  const tableBodyRows = matchFutureTable.find("tbody tr");
  tableBodyRows.each(function () {
    const cells = $(this).find("td");
    cells.each(function () {
      if ($(this).text().trim() === "") {
        $(this).remove();
      }
    });
  });

  matchFutureTable.bootstrapTable({
    search: true,
    pagination: false,
    pageSize: 99999,
    columns: [{
      field: 'date',
      title: 'Date',
      sortable: true
    }, {
      field: 'event',
      title: 'Event',
      sortable: true
    }, {
      field: 'club',
      title: 'Club',
      sortable: true
    }, {
      field: 'name',
      title: 'Name',
      sortable: true
    }, {
      field: 'registration',
      title: 'Registration'
    },{
      field: ' ',
      title: 'favorite'
    }],
    data: tableBodyRows.map(function (index, row) {
      const cells = $(row).find('td');
      const $row = $(row);
      $row.attr('data-index', index);
      $row.attr('data-class', $row.attr('class'));
      return {
        date: $(cells[0]).html(),
        event: $(cells[1]).html(),
        club: $(cells[2]).html(),
        name: $(cells[3]).html(),
        registration: $(cells[4]).html(),
        class: row.getAttribute('class'),
      };
    }).get(),
    rowStyle :  function(row, index) {
      return {
        classes: row.class
      };
    }
  });
}

function initializePastMatchesTable() {
  $('#matchesPast').before('<h2>Past Matches</h2>');
  const matchPastTable = $("#matchesPast");
  if (matchPastTable === null) {
    return;
  }
  matchPastTable.addClass("table table-striped");
  const matchPastTableHeader = matchPastTable.find("th");
  matchPastTableHeader.addClass("fw-bold");

  const tableBodyRows = matchPastTable.find("tbody tr");
  tableBodyRows.each(function () {
    const cells = $(this).find("td");
    cells.each(function () {
      if ($(this).text().trim() === "") {
        $(this).remove();
      }
    });
  });

  matchPastTable.bootstrapTable({
    search: true,
    pagination: false,
    pageSize: 99999,
    columns: [{
      field: 'date',
      title: 'Date',
      sortable: true
    }, {
      field: 'event',
      title: 'Event',
      sortable: true
    }, {
      field: 'club',
      title: 'Club',
      sortable: true
    }, {
      field: 'name',
      title: 'Name',
      sortable: true
    }, {
      field: 'results',
      title: 'Results'
    }],
    data: tableBodyRows.map(function (index, row) {
      const cells = $(row).find('td');
      return {
        date: $(cells[0]).html(),
        event: $(cells[1]).html(),
        club: $(cells[2]).html(),
        name: $(cells[3]).html(),
        results: $(cells[4]).html(),
      };
    }).get()
  });
}

function addWatchButton() {
  // Select the table and iterate over each row
  $("#matchesFuture tbody tr").each(function () {
    var $row = $(this);

    // Check if the match is already in the watched list and update the button text and class accordingly
    chrome.storage.sync.get("watchedMatches", function (data) {
      var watchedMatches = data.watchedMatches || [];
      var matchDate = $row.find("td:eq(0)").text().trim();
        var matchEvent = $row.find("td:eq(1)").text().trim();
        var matchClub = $row.find("td:eq(2)").text().trim();
        var matchName = $row.find("td:eq(3)").text().trim();
      var matchId = CryptoJS.SHA256(matchDate + matchEvent + matchClub + matchName).toString();
      var matchIndex = watchedMatches.findIndex(function (match) {
        return match.id === matchId;
      });

      if (matchIndex !== -1) {
        // Match found in watched list, so update the button text and class
        $row.find(".watch-button")
          .addClass("watch-row")
          .text("unwatch");
      }
    });

    // Create a new button element
    var $button = $("<button>")
      .addClass("btn watch-button")
      .text("watch")
      .click(function (event) {
        // Handle button click event here
        var matchDate = $row.find("td:eq(0)").text().trim();
        var matchEvent = $row.find("td:eq(1)").text().trim();
        var matchClub = $row.find("td:eq(2)").text().trim();
        var matchName = $row.find("td:eq(3)").text().trim();
        var registration = $row.find("td:eq(4)").html().trim();

        var matchId = CryptoJS.SHA256(matchDate + matchEvent + matchClub + matchName).toString();

        chrome.storage.sync.get("watchedMatches", function (data) {
          var watchedMatches = data.watchedMatches || [];

          var matchIndex = watchedMatches.findIndex(function (match) {
            return match.id === matchId;
          });

          if (matchIndex === -1) {
            // Match not found in watched list, so add it
            var match = {
              date: matchDate,
              event: matchEvent,
              club: matchClub,
              name: matchName,
              registration: registration,
              id: matchId
            };

            watchedMatches.push(match);

            chrome.storage.sync.set({ watchedMatches: watchedMatches }, function () {
              console.log("Match added to watched matches:", matchId);
            });

            // Update the button text and class
            $(event.target).addClass("watch-row").text("unwatch");
          } else {
            // Match found in watched list, so remove it
            watchedMatches.splice(matchIndex, 1);

            chrome.storage.sync.set({ watchedMatches: watchedMatches }, function () {
              console.log("Match removed from watched matches:", matchId);
            });

            // Update the button text and class
            $(event.target).removeClass("watch-row").text("watch");
          }
        });
      });

    var $lastTd = $(this).find("td:last");
    // Append the button to a new td element and append the td to the current row
    $lastTd.text("").append($button);
  });
}