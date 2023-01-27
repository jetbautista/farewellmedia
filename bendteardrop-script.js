$(document).ready(function() {
	/*Sidebar Functions */
	$('.sidebar-nav-list .sidebar-nav-item:first-child').addClass('selected');
	$('.sidebar-nav-list').append('<div class="hide">Submit</div>');

	//Sidebar buttons when click
	$('.sidebar-nav-list .sidebar-nav-item').on('click', function() {
		$(this).addClass('selected').siblings().removeClass('selected');
		var slideIndex = $(this).index();
		$('.main-nav, .bottom-dots').each(function() {
			$(this).children().eq(slideIndex).click();
		});
		$('.sidebar-nav-list .sidebar-nav-item').each(function() {
			var itemIndex = $(this).index();
			if (slideIndex > itemIndex){
				$(this).addClass('checked');
			}else{
				$(this).removeClass('checked');
			}
		});
	});

	//Bottom nav slider next click
	$('.bottom-slide-nav.next').on('click', function() {
		var slideIndex = $('.main-nav').children('.w-active').index();
		$('.main-nav, .bottom-dots, .sidebar-nav-list').each(function() {
			$(this).children().eq(slideIndex).next().click();
		});
	});

	//Bottom nav slider previous click
	$('.bottom-slide-nav.prev').on('click', function() {
		var slideIndex = $('.main-nav').children('.w-active').index();
		$('.main-nav, .bottom-dots, .sidebar-nav-list').each(function() {
			$(this).children().eq(slideIndex).prev().click();
		});
	});
 
	/*End Sidebar Functions*/

	/*Main Product Functions*/
	$('.price').each(function() {
		var price = parseFloat($(this).text());
		$(this).text(price.toLocaleString());
	});

	//Next button custom code
	$('.next-button-wrap').on('click', function() {
		var slideIndex = $('.main-nav').children('.w-active').index();
		$('.main-nav, .bottom-dots, .sidebar-nav-list').each(function() {
			$(this).children().eq(slideIndex).next().click();
		});
	});
	//If product is selected
	$('.input-check').on('click', function() {
		var $this = $(this);
		$this.closest('.product2_item').find('.quantity-wrap').toggleClass('show');
		if ($this.is(':checked')) {
			$('.heading-product-addons').show();
			$this.siblings('.button-select').html('Remove');
			$this.closest('.product2_item').addClass('selected');
			$this.closest('.product2_item').find('.quantity-field').val(1);
		} else {
			$('.heading-product-addons').hide();
			$this.siblings('.button-select').html('Select');
			$this.closest('.product2_item').removeClass('selected');
			$this.closest('.product2_item').find('.quantity-field').val(0);
		}
	});
	

	//Total Est. Price
	$('.input-check, .quantity-field').change(function() {
		var sum = 0;
		var trailerTextFormat = $('#product-price').text().replace(/,/g, '');
		var trailerPrice = parseFloat(trailerTextFormat);
		$('.input-check').each(function() {
			productPrice = parseFloat($(this).val());
			originalPrice = $(this).closest('.product2_item').find('.input-check').val();			
			quantity = $(this).closest('.product2_item').find('.quantity-field').val();
			if ($(this).is(':checked')) {
				productTotal = productPrice * quantity;
				$(this).closest('.product2_item').find('.price').text(productTotal.toLocaleString());
				sum += productTotal;
				
			} else {
				$(this).closest('.product2_item').find('.price').text(originalPrice.toLocaleString());
			}
		});
		sum += trailerPrice;
		$('#total, .price.total').text( sum.toLocaleString() );
		$('#form-total').val( sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );	
		
	});

	$('.input-check').on('click', function() {
		var productName =  $(this).closest('.product2_item').find('.input-check').attr('name');	
		var quantity = $(this).closest('.product2_item').find('.quantity-field').val();
		productTotal =   $(this).closest('.product2_item').find('.price').text();		
		var qtyProductPrice = quantity + 'x ' + productName + ': ' + productTotal;		

		//Append in the sidebar and form
		$(".slider-details .form-product-addons-list, .sidebar-nav-item.selected .product-addons-list")
			.append('<div class="addon-item" data-name="'+productName+'"><a href="#" class="addon-item-remove w-inline-block"></a><div class="addon-item-name">'+qtyProductPrice+'</div>');    
		formAppend = $('.slider-details .form-product-addons-list .addon-item[data-name="' + productName + '"]');
		sidebarAppend = $('.sidebar-nav-item .addon-item[data-name="' + productName + '"]');
		if ( $(this).is(':checked')) {
			formAppend.remove();
			sidebarAppend.remove();
			$(".slider-details .form-product-addons-list, .sidebar-nav-item.selected .product-addons-list")
				.append('<div class="addon-item" data-name="' + productName + '"><a href="#" class="addon-item-remove w-inline-block"></a><div class="addon-item-name">' + qtyProductPrice + '</div>'); 
		}else{
			formAppend.remove();
			sidebarAppend.remove();
			console.log('remove');
		}
	});

	$('.quantity-field').on('change', function() {
		var productName =  $(this).closest('.product2_item').find('.input-check').attr('name');	
		var quantity = $(this).closest('.product2_item').find('.quantity-field').val();
		productTotal =   $(this).closest('.product2_item').find('.price').text();		
		var qtyProductPrice =  quantity+'x '+ productName+': '+productTotal;		
		//Append in the sidebar and form
		$(".slider-details .form-product-addons-list, .sidebar-nav-item.selected .product-addons-list")
			.append('<div class="addon-item" data-name="'+productName+'"><a href="#" class="addon-item-remove w-inline-block"></a><div class="addon-item-name">'+qtyProductPrice+'</div>');    
		formAppend = $('.slider-details .form-product-addons-list .addon-item[data-name="' + productName + '"]');
		sidebarAppend = $('.sidebar-nav-item .addon-item[data-name="' + productName + '"]');
		if ($(this).closest('.product2_item').find('.quantity-field:checked') ) {
			formAppend.remove();
			sidebarAppend.remove();
			$(".slider-details .form-product-addons-list, .sidebar-nav-item.selected .product-addons-list")
			.append('<div class="addon-item" data-name="'+productName+'"><a href="#" class="addon-item-remove w-inline-block"></a><div class="addon-item-name">'+qtyProductPrice+'</div>'); 
			
		}else{
			formAppend.remove();
			sidebarAppend.remove();
			console.log('remove');
		}
	});

	//Button remove product item
	$('.customization-sidebar-content').on('click', '.addon-item-remove', function() {
		var dataName = $(this).parent('.addon-item').attr('data-name');
		$('.product2_item').find('input[name="' + dataName + '"]').click();

	});
	$('.quantity-field').on('input', function() {
		if (this.value > this.max) {
			this.value = this.max;
		}
	});
	/*End of Main Product Functions*/

	/*Customization form Functions*/
	//retrieved product data from local storage
	var product = JSON.parse(localStorage.getItem('product'));
	if (product) {
		$('.main-product-title').text(product.name);
		$('#form-trailer').val(product.name + ': $' + product.price);
		$('#form-main-product').text(product.name + ': $' + product.price);
		$('#product-price, #total, .price.total').text(product.price);
		$('#form-total').val('$' + product.price);
		$('#size').text(product.size);
		$('#weight').text(product.weight);

	}else{
		window.location.replace("/customize-trailer");
	}

	$('.input-hidden').prop('readonly', true).prop('hidden', true);
	$('.customization-main-wrapper').on('click', '.next-button-wrap, .sidebar-nav-wrap, .bottom-slide-nav, .mobile-nav-slide-item', function() {
		if ($('.main-nav .w-slider-dot:last-child').hasClass('w-active')) {
			$('.next-text').text('Submit');	
			$('.next-button-wrap').addClass('form-submit');
		} else {
			$('.next-text').text('Next');
			$('.next-button-wrap').removeClass('form-submit');
		}
		//Validate form on load
		$(':input[required]').each(function() {
			if ($(this).val() == '') {
				$('.form-submit').addClass('disabled');
				$('#hidden-submit').prop('disabled', true).addClass('disabled');
			} else {
				$('.form-submit').removeClass('disabled');
				$('#hidden-submit').prop('disabled', false).removeClass('disabled');
			}
		});
		//Hide products depends on the trailer selection 
		$('.product-cat').each(function() {
			if ($('#product-name').text() === $(this).text()) {
				$(this).closest('.product2_item').hide();
			}
		});
	});
		
	//When form is submitted
	$('.customization-main-wrapper').on('click', '.form-submit', function() {
		$('input[type="submit"]').click();
	});
	//Form validation
	$('input[required]').change(function() {
		if ($('input[type="text"]:required').val() &&
			$('input[type="email"]:required').val() &&
			$('input[type="tel"]:required').val()) {

			$('.form-submit').removeClass('disabled');
			$('#hidden-submit').prop('disabled', false);
			
			$('input[type="submit"]').on('click', function() {
				$('input[type="checkbox"]').remove(); //Remove empty fields
			});
		} else {
			$('.form-submit').addClass('disabled');
			$('#hidden-submit').prop('disabled', true);
		}
	});
	/*Customization form Functions*/
	/** Mobile Nav Slider **/
	if ($(window).width() <= 479) {
		
		//Change hero banner image on Mobile nav & next
		$('.mobile-nav-mask .w-slide[aria-hidden="true"]').addClass('not-active');
		$('.customization-main-wrapper').on('click', '.next-button-wrap, .bottom-slide-nav, .mobile-nav-slide-item', function() {
			// Get a reference to all elements with the class '.mobile-nav-slide-item'
			const slideItems = $('.mobile-nav-mask .w-slide, .slider-mask .w-slide');

			// Loop through each element
			slideItems.each(function() {
				// Check if the element has the attribute 'aria-hidden'
				if ($(this).attr('aria-hidden')) {
					// If it does, add the class 'hidden' to the element
					$(this).addClass('not-active');
					$(this).removeClass('active');
				} else {
					// If it does not, remove the class 'hidden' from the element
					$(this).removeClass('not-active');
					$(this).addClass('active');
					$(this).find('.product2_item:first-child').click();
				}
			});
		});
		
		//If mobile nav slide item is click
		$('.mobile-nav-slide-item').on('click', function() {
			var slideIndex = $(this).index();
			$('.main-nav, .bottom-dots').each(function() {
				$(this).children().eq(slideIndex).click();
			});
			$(this).removeClass('not-active').siblings().addClass('not-active');
		});

		//Hero banner image change when product item is click
		$(window).on('load', function() {
			$('.slider-mask .w-slide:first-child .product2_item:first-child').click();
			$('.slider-mask .w-slide:first-child').addClass('active');

			//Hide products depends on the trailer selection 
			$('.product-cat').each(function() {
				if ($('#product-name').text() === $(this).text()) {
					$(this).closest('.product2_item').hide();
				}
			});
		});
		$('.product2_item').click(function() {
			var title = $(this).find('.grid-product-title').text();
			var image = $(this).find('.product2_image').attr('src');
			$('.hero-title').text(title);
			$('.hero-img').attr('src', image);
		});


		//Hero banner image change when scrolled
		let offset = 130;
		$('.customization-main-wrapper').scroll(function() {
			// Get the scroll position of the container
			var heroImageHeight = $('.mobile-hero-fixed').height();
			var sectionSlideWrap = $('.custom-slide.w-slide.active .product2_list').height();

			//Add bottom padding to the product listing
			$('.customization-main-content').css('padding-bottom', sectionSlideWrap + 'px');
			
			// Iterate over all the sections in the container
			$('.w-slide.active .product2_item').each(function() {
				// Get the position and height of the current product
				var sectionPos = $(this).offset().top;
				var sectionProduct = $(this).height();

				// Check if the section is currently visible on the screen
				let newStartingPosition = heroImageHeight + offset;
				let itemPosition = sectionPos + sectionProduct;

				if (newStartingPosition > itemPosition) {
					
					var title = $(this).find('.grid-product-title').text();
					var image = $(this).find('img').attr('src');

					$('.hero-title').text(title);
					$('.hero-img').attr('src', image);
				}
			});
		});

		$('.mobile-navigation-slider-wrap').click(function() {
			$('.customization-main-wrapper').scrollTop(50)
		});
	}
	/**End of Mobile Nav Slider **/
});
