<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="d-flex flex-column moqui-navbar">
        <div class="container d-flex flex-row main-navbar">         
                <#--  This renders the logo dynamically for the main store  -->
                
            <#assign headerLogoList = sri.getThemeValues("STRT_HEADER_LOGO")>
            <#if headerLogoList?has_content>
                <a href="${sri.buildUrl("/store").getUrl()}" class="navbar-brand d-none d-sm-block">
                    <img height="60px" class="moqui-dynamic" src="${sri.buildUrl(headerLogoList?first).getUrl()}" alt="Home">
                    <span class="font-italic navbar-title">${storeInfo.productStore.storeName}</span>
                </a>
            </#if>
            <a class="navbar-brand d-block d-sm-none" href="/store">
                <span class="font-italic navbar-title">POP Shop</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav_collapse1" 
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse collapse">
                <form id="form-search" class="search-input" action="#">
                    <input type="text" placeholder="Search..." name="search" id="search" value="${(searchParameter!'')?html}">
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
                    <a class="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop <i class="fas fa-angle-down icon-down"></i></a>
                    
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <#list browseRootCategoryInfo.subCategoryList as category>
                            <a class="dropdown-item item-color" href="/store/category/${category.productCategoryId}">
                                ${category.categoryName}
                            </a>
                        </#list>
                    </div>
                </li>

                <#if storeInfo.categoryByType.PsctPromotions??>
                    <a class="nav-link" href="/store/category/${storeInfo.categoryByType.PsctPromotions.productCategoryId}">
                        ${storeInfo.categoryByType.PsctPromotions.categoryName}
                    </a>
                </#if>

                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Customer Service <i class="fas fa-angle-down icon-down"></i>
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
                <#if partyDetail??>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-user"></i> 
                            ${partyDetail.firstName} ${partyDetail.lastName} ${partyDetail.organizationName!} <i class="fas fa-angle-down icon-down"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item item-color" href="/store/d#/account">Account Settings</a>
                            <a class="dropdown-item item-color" href="/store/d#/orders">My Orders</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <form method="get" action="/store/logOut">
                                <button type="submit" class="dropdown-item item-color">Signout</button>
                            </form>
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

                 <#assign cartCount = 0>
                    <#if cartInfo.orderItemList??>
                        <#list cartInfo.orderItemList as item>
                            <#if item.itemTypeEnumId == "ItemProduct">
                                <#assign cartCount = cartCount + (item.quantity!1)>
                            </#if>
                        </#list>
                    </#if>
                <li class="nav-item">
                    <#if cartCount gt 0>
                        <a class="nav-link" href="/store/d#/checkout">
                    <#else>
                        <a class="nav-link pointer" data-toggle="modal" data-target="#emptyCartModal">
                    </#if>
                        <span class="cart-quantity" id="cart-quantity">

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
<div class="modal fade" id="emptyCartModal" tabindex="-1" role="dialog" aria-labelledby="emptyCartModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title justify-content-center" id="emptyCartModalLabel">Your cart is empty.</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        <div class="modal-body">
            Add a product to your cart (or a few!) before going to the check out.
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
</div>
</div>
