<set field="productStoreId" value="POPC_DEFAULT"/>
<#assign star = 3>
<!--PopcAllProducts-->
<div class="container-fluid features d-none d-sm-none d-md-block" style="margin-top: 135px;">
    <div class="d-flex justify-content-around container">
        <div class="feature ">
            <div class="feature-icon">
                <i class="fa fa-gift" aria-hidden="true"></i>
            </div>
            <div class="feature-info">
                <div class="title text-left">FAST SHIPPING</div>
                <div class="subtitle">Nationwide delivery whitin 3 days</div>
            </div>
        </div>
        <div class="feature ">
            <div class="feature-icon">
                <i class="fa fa-fire" aria-hidden="true"></i>
            </div>
            <div class="feature-info">
                <div class="title text-left">HOT DEALS</div>
                <div class="subtitle">New deals every week</div>
            </div>
        </div>
        <div class="feature ">
            <div class="feature-icon">
                <i class="fa fa-lock" aria-hidden="true"></i>
            </div>
            <div class="feature-info">
                <div class="title text-left">FAST SHIPPING</div>
                <div class="subtitle">Nationwide delivery whitin 3 days</div>
            </div>
        </div>
    </div>
</div>
<div class="container landing-container">
    <div class="text-left mt-3 modal-text">
        This Week's deals
    </div>
    <div class="carousel">
        <#list pcmpList.productList as product>
            <div>
                <a class="category-product" href="/store/product/${product.productId}">
                    <figure class="figure">
                        <img width="90%" 
                        class="figure-img img-fluid"
                        src="/store/content/productImage/${product.smallImageList[0].productContentId}" >
                        <figcaption class="text-left title-product-text figure-caption">${product.productName}</figcaption>
                        <figcaption class="text-left figure-caption">
                            <#if product.numberOfRatings??>
                                <#list 1..5 as x>
                                    <span class="star-rating">
                                        <#if (product.numberOfRatings >= x)>
                                            <i class="fas fa-star"></i>
                                        <#else>
                                            <i class="far fa-star"></i>
                                        </#if>  
                                    </span>
                                </#list>
                            <#else>
                                <#list 1..5 as x>
                                    <span class="star-rating">
                                        <#if (star >= x)>
                                            <i class="fas fa-star"></i>
                                        <#else>
                                            <i class="far fa-star"></i>
                                        </#if>  
                                    </span>
                                </#list>
                            </#if>
                        </figcaption>
                        <figcaption class="text-primary text-left figure-caption">
                            <span class="product-price-text">$${product.price}</span>
                            <span class="product-last-price">
                            <#if product.listPrice??>
                                <del>$${product.listPrice}</del>
                            </#if>
                            </span>
                        </figcaption>
                    </figure>
                </a>
            </div>
        </#list>
    </div>
    <hr/>
    <div class="text-left mt-3 modal-text">
        Best Sellers
    </div>
    <div class="carousel">
        <#list pcmpList.productList as product>
            <div>
                <a class="category-product" href="/store/product/${product.productId}">
                    <figure class="figure">
                        <img width="90%" 
                        class="figure-img img-fluid"
                        src="/store/content/productImage/${product.smallImageList[0].productContentId}" >
                        <figcaption class="text-left title-product-text figure-caption">${product.productName}</figcaption>
                        <figcaption class="text-left figure-caption">
                            <#if product.numberOfRatings??>
                            <#list 1..5 as x>
                                <span class="star-rating">
                                    <#if (product.numberOfRatings >= x)>
                                        <i class="fas fa-star"></i>
                                    <#else>
                                        <i class="far fa-star"></i>
                                    </#if>  
                                </span>
                            </#list>
                            <#else>
                            <#list 1..5 as x>
                                <span class="star-rating">
                                    <#if (star >= x)>
                                        <i class="fas fa-star"></i>
                                    <#else>
                                        <i class="far fa-star"></i>
                                    </#if>  
                                </span>
                            </#list>
                            </#if>
                        </figcaption>
                        <figcaption class="text-primary text-left figure-caption">
                            <span class="product-price-text">$${product.price}</span>
                            <span class="product-last-price">
                            <#if product.listPrice??>
                                <del>$${product.listPrice}</del>
                            </#if>
                            </span>
                        </figcaption>
                    </figure>
                </a>
            </div>
        </#list>
    </div>
    <br>
</div>
