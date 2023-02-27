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
    var $header = $('header');
    var $secondDiv = $header.find('div:contains("Logout")');

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