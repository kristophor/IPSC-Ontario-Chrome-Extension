function replaceDropdownWithNavbar(){
    console.log('replacing navbar')
    // Extract title, menus, and menu items from the original navbar
    const $navbar = $('.navbar');
    const title = $navbar.find('a:first').text();
    const menus = $navbar.find('.dropdown');
    const menuData = menus.map(function() {
      const menuTitle = $(this).find('button').text().trim();
      const menuItems = $(this).find('.dropdown-content a');
      const menuItemsData = menuItems.map(function() {
        return { title: $(this).text().trim(), href: $(this).attr('href') };
      }).get();
      return { title: menuTitle, items: menuItemsData };
    }).get();

    // Construct Bootstrap 5 navbar using extracted data
    const $nav = $('<nav class="navbar navbar-expand-lg navbar-dark bg-dark"></nav>');
    const $container = $('<div class="container"></div>');
    const $title = $('<a class="navbar-brand" href="#">' + title + '</a>');
    const $toggler = $('<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>');
    const $menuContainer = $('<div class="collapse navbar-collapse" id="navbarContent"></div>');
    const $menuList = $('<ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>');

    for (const menu of menuData) {
      const $menu = $('<li class="nav-item dropdown"></li>');
      const $menuTitle = $('<a class="nav-link dropdown-toggle" href="#" id="' + menu.title.toLowerCase() + 'Menu" role="button" data-bs-toggle="dropdown" aria-expanded="false">' + menu.title + '</a>');
      const $menuItems = $('<ul class="dropdown-menu" aria-labelledby="' + menu.title.toLowerCase() + 'Menu"></ul>');
      for (const item of menu.items) {
        const $menuItem = $('<li><a class="dropdown-item" href="' + item.href + '">' + item.title + '</a></li>');
        $menuItems.append($menuItem);
      }
      $menu.append($menuTitle, $menuItems);
      $menuList.append($menu);
    }

    $menuContainer.append($menuList);
    $container.append($title, $toggler, $menuContainer);
    $nav.append($container);

    // Replace original navbar with Bootstrap 5 navbar
    $navbar.replaceWith($nav);

  }

  function replaceLogout(){
    const $navbar = $('.navbar');
    var $parent = $('header');
    if ($parent.length===0) {
        $parent = $('.ui-widget');
    }
    if ($parent.length === 0) {
        $parent = $("body").find("h3:first");
    }
    if ($parent.length ===0) return
    var $secondDiv = $parent.find('div:contains("Logout")');

    // Extract the logout URL from the script
    var logoutScript = $secondDiv.find('script').text();
    if (logoutScript !== null ){
        var logoutURL = logoutScript.match(/window\.location\s*=\s*"([^"]+)";/)[1];
        var $logoutButton = $('<button>').addClass('nav-item btn btn-outline-warning me-2')
            .text('Logout')
            .click(function() {
                window.location = logoutURL;
        });
        $navbar.append($logoutButton);
    }
    $secondDiv.remove();
  }

  function addTabs() {
    var watchedUrl = chrome.runtime.getURL("watched.html");
    // Define the base URL for all event links
    var baseUrl = "/registration/Calendar.jsp";
  
    // Find the h3 element containing the Upcoming Events links
    var $upcomingEvents = $("h3:contains('Upcoming Events')");
  
    // Create a new ul element to hold the tabs and panels
    var $ul = $("<ul>").addClass("nav nav-tabs");
  
    // Create the "Upcoming Events" tab
    var $upcomingTab = $("<li>").addClass("nav-item").appendTo($ul);
    var $upcomingLinkTab = $("<a>").addClass("nav-link").attr("href", baseUrl).text("Upcoming Events").appendTo($upcomingTab);
  
    // Create the "Future Events" tab and panel
    var futureUrl = baseUrl + "?calendarScope=future";
    var $futureTab = $("<li>").addClass("nav-item").appendTo($ul);
    var $futureLinkTab = $("<a>").addClass("nav-link").attr("href", futureUrl).text("Future Events").appendTo($futureTab);
  
    // Create the "Past Events" tab and panel
    var pastUrl = baseUrl + "?calendarScope=past";
    var $pastTab = $("<li>").addClass("nav-item").appendTo($ul);
    var $pastLinkTab = $("<a>").addClass("nav-link").attr("href", pastUrl).text("Past Events").appendTo($pastTab);
  
    // Create the "Watched Events" tab
    var $watchedTab = $("<li>").addClass("nav-item").appendTo($ul);
    var $watchedLinkTab = $("<a>").addClass("nav-link").attr("href", "#").text("Watched Events").appendTo($watchedTab);

    var $registeredTab = $("<li>").addClass("nav-item").appendTo($ul);
    var $registeredLinkTab = $("<a>").addClass("nav-link").attr("href", "#registered").text("Registered Events").appendTo($registeredTab);

    var $registeredModal = $("<div>").addClass("modal fade").appendTo("body");
    var $registeredModalDialog = $("<div>").addClass("modal-dialog modal-lg").appendTo($registeredModal);
    var $registeredModalContent = $("<div>").addClass("modal-content").appendTo($registeredModalDialog);


    // Replace the original h3 element with the new ul element
    // $upcomingEvents.replaceWith($ul);

    // Add event listeners to the tabs to show the appropriate content
    $upcomingLinkTab.click(function () {
        window.location.href = $(this).attr("href");
    });

    $futureLinkTab.click(function () {
        window.location.href = $(this).attr("href");
    });

    $pastLinkTab.click(function () {
        window.location.href = $(this).attr("href");
    });
    $registeredLinkTab.click(function () {
        // Create the modal dialog
        $registeredModalContent.empty();
    
        // Add a header to the modal dialog
        var $registeredModalHeader = $("<div>").addClass("modal-header").appendTo($registeredModalContent);
        $("<h5>").addClass("modal-title").text("Registered Events").appendTo($registeredModalHeader);
        var $registeredCloseButton = $("<button>").addClass("btn-close").attr("type", "button").attr("data-bs-dismiss", "modal").appendTo($registeredModalHeader);
    
        // Add a body to the modal dialog
        var $registeredModalBody = $("<div>").addClass("modal-body").appendTo($registeredModalContent);
    
        // Select the table and iterate over each row
        var $registeredTable = $("<table>").addClass("table table-striped").appendTo($registeredModalBody);
        var $registeredTableHead = $("<thead>").appendTo($registeredTable);
        var $registeredTableHeaderRow = $("<tr>").appendTo($registeredTableHead);
        $("<th>").text("Date").appendTo($registeredTableHeaderRow);
        $("<th>").text("Event").appendTo($registeredTableHeaderRow);
        $("<th>").text("Club").appendTo($registeredTableHeaderRow);
        $("<th>").text("Name").appendTo($registeredTableHeaderRow);
        $("<th>").text("Registration").appendTo($registeredTableHeaderRow);
    
        var $registeredTableBody = $("<tbody>").appendTo($registeredTable);
    
        $("#matchesFuture tbody tr.registered").each(function () {
            var $row = $(this);
            var $cells = $row.find("td");
            var $newRow = $("<tr>").appendTo($registeredTableBody);
            $("<td>").text($($cells[0]).text().trim()).appendTo($newRow);
            $("<td>").text($($cells[1]).text().trim()).appendTo($newRow);
            $("<td>").text($($cells[2]).text().trim()).appendTo($newRow);
            $("<td>").text($($cells[3]).text().trim()).appendTo($newRow);
            $("<td>").html($($cells[4]).html().trim()).appendTo($newRow);
        });
    
        $registeredModal.modal("show");
    
        $('.modal-backdrop').remove();
        // Remove the modal dialog from the DOM when it is closed
        $registeredModal.on("hidden.bs.modal", function () {
            $(this).remove();
        });
    });

    $watchedLinkTab.click(function () {
        // Create the modal dialog
        var $modal = $("<div>").addClass("modal fade").appendTo("body");
        var $modalDialog = $("<div>").addClass("modal-dialog").appendTo($modal);
        var $modalContent = $("<div>").addClass("modal-content").appendTo($modalDialog);
      
        // Create a table element to hold the watched match data
        var $table = $("<table>").addClass("table table-striped").attr('name', 'watchedTable').appendTo($modalContent);
        var $thead = $("<thead>").appendTo($table);
        var $tr = $("<tr>").appendTo($thead);
        $("<th>").text("Date").appendTo($tr);
        $("<th>").text("Event").appendTo($tr);
        $("<th>").text("Club").appendTo($tr);
        $("<th>").text("Name").appendTo($tr);
        $("<th>").text("Registration").appendTo($tr);
        $("<th>").text("Watch").appendTo($tr);
      
        var $tbody = $("<tbody>").appendTo($table);
      
        // Load the watched matches from storage and add them to the table
        chrome.storage.sync.get("watchedMatches", function (data) {
            console.log(data)
          var watchedMatches = data.watchedMatches || [];
          console.log(watchedMatches)
          watchedMatches.forEach(function (match) {
            var $row = $("<tr>").appendTo($tbody);
            $("<td>").text(match.date).appendTo($row);
            $("<td>").text(match.event).appendTo($row);
            $("<td>").text(match.club).appendTo($row);
            $("<td>").text(match.name).appendTo($row);
            $("<td>").html(match.registration).appendTo($row);
            $("<td>").html('<button type="button" class="btn btn-danger unwatch-button" data-id="' 
                + match.id + '">Unwatch</button></td>').appendTo($row);
          });
        });
      
        // Add a close button to the modal header
        var $modalHeader = $("<div>").addClass("modal-header").appendTo($modalContent);
        var $closeButton = $("<button>")
          .addClass("btn-close")
          .attr({
            "type": "button",
            "data-bs-dismiss": "modal",
            "aria-label": "Close"
          })
          .appendTo($modalHeader);
      
        // Show the modal dialog
        $modal.modal("show");
        $('.modal-backdrop').remove();
        // Remove the modal dialog from the DOM when it is closed
        $modal.on("hidden.bs.modal", function () {
          $(this).remove();
          location.reload();
        });
      });
    $(document).on('click', '.unwatch-button', function(event) {
        var matchId = $(this).data('id');
        console.log(matchId)
        chrome.storage.sync.get('watchedMatches', function (result) {
            var watchedMatches = result.watchedMatches || [];
            var matchIndex = watchedMatches.findIndex(function (match) {
                return match.id === matchId;
            });
        
            if (matchIndex !== -1) {
                watchedMatches.splice(matchIndex, 1);
                chrome.storage.sync.set({ watchedMatches: watchedMatches }, function () {
                    console.log('Match removed from watched matches:', matchId);
                });
                $(event.target).closest('tr').remove();
            }
        });
    });
    // Highlight the active tab
    if (window.location.pathname === baseUrl && !window.location.search) {
        $upcomingLinkTab.addClass("active");
      } else if (window.location.search === "?calendarScope=future") {
        $futureLinkTab.addClass("active");
      } else if (window.location.search === "?calendarScope=past") {
        $pastLinkTab.addClass("active");
      } else if (window.location.pathname === watchedUrl) {
        $watchedLinkTab.addClass("active");
      }
  
    // Replace the original h3 element with the new ul element
    $upcomingEvents.replaceWith($ul);
  
    // Add an event listener to the future, past and watched tab links to redirect to the appropriate URL when clicked
    $futureLinkTab.add($pastLinkTab).add($watchedLinkTab).click(function () {
      window.location.href = $(this).attr("href");
      return false;
    });
  
    // Initialize the Bootstrap 5 tabs
    $ul.tab();
  }