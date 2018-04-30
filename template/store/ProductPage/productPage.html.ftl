<#assign star = 5>
<div class="container" style="margin-top: 150px;">
    <a class="customer-link"  href="/store">
        Home 
        <i class="fas fa-angle-right"></i>
    </a>
    <span class="customer-link">All Products <i class="fas fa-angle-right"></i></span>
    <span class="customer-link">Office Supplies</span>
</div>
<div class="container container-text mt-4">
	<div class="row">
		<div class="col col-lg-1">
        	<div>
        		<#list product.contentList as img>
        		<#if img.productContentTypeEnumId == "PcntImageSmall">
          		<img width="200px" height="200px" 
          		    onClick="changeUrl(${img.productContentId})"
            		class="figure-img img-fluid product-img"
            		src="/store/content/productImage/${img.productContentId}"
            		alt="Small Image"> 
            	</#if>
            	</#list>
        	</div>
      	</div>
		<div class="col col-lg-4">
        	<img id="singleImage" class="product-img-select">
      	</div>
      	<div class="col col-lg-4">
        	<p>
          		<span class="product-title">
          			${product.productName}
          		</span>
          		<br>
                <#list 1..5 as x>
                            <span class="star-rating">
                            	<i class="fas fa-star"></i>
                            </span>
                 </#list>
        	</p>
        	<div class="product-description">
        		<#if product.descriptionLong??>
        			${product.descriptionLong}
        		</#if>
        	</div>
      	</div>
      	<div class="col col-lg-3">
      		<div class="card cart-div">
      			<#if product.listPrice??>
          		<span class="save-circle" v-if="product.listPrice">
            		<span class="save-circle-title">SAVE</span>
            		<span class="save-circle-text">$${(product.listPrice - product.price)}</span>
          		</span>
          		</#if>
          <form>
            <div class="form-group col">
              <div class="cart-form-price">
                <p>
                  <span class="price-text">
                    ${product.price}
                  </span> 
                  <#if product.listPrice??>
                  <span>
                    <span class="product-listprice-text">was</span>
                    <del>
                      ${product.listPrice}
                    </del>
                  </span>
                  </#if>
                </p> 
              </div>
              <hr class="product-hr" style="margin-top: -5px;">
              <span class="product-description">On sale until midnight or until stocks last.</span>
              <hr class="product-hr">
            </div>
            <div class="form-group col">
              <span class="product-description">Quantity</span>
              <select class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </form>
        </div>
        <button class="btn cart-form-btn col"> 
          <i class="fa fa-shopping-cart"></i>
          Add to Cart
        </button>
      	</div>
	</div>
	<hr>
</div>


<script>
    var url = "/store/content/productImage/";
    //Default image
	var urlImg = ${product.contentList[0].productContentId};
	var image = document.getElementById('singleImage');
	image.src = url + urlImg;
    function changeUrl(route) {
    	image.src = url + route;
    }
</script>