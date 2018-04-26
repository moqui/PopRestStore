<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="d-flex flex-column moqui-navbar">
        <div class="container d-flex flex-row main-navbar">
            <a class="navbar-brand" :to="'/'" >
                <img height="60px" class="moqui-logo moqui-logo1" src="/store/assets/moqui-logo.svg" alt="">
                <span class="font-italic navbar-title">POP Shop</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav_collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div  id="nav_collapse" class="navbar-collapse collapse">
                <div class="search-input">
                    <input type="text" placeholder="Search...">
                    <button class="search-button">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <!-- Right aligned nav items -->
                <ul class="navbar-nav ml-auto">
                    <div class="text-secondary">
                        <span class="navbar-pop-title">Official POP Merchandise</span>
                        <span class="text-center navbar-pop-subtitle">Quality 100% Guaranted</span>
                    </div>

                </ul>

            </div>
        </div>
        <div v-if="subBar" class="container d-flex flex-row">
            <ul class="navbar-nav">

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Shop
                    </a>
                    
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <#list categoriesList.subCategoryList as category>
                        <a class="dropdown-item" href="#">
                            ${category.categoryName}
                        </a>
                        </#list>
                    </div>
                </li>

                <a class="nav-link">
                    Deals 
                </a>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Customer Service
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item">
                            Help Center 
                        </a>
                        <a class="dropdown-item">
                            Delivery Rates 
                        </a>
                        <a class="dropdown-item">
                            Delivery Times  
                        </a>
                        <a class="dropdown-item">
                            Customer Pick Up 
                        </a>
                        <a class="dropdown-item">
                            How to pay 
                        </a>
                        <a class="dropdown-item">
                            About POP Shop 
                        </a>
                        <a class="dropdown-item">
                            Contact Us 
                        </a>
                    </div>
                </li>
            </ul>


            <!-- Right aligned nav items -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        User
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item">
                            Account Settings 
                        </a>
                        <a class="dropdown-item">
                            My Orders
                        </a>
                    <a class="dropdown-item" href="#">Signout</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link">
                        <i class="fa fa-shopping-cart"></i>  
                        Cart
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>