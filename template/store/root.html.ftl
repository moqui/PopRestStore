<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Store</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha256-zVUlvIh3NEZRYa9X/qpNY8P1aBy0d4FrI7bhfZSZVwc=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" integrity="sha256-UK1EiopXIL+KVhfbFa8xrmAWPeBjMVdvYMYkTAEv/HI=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
    <link rel="stylesheet" href="/store/components/styles.css">
</head>

<body>
    <div id="store-root">
        ${sri.renderSubscreen()}
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha256-IeI0loa35pfuDxqZbGhQUiZmD2Cywv1/bdqiypGW46o=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mouse0270-bootstrap-notify/3.1.7/bootstrap-notify.min.js" integrity="sha256-LlN0a0J3hMkDLO1mhcMwy+GIMbIRV7kvKHx4oCxNoxI=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js" integrity="sha256-NXRS8qVcmZ3dOv3LziwznUHPegFhPZ1F/4inU7uC8h0=" crossorigin="anonymous"></script>
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
            window.location.href = "/store/d#/search/" + $(this).serializeArray()[0].value;
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
