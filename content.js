// Load required scripts and stylesheets
loadStylesheets([
    // "lib/bootstrap/css/bootstrap.min.css",
    "lib/DataTables/css/jquery.dataTables.min.css",
    "lib/bootstrapTable/bootstrap-table.min.css"
  ]);

loadScripts([
    "lib/bootstrap/js/bootstrap.bundle.min.js",
    "lib/jquery.min.js",
    "lib/DataTables/js/jquery.dataTables.min.js",
    "lib/bootstrapTable/js/bootstrap-table.min.js",
    "utils/matchTable.js"
  ]);
  
  // When the DOM is ready, initialize tables
  $(document).ready(function() {
    // removeStylesheets(["/registration/style/menubar.css"]);
    initializeFutureMatchesTable();
    initializePastMatchesTable();
    // replaceDropdownWithNavbar();
  });
  
  function loadScripts(urls) {
    urls.forEach(function(url) {
      const script = document.createElement("script");
      script.src = chrome.runtime.getURL(url);
      document.head.appendChild(script);
    });
  }
  
  function loadStylesheets(urls) {
    urls.forEach(function(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = chrome.runtime.getURL(url);
      document.head.appendChild(link);
    });
  }

  function removeStylesheets(urls) {
    urls.forEach(function(url) {
      const links = document.querySelectorAll('link[rel="stylesheet"][href*="' + url + '"]');
      for (var i = 0; i < links.length; i++) {
        links[i].remove();
      }
    });
  }
