<#assign categoryId = category.productCategoryId />
<div>
    <div class="container">
        <div class="container mt-2">
            <a class="customer-link" href="/store">Home <i class="fas fa-angle-right"></i></a>
            <span class="modal-text">${category.categoryName}</span>
        </div>
        <div class="row mt-4">
            <div class="col col-lg-2 col-12">
                <div class="customer-menu">
                    <ul class="deals-ul">
                        <#if (storeInfo.categoryByType.PsctSearch.productCategoryId)??>
                            <li><a <#if storeInfo.categoryByType.PsctSearch.productCategoryId == categoryId>class="category-select"</#if> href="/store/category/${storeInfo.categoryByType.PsctSearch.pseudoId}">
                                <i class="fas fa-th"></i> All</a></li>
                        </#if>
                        <#if (storeInfo.categoryByType.PsctPromotions.productCategoryId)??>
                            <li><a <#if storeInfo.categoryByType.PsctPromotions.productCategoryId == categoryId>class="category-select"</#if> href="/store/category/${storeInfo.categoryByType.PsctPromotions.pseudoId}">
                                <i class="fa fa-fire" aria-hidden="true"></i> Deals</a></li>
                        </#if>
                        <#if (storeInfo.categoryByType.PsctNewProducts.productCategoryId)??>
                            <li><a <#if storeInfo.categoryByType.PsctNewProducts.productCategoryId == categoryId>class="category-select"</#if> href="/store/category/${storeInfo.categoryByType.PsctNewProducts.pseudoId}">
                                <i class="fas fa-tag"></i> New</a></li>
                        </#if>
                        <#if (storeInfo.categoryByType.PsctFeatured.productCategoryId)??>
                            <li><a <#if storeInfo.categoryByType.PsctFeatured.productCategoryId == categoryId>class="category-select"</#if> href="/store/category/${storeInfo.categoryByType.PsctFeatured.pseudoId}">
                                <i class="fas fa-bullhorn"></i> Featured</a></li>
                        </#if>
                    </ul>
                    <hr width="180px" style="margin-left: -15px !important;">
                    <span class="deals-subtitle">Categories</span>
                    <ul class="deals-ul">
                        <#list browseRootCategoryInfo.subCategoryList as category>
                            <li><a <#if category.productCategoryId == categoryId>class="category-select"</#if> href="/store/category/${category.pseudoId}">${category.categoryName}</a></li>
                        </#list>
                    </ul>
                </div>
            </div>
            <div class="col col-lg-9 offset-lg-1 col-12">
                <span class="customer-orders-title">${category.categoryName}</span>
                <br>
                <div class="col col-lg-12 col-12 deals-sellers">
                    <span class="deals-sortby-text col col-lg-4">${productListCount!0} results</span>
                    <!--<span class="deals-sortby-text col col-lg-3 offset-lg-5">Sort by Best Sellers <i class="fas fa-angle-down"></i></span>-->
                </div>
                <div class="row mt-5">
                    <#if productList??>
                        <#list productList as localProd>
                            <div class="col col-lg-4 col-md-6 col-6">
                                <a href="/store/product/${localProd.pseudoId}">
                                    <div class="category-product">
                                        <figure class="figure">
                                            <#if localProd.imageInfo??>
                                                <img class="figure-img img-fluid product-img product-small-img"
                                                    src="/store/content/productImage/${localProd.imageInfo.productContentId}"
                                                    alt="Product Image">
                                            <#else>
                                                <img class="figure-img img-fluid product-img product-small-img"
                                                    src="/store/assets/default.png"
                                                    alt="Product Image">
                                            </#if>
                                            <figcaption class="text-left title-product-text figure-caption">${localProd.productName}</figcaption>
                                            <!--<figcaption class="text-left figure-caption">
                                                <#list 1..5 as x>
                                                    <span class="star-rating"><i class="fas fa-star"></i></span>
                                                </#list>
                                                <#if localProd.numberOfRatings??>
                                                    <span class="text-dark">${localProd.numberOfRatings}</span>
                                                </#if>
                                            </figcaption>-->
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
                    </#if>
                </div>
                <nav aria-label="Page navigation" class="<#if productListPageCount == 1 >d-none</#if>">
                    <ul class="pagination justify-content-center">
                        <li class="page-item <#if productListPageIndex == 0>disabled</#if>">
                            <a class="page-link" href="/store/category/${categoryId}/${productListPageIndex - 1}">Previous</a>
                        </li>
                        <#list 0..productListPageCount-1 as n>
                            <li class="page-item <#if productListPageIndex == n>active</#if>">
                                <a class="page-link" href="/store/category/${categoryId}/${n}">${n + 1}</a>
                            </li>
                        </#list>
                        <li class="page-item <#if productListCount == productListPageRangeHigh>disabled</#if>">
                            <a class="page-link" href="/store/category/${categoryId}/${productListPageIndex + 1}">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>
