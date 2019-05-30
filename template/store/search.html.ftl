<#assign
productList = productSearchResults.productList
productListCount = productSearchResults.productListCount
productListPageSize = productSearchResults.productListPageSize
productListPageRangeHigh = productSearchResults.productListPageRangeHigh>

<div>
	<div class="container">
        <div class="container mt-2">
        	<a href="/store" class="customer-link">Home <i class="fas fa-angle-right"></i></a> Search 
        </div>
        <div class="row mt-4">
            <div class="col col-lg-2 col-12">
                <div class="customer-menu">
                    <ul class="deals-ul">
                        <#if (storeInfo.categoryByType.PsctSearch.productCategoryId)??>
                            <li><a href="/store/category/${storeInfo.categoryByType.PsctSearch.productCategoryId}">
                                <i class="fas fa-th"></i> All</a></li>
                        </#if>
                        <#if (storeInfo.categoryByType.PsctPromotions.productCategoryId)??>
                            <li><a href="/store/category/${storeInfo.categoryByType.PsctPromotions.productCategoryId}">
                                <i class="fa fa-fire" aria-hidden="true"></i> Deals</a></li>
                        </#if>
                        <#if (storeInfo.categoryByType.PsctNewProducts.productCategoryId)??>
                            <li><a href="/store/category/${storeInfo.categoryByType.PsctNewProducts.productCategoryId}">
                                <i class="fas fa-tag"></i> New</a></li>
                        </#if>
                        <#if (storeInfo.categoryByType.PsctFeatured.productCategoryId)??>
                            <li><a href="/store/category/${storeInfo.categoryByType.PsctFeatured.productCategoryId}">
                                <i class="fas fa-bullhorn"></i> Best Sellers</a></li>
                        </#if>
                    </ul>
                    <span class="deals-subtitle">Categories</span>
                    <ul class="deals-ul">
                        <#list browseRootCategoryInfo.subCategoryList as category>
                            <li><a href="/store/category/${category.productCategoryId}">${category.categoryName}</a></li>
                        </#list>
                    </ul>
                </div>
            </div>
            <div class="col col-lg-9 offset-lg-1 col-12">
                <br>
                <div class="col col-lg-12 col-12 deals-sellers">
                    <span class="deals-sortby-text col col-lg-4">${productListCount!0} results</span>
                    <!-- <span class="deals-sortby-text col col-lg-3 offset-lg-5">Sort by Best Sellers <i class="fas fa-angle-down"></i></span> -->
                </div>
                <div class="row mt-5">
                    <#list productList![] as localProd>
                        <div class="col col-lg-4 col-md-6 col-6">
                            <a href="/store/product/${localProd.productId}">
                                <div class="category-product">
                                    <figure class="figure">
                                        <#if localProd.mediumImageInfo?? || localProd.smallImageInfo??>
                                            <#assign img = localProd.smallImageInfo! localProd.mediumImageInfo>
                                            <img class="figure-img img-fluid product-img product-small-img"
                                                src="/store/content/productImage/${img.productContentId}"
                                                alt="Product Image">
                                        <#else>
                                            <img class="figure-img img-fluid product-img product-small-img"
                                                src="/store/assets/default.png"
                                                alt="Product Image">
                                        </#if>
                                        <figcaption class="text-left title-product-text figure-caption">${localProd.productName}</figcaption>
                                        <figcaption class="text-left figure-caption">
                                            <!--<#list 1..5 as x>
                                                <span class="star-rating"><i class="fas fa-star"></i></span>
                                            </#list>
                                            <#if localProd.numberOfRatings??>
                                                <span class="text-dark">${localProd.numberOfRatings}</span>
                                            </#if>-->
                                        </figcaption>
                                        <figcaption class="text-primary text-left figure-caption">
                                            <span class="product-price-text">$${localProd.price}</span>
                                            <#if localProd.listPrice??>
                                                <span class="product-last-price"><del>$${localProd.listPrice}</del></span>
                                            </#if>
                                        </figcaption>
                                   </figure>
                                </div>
                            </a>
                        </div>
                    </#list>
                </div>
                <#if productListCount &gt; 0 &amp;&amp; productListPageSize &gt; 0 >
                <nav aria-label="Page navigation" class="<#if productListCount == 0 || productListCount <= 5 >d-none</#if>">
                    <ul class="pagination justify-content-center">
                        <li class="page-item <#if pageIndex?number == 0>disabled</#if>">
                            <a class="page-link" href="/store/search/${searchParameter}?pageIndex=${pageIndex?number - 1}">Previous</a>
                        </li>
                        <#list 0..((productListCount/ productListPageSize) - 1)?floor as n>
                            <li class="page-item <#if pageIndex?number == n>active</#if>">
                                <a class="page-link" href="/store/search/${searchParameter}?pageIndex=${n}">${n + 1}</a>
                            </li>
                        </#list>
                        <li class="page-item <#if productListCount == productListPageRangeHigh>disabled</#if>">
                            <a class="page-link" href="/store/search/${searchParameter}?pageIndex=${pageIndex?number + 1}">Next</a>
                        </li>
                    </ul>
                </nav>
                </#if>
            </div>
        </div>
    </div>
</div>