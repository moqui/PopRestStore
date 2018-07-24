<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>POP Rest Store</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha256-LA89z+k9fjgMKQ/kq4OO2Mrf8VltYml/VES+Rg0fh20=" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
    <link rel="stylesheet" href="/store/components/styles.css">
    <#-- TODO: refer to specific version to avoid redirect -->
    <#-- TODO: move to load under d.xml -->
    <link rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css">
    <#-- TODO: move to load under d.xml -->
    <script>
        // default store configuration, settings may be reset by script returned by /content/settings.js (transition that calls StoreServices.get#StoreInfo)
        var storeConfig = {
            apiKey: null, moquiSessionToken: null,
            // base path for the router, by default the app page should load from '/store'
            basePath: "/store/d/",
            // REST API base location, default on the same server
            // if the Moqui server is running on a different server use something like "https://api.domain.com/rest/"
            restApiLocation: "/rest/",
            // Content base location for server administered content, points to the content.xml screen
            // this may be a path on the same server or for production preferably a full URL that goes through a caching proxy like CloudFlare
            contentLocation: "/store/content/",
            contentAttachmentLocation: "/store/content/attachment/",
            productImageLocation: "/store/content/productImage/",
            // nav page/etc template locations (may be path or full URL)
            navbarTemplate: "/store/components/template/Navbar.html",
            footerTemplate: "/store/components/template/FooterPage.html",
            homeTemplate: "/store/components/template/HomePage.html",
            searchTemplate: "/store/components/template/SearchPage.html",
            // browse page/etc template locations (may be path or full URL)
            categoryTemplate: "/store/components/template/CategoryPage.html",
            categoryProductTemplate: "/store/components/template/CategoryProduct.html",
            productTemplate: "/store/components/template/ProductPage.html",
            productImageTemplate: "/store/components/template/ProductImage.html",
            productReviewTemplate: "/store/components/template/ProductReview.html",
            starRatingTemplate: "/store/components/template/StarRating.html",
            // buy page/etc template locations (may be path or full URL)
            loginTemplate: "/store/components/template/LoginPage.html",
            resetPasswordTemplate: "/store/components/template/ResetPasswordPage.html",
            accountTemplate: "/store/components/template/AccountPage.html",
            accountCreateTemplate: "/store/components/template/CreateAccountPage.html",
            orderHistoryTemplate: "/store/components/template/OrderHistoryTemplate.html",
            orderDetailTemplate: "/store/components/template/OrderDetailTemplate.html",
            checkoutTemplate: "/store/components/template/CheckoutPage.html",
            checkoutNavbarTemplate: "/store/components/template/CheckoutNavbar.html",
            checkoutSuccessTemplate: "/store/components/template/CheckoutSuccess.html"
        };
    </script>
</head>

<body>
    <div id="store-root">
        ${sri.renderSubscreen()}
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha256-5+02zu5UULQkO7w1GIr6vftCgMfFdZcAHeDtFnKZsBs=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mouse0270-bootstrap-notify/3.1.7/bootstrap-notify.min.js" integrity="sha256-LlN0a0J3hMkDLO1mhcMwy+GIMbIRV7kvKHx4oCxNoxI=" crossorigin="anonymous"></script>

    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script>
    var urlCartAdd = "s1/pop/cart/add";
    var urlAddReview = "s1/pop/products/reviews";
    var urlLogOut = "s1/pop/logout";
    $(document).ready(function() {
        $('.carousel').slick({ infinite: true, slidesToShow: 4, slidesToScroll: 3,
            nextArrow:"<button type='button' class='slick-next'><i class='fas fa-arrow-right'></i></button>",
            prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-arrow-left'></i></button>",
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true } },
                { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        });
        $("#cartAdd").click(function() {
            $.post(storeConfig.restApiLocation + urlCartAdd,$("#cart-add-form").serialize(), function(data) {
                $("#isSuccessAddCart").show();
                var quantity = 0;
                for (var i = 0; i < data.orderItemList.length; i++) {
                    if (data.orderItemList[i].itemTypeEnumId === "ItemProduct") { quantity++; }
                }
                $("#cart-quantity").text(quantity);
            });
        });
        $("#addReview").click(function(){
            $.post(storeConfig.restApiLocation + urlAddReview,$("#product-review-form").serialize(), function(data) {
                $('#product-review-form').trigger("reset");
            });
        });
        $("#logout").click(function(){
            $.get(storeConfig.restApiLocation + urlLogOut, function(data){
                window.location.href = "/store";
                location.reload();
            });
        });
        $("#form-search").submit(function(event){
            event.preventDefault();
            window.location.href = "/store/d#/product/search/" + $(this).serializeArray()[0].value;
        });

        var $starsLi = $('#stars li');
        $starsLi.on('mouseover', function() {
            var onStar = parseInt($(this).data('value'), 10);
            $(this).parent().children('li.star').each(function(e){
                if (e < onStar) { $(this).addClass('hover'); } else { $(this).removeClass('hover'); } });
        }).on('mouseout', function() {
            $(this).parent().children('li.star').each(function(e) { $(this).removeClass('hover'); });
        });
        $starsLi.on('click', function() {
           var onStar = parseInt($(this).data('value'), 10);
           //the number of stars is assigned 
           $("#productRating").val(onStar);
           var stars = $(this).parent().children('li.star');
           for (i = 0; i < stars.length; i++) { $(stars[i]).removeClass('selected'); }
           for (i = 0; i < onStar; i++) { $(stars[i]).addClass('selected'); }
        });
    });
</script>
    <#-- for scripts/etc from d.xml or others, ie client rendered part of site that needs more JS -->
    <#if footerScriptText?has_content>${footerScriptText}</#if>
</body>
</html>
