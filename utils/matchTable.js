function watchMatchTime() {
  // Define the colors we'll use for different states
  const colors = {
    upcoming: 'default',
    approaching: 'light-orange',
    past: 'light-blue',
    registered: 'default',
    default: 'default'
  };

  // Helper function to convert a string like "Sat, Mar 04 20:00" to a Date object
  function parseMatchTime(timeString) {
    const matchTime = new Date(timeString);
    matchTime.setFullYear(new Date().getFullYear()); // assume the match is in the current year
    // console.log(matchTime)
    return matchTime;
  }

  // Helper function to format a Date object as "Sat, Mar 04 20:00"
  function formatMatchTime(matchTime) {
    const options = { weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return matchTime.toLocaleString('en-US', options).replace(',', '');
  }

  // Main code
  const timeThresholdApproaching = 60 * 60 * 1000; // 1 hour
  const timeThresholdPast = -timeThresholdApproaching;
  const now = new Date();
  console.log('start finding match time')
  $('tr').each(function () {
    const $row = $(this);
    const $timeCell = $row.find('td:nth-child(5)');
    const timeString = $timeCell.text().trim().replace('Opens: ', '');
    const matchTime = parseMatchTime(timeString);
    // console.log(now, matchTime)
    // Determine the color based on the match time and registration status
    let color = colors.upcoming;
    if ($row.find('registered').length) {
      color = colors.registered;
    } else if ($row.find('Canceled').length) {
      color = colors.default;
    }else if (now >= matchTime) {
      color = colors.past;
    } else if (matchTime - now <= timeThresholdApproaching) {
      color = colors.approaching;
    }

    // Apply the color to the row
    $row.removeClass(Object.values(colors).join(' ')).addClass(color);

    // Update the time display
    // $timeCell.text('Opens: ' + formatMatchTime(matchTime));
  });

}
function initializeFutureMatchesTable() {
  const matchFutureTable = $("#matchesFuture");
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
    }],
    data: tableBodyRows.map(function (index, row) {
      const cells = $(row).find('td');
      return {
        date: $(cells[0]).html(),
        event: $(cells[1]).html(),
        club: $(cells[2]).html(),
        name: $(cells[3]).html(),
        registration: $(cells[4]).html(),
      };
    }).get()
  });
}

function initializePastMatchesTable() {
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