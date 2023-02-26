function initializeFutureMatchesTable() {
    const matchesFutureTable = document.getElementById("matchesFuture");
  
    matchesFutureTable.classList.add("table", "table-striped");
    const tableHeaders = matchesFutureTable.getElementsByTagName("th");
    for (let i = 0; i < tableHeaders.length; i++) {
      tableHeaders[i].classList.add("fw-bold");
    }
    $(matchesFutureTable).DataTable({
      searching: true,
      lengthMenu: [[-1], ["All"]],
      order: [[0, "asc"]],
      columnDefs: [
        {
          targets: "_all",
          searchable: true,
          orderable: true
        }
      ]
    });
  }
  
  function initializePastMatchesTable() {
    const matchPastTable = $("#matchesPast");
    matchPastTable.addClass("table table-striped");
    const matchPastTableHeader = matchPastTable.find("th");
    matchPastTableHeader.addClass("fw-bold");
  
    const tableBodyRows = matchPastTable.find("tbody tr");
    tableBodyRows.each(function() {
      const cells = $(this).find("td");
      cells.each(function() {
        if ($(this).text().trim() === "") {
          $(this).remove();
        }
      });
    });
  
    matchPastTable.bootstrapTable({
      search: true, 
      pagination: true,
      pageSize: 99999,
      columns: [{
        field: 'date',
        title: 'Date'
      }, {
        field: 'event',
        title: 'Event'
      }, {
        field: 'club',
        title: 'Club'
      }, {
        field: 'name',
        title: 'Name'
      }, {
        field: 'results',
        title: 'Results'
      }],
      data: tableBodyRows.map(function(index, row) {
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