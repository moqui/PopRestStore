<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="d-flex flex-column moqui-navbar">
        <div class="container d-flex flex-row main-navbar">
            <a class="navbar-brand d-none d-sm-block"  href="/store">
                <img height="60px" class="moqui-logo moqui-logo1" src="/store/assets/moqui-logo.svg" alt="">
                <span class="font-italic navbar-title">POP Shop</span>
            </a>
            <a class="navbar-brand d-block d-sm-none" href="/store">
                <span class="font-italic navbar-title">POP Shop</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav_collapse1" 
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse collapse">
                <form id="form-search" class="search-input" action="#">
                    <input type="text" placeholder="Search..." name="search" id="search">
                    <button class="search-button" type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </form>
                <!-- Right aligned nav items -->
                <ul class="navbar-nav ml-auto">
                    <div class="text-secondary">
                        <span class="navbar-pop-title">Official POP Merchandise</span>
                        <span class="text-center navbar-pop-subtitle">Quality 100% Guaranted</span>
                    </div>
                </ul>
            </div>
        </div>
        <div id="nav_collapse1" class="container navbar-collapse collapse">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop</a>
                    
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <#list browseCategoriesList.subCategoryList as category>
                            <a class="dropdown-item item-color" href="/store/category/${category.productCategoryId}">
                                ${category.categoryName}
                            </a>
                        </#list>
                    </div>
                </li>

                <#-- TODO: hard coded category ID -->
                <a class="nav-link" href="/store/d#/category/PopcAllProducts">Deals</a>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Customer Service
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item item-color" href="/store/content/help">Help Center</a>
                        <a class="dropdown-item item-color" href="/store/content/help">Delivery Rates</a>
                        <a class="dropdown-item item-color" href="/store/content/help#delivery">Delivery Times</a>
                        <a class="dropdown-item item-color" href="/store/content/help#customer-pick-up">Customer Pick Up</a>
                        <a class="dropdown-item item-color" href="/store/content/help#how-to-pay">How to pay</a>
                        <div role="separator" class="dropdown-divider"></div>
                        <a class="dropdown-item item-color" href="/store/content/about">About POP Shop</a>
                        <a class="dropdown-item item-color" href="/store/content/contact">Contact Us</a>
                    </div>
                </li>
            </ul>

            <!-- Right aligned nav items -->
            <ul class="navbar-nav ml-auto">
                <#if user??>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <#-- TODO: use Person/Org name fields -->
                            <i class="fas fa-user"></i> ${user.userFullName} Account</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item item-color" href="/store/d#/account">Account Settings</a>
                            <a class="dropdown-item item-color" href="/store/d#/orders">My Orders</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item item-color" id="logout">Signout</a>
                        </div>
                    </li>
                <#else>
                    <li class="nav-item">
                        <a href="/store/d#/account/create" class="nav-link">Join Now</a>
                    </li>
                    <li class="nav-item">
                        <a href="/store/d#/login" class="nav-link"><i class="fas fa-user"></i> Sign In</a>
                    </li>
                </#if>

                <li class="nav-item">
                    <a class="nav-link" href="/store/d#/checkout">
                        <span class="cart-quantity" id="cart-quantity">
                            <#assign cartCount = 0>
                            <#-- TODO: show total of quantities for product items only (not shipping, discounts, etc) -->
                            <#if cartList.orderItemList??><#list cartList.orderItemList as item>
                                <#if item.itemTypeEnumId == "ItemProduct"><#assign cartCount = cartCount + (item.quantity!1)></#if></#list></#if>
                            ${cartCount}
                        </span>
                        <i class="fa fa-shopping-cart"></i>  
                        Cart
                    </a>
                </li>
                <li class="nav-item d-block d-sm-block d-md-none">
                    <div class="search-input">
                        <input type="text" placeholder="Search...">
                        <button class="search-button">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
