$(document).ready(function() {
	"use strict";
	/*==================================
	    * Author        : "HelloXpert"
	    * Template Name : picasso | HTML Template
	    * Version       : 1.0
	==================================== */
	/*=========== TABLE OF CONTENTS ===========

		01. Home Default Sticky Menu
		02. Home Default Mobile Menu
		03. Scroll To Top
		04. Smooth Scroll
		05. Onepage Corporate Masonery
		06. Onepage Portfolio Masonery
		07. Onepage Photographer Masonery
		08. Onepage Freelancer Masonery
		09. Home Default Masonery Active
		10. Home Boxed Masonery Active
		11. Home Full-Width Masonery Active
		12. Home Graphics Masonery Active
		13. Home Grid Masonery Active
		14. Aency Masonery Active
		15. Home Blog Masonery Active
		16. Portfolio 3 Masonery Active
		17. Blog page Masonery Active
		18. Sidebar Menu
		19. Full Screen Menu
		20. Home Agency Clients Active
		21. Home Default Testimonial
		22. Blog Single Carosel
		23. Testimonial About Me
		24. Testimonial About Us
		25. Shop Page Testimonial 
		26. About Me Client Active
		27. Home Agency Testimonial
		28. Portfolio-1  Single
		29. Portfolio-2  Single
		30. Portfolio-3  Single
		31. Portfolio-4  Single
		32. Shop Single Carosel
		33. Corporate Testimonial
		34. Portfolio Testimonial
		35. Freelancer Testimonial Active
		36. Blog Slide Photographer
		37. Skill Progressbar
		38. Wow Js Active
		39. Home Default Master Slider
		40. Home Boxed Slider
		41. Home Graphics Slider
		42. Home Agecny Slider
		43. Home Blog Slider
		44. OnePage Portfolio Slider
		45. Onepage Corporate Slider
		46. Onepage Freelancer Slider
		47. Onepage Photographer Slider
		48. Paralax Agency Active
		49. Click To Top [Tooltip]
		50. Ripples Effect
		51. Counter Up
		52. Gmaps Active
		53. About Me Skill-Bar Active
		54. MixItUp JS Active
		55. Circliful Js Active
		56. Shop filter Js Active
		57. Quantity Buttons Shop
		58. Show Case Slider Active  
		59. For Navbar-bg Change Js
		60. Preloader

	======================================*/
	/*--------------------------------
	 	01. Home Default Sticky Menu
	----------------------------------*/
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();
		if (scroll < 245) {
			$(".sticky").removeClass("stick");
		} else {
			$(".sticky").addClass("stick");
		}
	});
	/*--------------------------------
	 	02. Home Default Mobile Menu
	---------------------------------*/
	$('.mobile-menu nav').meanmenu({
		meanScreenWidth: '992',
		meanMenuContainer: '.mobile-menu-wrapper',
		meanMenuClose: '<i class="zmdi zmdi-close"></i>',
		meanMenuOpen: '<i class="zmdi zmdi-menu"></i>',
		meanRevealPosition: 'right',
		meanMenuCl8oseSize: '30px',
	});
	/*--------------------------------
	 	03. Scroll To Top
	---------------------------------*/
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 600) {
			$('.return-to-top').fadeIn();
		} else {
			$('.return-to-top').fadeOut();
		}
	});
	$('.return-to-top').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 1500);
		return false;
	});
	/*--------------------------------
	 	04. Smooth Scroll
	---------------------------------*/
	$('a.data-scroll').on("click", function(e) {
		e.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 0
		}, 1500);
	});
	/*--------------------------------
	 	05. Onepage Corporate Masonery
	---------------------------------*/
	$(window).on('load', function() {
		if ($('.corporate-container').length) {
			var $container = $('.corporate-container').isotope({
				itemSelector: '.corporate-item',
				masonry: {
					columnWidth: '.corporate-sizer'
				}
			});
		}
	});
	/*--------------------------------
	 	06. Onepage Portfolio Masonery
	---------------------------------*/
	$('.smith-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.smith-container').length) {
			var $container = $('.smith-container').isotope({
				itemSelector: '.smith-item',
				masonry: {
					columnWidth: '.smith-sizer'
				}
			});
			$('.smith-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.smith-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.smith-menu').find('.title').is(':visible')) $(this).closest('.smith-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	07. Onepage Photographer Masonery
	---------------------------------*/
	$('.photographer-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.photographer-container').length) {
			var $container = $('.photographer-container').isotope({
				itemSelector: '.photographer-item',
				masonry: {
					columnWidth: '.photographer-sizer'
				}
			});
			$('.photographer-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.photographer-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.photographer-menu').find('.title').is(':visible')) $(this).closest('.photographer-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	08. Onepage Freelancer Masonery
	---------------------------------*/
	$('.Freelancer-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.Freelancer-container').length) {
			var $container = $('.Freelancer-container').isotope({
				itemSelector: '.Freelancer-item',
				masonry: {
					columnWidth: '.Freelancer-sizer'
				}
			});
			$('.Freelancer-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.Freelancer-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.Freelancer-menu').find('.title').is(':visible')) $(this).closest('.Freelancer-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	09. Home Default Masonery Active
	---------------------------------*/
	$('.Default-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.Default-container').length) {
			var $container = $('.Default-container').isotope({
				itemSelector: '.Default-item',
				masonry: {
					columnWidth: '.Default-sizer'
				}
			});
			$('.Default-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.Default-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.Default-menu').find('.title').is(':visible')) $(this).closest('.Default-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	10. Home Boxed Masonery Active
	---------------------------------*/
	$('.boXed-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.boXed-container').length) {
			var $container = $('.boXed-container').isotope({
				itemSelector: '.boXed-item',
				masonry: {
					columnWidth: '.boXed-sizer'
				}
			});
			$('.boXed-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.boXed-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.boXed-menu').find('.title').is(':visible')) $(this).closest('.boXed-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	11. Home Full-Width Masonery Active
	---------------------------------*/
	$(window).on('load', function() {
		if ($('.full_width_masonery-container').length) {
			var $container = $('.full_width_masonery-container').isotope({
				itemSelector: '.full_width_masonery-item',
				masonry: {
					columnWidth: '.full_width_masonery-sizer'
				}
			});
		}
	});
	/*--------------------------------
	 	12. Home Graphics Masonery Active
	---------------------------------*/
	$('.Graphics-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.Graphics-container').length) {
			var $container = $('.Graphics-container').isotope({
				itemSelector: '.Graphics-item',
				masonry: {
					columnWidth: '.Graphics-sizer'
				}
			});
			$('.Graphics-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.Graphics-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.Graphics-menu').find('.title').is(':visible')) $(this).closest('.Graphics-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	13. Home Grid Masonery Active
	---------------------------------*/
	$('.Home-Grid-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.Home-Grid-container').length) {
			var $container = $('.Home-Grid-container').isotope({
				itemSelector: '.Home-Grid-item',
				masonry: {
					columnWidth: '.Home-Grid-sizer'
				}
			});
			$('.Home-Grid-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.Home-Grid-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.Home-Grid-menu').find('.title').is(':visible')) $(this).closest('.Home-Grid-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	14. Aency Masonery Active
	---------------------------------*/
	$('.Aency-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.Aency-container').length) {
			var $container = $('.Aency-container').isotope({
				itemSelector: '.Aency-item',
				masonry: {
					columnWidth: '.Aency-sizer'
				}
			});
			$('.Aency-menu a').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.Aency-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.Aency-menu').find('.title').is(':visible')) $(this).closest('.Aency-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	15. Home Blog Masonery Active
	---------------------------------*/
	$(window).on('load', function() {
		if ($('.homEBlog-container').length) {
			var $container = $('.homEBlog-container').isotope({
				itemSelector: '.homEBlog-item',
				masonry: {
					columnWidth: '.homEBlog-sizer'
				}
			});
		}
	});
	/*--------------------------------
        16. Portfolio 3 Masonery Active
	---------------------------------*/
	$(window).on('load', function() {
		if ($('.Portfolio_three-container').length) {
			var $container = $('.Portfolio_three-container').isotope({
				itemSelector: '.Portfolio_three-item',
				masonry: {
					columnWidth: '.Portfolio_three-sizer'
				}
			});
		}
	});
	/*--------------------------------
	 	17. Blog page Masonery Active
	---------------------------------*/
	$(window).on('load', function() {
		if ($('.Blog_page-container').length) {
			var $container = $('.Blog_page-container').isotope({
				itemSelector: '.Blog_page-item',
				masonry: {
					columnWidth: '.Blog_page-sizer'
				}
			});
		}
	});
	/*--------------------------------
	 	17. Angel POrtfolio one Active
	---------------------------------*/
	$(window).on('load', function() {
		if ($('.Angel-container').length) {
			var $container = $('.Angel-container').isotope({
				itemSelector: '.Angel-item',
				masonry: {
					columnWidth: '.Angel-sizer'
				}
			});
		}
	});
	/*--------------------------------
	 	18. Angel POrtfolio two Active
	---------------------------------*/
	//filtration
	$('.pportfolio2-menu .title').on('click', function() {
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});
	$(window).on('load', function() {
		if ($('.pportfolio2-container').length) {
			var $container = $('.pportfolio2-container').isotope({
				itemSelector: '.pportfolio2-item',
				masonry: {
					columnWidth: '.pportfolio2-sizer'
				}
			});
			$('.pportfolio2-menu button').on('click', function() {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				$(this).closest('.pportfolio2-menu').find('.title').text($(this).find('.text').text());
				if ($(this).closest('.pportfolio2-menu').find('.title').is(':visible')) $(this).closest('.pportfolio2-menu').find('.toggle').slideUp();
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		}
	});
	/*--------------------------------
	 	18. Sidebar Menu
	---------------------------------*/
	$("#menu-close").on("click", function(e) {
		e.preventDefault();
		$("#sidebar-wrapper").toggleClass("active");
	});
	$("#menu-toggle").on("click", function(e) {
		e.preventDefault();
		$("#sidebar-wrapper").toggleClass("active");
	});
	/*--------------------------------
	 	19. Full Screen Menu
	---------------------------------*/
	$(".icon").on("click", function(e) {
		$(".mobilenav").fadeToggle(500);
		$(".top-menu").toggleClass("top-animate");
		$(".mid-menu").toggleClass("mid-animate");
		$(".bottom-menu").toggleClass("bottom-animate");
	});
	/*--------------------------------
	 	20. Home Agency Clients Active
	---------------------------------*/
	$('.Agency-Client_img_List').owlCarousel({
		items: 4,
		loop: true,
		margin: 35,
		mouseDrag: false,
		dots: false,
		nav: false,
		smartSpeed: 1000,
		autoplay: true,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 2
			},
			700: {
				items: 3
			},
			800: {
				items: 4
			},
			1024: {
				items: 4
			},
			1200: {
				items: 4
			}
		}
	});
	/*--------------------------------
        21. Home Default Testimonial
	---------------------------------*/
	$("#testimonial-slider").owlCarousel({
		items: 1,
		itemsDesktop: [1000, 1],
		itemsDesktopSmall: [979, 1],
		itemsTablet: [768, 1],
		nav: true,
		navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
		autoplay: true,
		loop: true,
		smartSpeed: 1000,
		mouseDrag: false
	});
	/*--------------------------------
	 	22. Blog Single Carosel
	---------------------------------*/
	$(".Blog_b2_single").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: false,
		mouseDrag: true,
		nav: true,
		smartSpeed: 1000,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
	});
	/*--------------------------------
	 	23. Testimonial About Me
	---------------------------------*/
	$(".slider_about_me").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: true,
		mouseDrag: false,
		smartSpeed: 1000
	});
	/*--------------------------------
	 	24. Testimonial About Us
	---------------------------------*/
	$(".about_us_testionial_item").owlCarousel({
		items: 1,
		autoplay: false,
		loop: true,
		dots: true,
		mouseDrag: false,
		smartSpeed: 1000
	});
	/*--------------------------------
	 	25. Shop Page Testimonial 
	---------------------------------*/
	$(".Shop_Testimonial_active").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		mouseDrag: false,
		smartSpeed: 1000,
		transitionStyle: "fade",
		animateIn: 'fadeIn',
		animateOut: 'fadeOutLeft'
	});
	/*--------------------------------
	 	26. About Me Client Active
	---------------------------------*/
	$('.single_a_me_list').owlCarousel({
		items: 4,
		loop: true,
		margin: 133,
		mouseDrag: true,
		dots: false,
		nav: false,
		smartSpeed: 1000,
		autoplay: true,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 2
			},
			700: {
				items: 3
			},
			800: {
				items: 4
			},
			1024: {
				items: 4
			},
			1200: {
				items: 4
			}
		}
	});
	/*--------------------------------
	 		27. Home Agency Testimonial
		---------------------------------*/
	$(".testimonial_slider_agency").owlCarousel({
		items: 1,
		autoplay: false,
		loop: true,
		dots: true,
		mouseDrag: true,
		smartSpeed: 1000
	});
	/*--------------------------------
	 		28. Portfolio-1  Single
		---------------------------------*/
	$(".portfolio_1_single").owlCarousel({
		items: 1,
		autoplay: false,
		loop: true,
		dots: false,
		mouseDrag: true,
		nav: true,
		smartSpeed: 1000,
		navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
	});
	/*--------------------------------
	 		29. Portfolio-2  Single
		---------------------------------*/
	if ($('.product-gallery_portfolio_2 .bxslider').length > 0) {
		$('.product-gallery_portfolio_2 .bxslider').bxSlider({
			pagerCustom: '.product-gallery_portfolio_2 #bx-pager',
			nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
			prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
			pager: true,
			speed: 1000,
			auto: true,
			autoStart: true
		});
	}
	/*--------------------------------
	 		30. Portfolio-3  Single
		---------------------------------*/
	$(".Portfolio_3_single_active").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: false,
		mouseDrag: true,
		nav: true,
		smartSpeed: 1000,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
	});
	/*--------------------------------
	 		31. Portfolio-4  Single
		---------------------------------*/
	$(".portfolio_4_single").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: false,
		mouseDrag: true,
		nav: true,
		smartSpeed: 1000,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
	});
	/*--------------------------------
	 		32. Shop Single Carosel
		---------------------------------*/
	if ($('.product-gallery_portfolio_3 .bxslider').length > 0) {
		$('.product-gallery_portfolio_3 .bxslider').bxSlider({
			pagerCustom: '.product-gallery_portfolio_3 #bx-pager',
			nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
			prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
			pager: true,
			speed: 1000,
			auto: true,
			autoStart: true
		});
	}
	/*--------------------------------
	 		33. Corporate Testimonial
		---------------------------------*/
	$(".testimonial_corporate_jhon").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: false,
		mouseDrag: false,
		nav: false,
		transitionStyle: "fade",
		animateIn: 'fadeIn',
		animateOut: 'fadeOutLeft'
	});
	/*--------------------------------
	 		34. Portfolio Testimonial
		---------------------------------*/
	$(".testimonial_portfilo_smith").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: false,
		mouseDrag: false,
		nav: false,
		smartSpeed: 1000,
	});
	/*--------------------------------
	 		35. Freelancer Testimonial Active
		---------------------------------*/
	$(".Slider_freelancer").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: false,
		mouseDrag: false,
		nav: false,
		smartSpeed: 1000,
		transitionStyle: "fade",
		animateIn: 'fadeIn',
		animateOut: 'fadeOutLeft'
	});
	/*----------------------------
	 		36. Blog Slide Photographer
		------------------------------ */
	$(".blog_active_pho").owlCarousel({
		items: 1,
		autoplay: false,
		loop: true,
		dots: true,
		mouseDrag: false,
		nav: false,
		smartSpeed: 1000,
	});
	/*----------------------------
	 		37. Portfolio home carosel
		------------------------------ */
	$('.Portfolio_1st_owl').owlCarousel({
		items: 4,
		loop: true,
		autoplay: true,
		smartSpeed: 1000,
		mouseDrag: true,
		margin: 50,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			700: {
				items: 3
			},
			800: {
				items: 4
			},
			1024: {
				items: 4
			},
			1200: {
				items: 4
			}
		}
	})
	//=====owl carousel personal portfolio 5=====
	$('.pp3_all_owl').owlCarousel({
		items: 6,
		loop: true,
		autoplay: true,
		smartSpeed: 1000,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			700: {
				items: 3
			},
			800: {
				items: 4
			},
			1024: {
				items: 6
			},
			1200: {
				items: 6
			}
		}
	})
	/*--------------------------------
	 		37. Skill Progressbar
		---------------------------------*/
	$('.progress .progress-bar').css("width", function() {
		return $(this).attr("aria-valuenow") + "%";
	});
	/*--------------------------------
	 		38. Wow Js Active
		---------------------------------*/
	new WOW().init();
	/*--------------------------------
	 		39. Home Default Master Slider
		---------------------------------*/
	var masterslider_a722 = new MasterSlider();
	masterslider_a722.setup("MS58f6e1d26a722", {
		width: 1550,
		height: 768,
		minHeight: 0,
		space: 0,
		start: 1,
		grabCursor: true,
		swipe: true,
		mouse: true,
		keyboard: true,
		layout: "fullwidth",
		wheel: false,
		autoplay: false,
		instantStartLayers: true,
		mobileBGVideo: false,
		loop: false,
		shuffle: false,
		preload: 0,
		heightLimit: true,
		autoHeight: false,
		smoothHeight: true,
		endPause: false,
		overPause: false,
		fillMode: "fill",
		centerControls: true,
		startOnAppear: false,
		layersMode: "center",
		autofillTarget: "",
		hideLayers: false,
		fullscreenMargin: 0,
		speed: 20,
		dir: "h",
		parallaxMode: 'mouse',
		view: "basic"
	});
	/*----------------------------
			40. Home Boxed Slider
		------------------------------ */
	var Picasso_boxed = jQuery;
	var revapi10585;
	if (Picasso_boxed("#Picasso_boxed_10585").revolution == undefined) {
		revslider_showDoubleJqueryError("#Picasso_boxed_10585");
	} else {
		revapi10585 = Picasso_boxed("#Picasso_boxed_10585").show().revolution({
			sliderType: "standard",
			jsFileLocation: "assets/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 6000,
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [900, 776, 480, 480],
			lazyType: "none",
			parallax: {
				type: "mouse",
				origo: "slidercenter",
				speed: 2000,
				levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 47, 48, 49, 50, 51, 55],
			},
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: 0,
			stopAtSlide: 1,
			shuffle: "off",
			autoHeight: "off",
			fullScreenAutoWidth: "off",
			fullScreenAlignForce: "off",
			fullScreenOffsetContainer: "",
			fullScreenOffset: "60px",
			disableProgressBar: "on",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
			41. Home Graphics Slider
		------------------------------ */
	var Picasso_Graphics = jQuery;
	var revapi10158;
	if (Picasso_Graphics("#Picasso_Graphics_rev_10158").revolution == undefined) {
		revslider_showDoubleJqueryError("#Picasso_Graphics_rev_10158");
	} else {
		revapi10158 = Picasso_Graphics("#Picasso_Graphics_rev_10158").show().revolution({
			sliderType: "standard",
			jsFileLocation: "assets/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 6000,
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [900, 776, 480, 480],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: 0,
			stopAtSlide: 1,
			shuffle: "off",
			autoHeight: "off",
			fullScreenAutoWidth: "off",
			fullScreenAlignForce: "off",
			fullScreenOffsetContainer: "",
			fullScreenOffset: "60px",
			disableProgressBar: "on",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
		42. Home Agecny Slider
	------------------------------ */
	var Home_agency_ = jQuery;
	var revapi11779;
	if (Home_agency_("#rev_slider_agencY_11779").revolution == undefined) {
		revslider_showDoubleJqueryError("#rev_slider_agencY_11779");
	} else {
		revapi11779 = Home_agency_("#rev_slider_agencY_11779").show().revolution({
			sliderType: "standard",
			jsFileLocation: "revolution/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 4000,
			navigation: {
				keyboardNavigation: "off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation: "off",
				mouseScrollReverse: "default",
				onHoverStop: "off",
				touch: {
					touchenabled: "on",
					swipe_threshold: 75,
					swipe_min_touches: 50,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				},
				arrows: {
					style: "uranus",
					enable: true,
					hide_onmobile: true,
					hide_under: 778,
					hide_onleave: true,
					hide_delay: 200,
					hide_delay_mobile: 1200,
					tmp: '',
					left: {
						h_align: "left",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					},
					right: {
						h_align: "right",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					}
				}
			},
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [900, 600, 500, 400],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,
			shuffle: "off",
			autoHeight: "off",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
		43. Home Blog Slider
	------------------------------ */
	var Home_Bolog9 = jQuery;
	var revapi1159;
	if (Home_Bolog9("#rev_home_blog_1159").revolution == undefined) {
		revslider_showDoubleJqueryError("#rev_home_blog_1159");
	} else {
		revapi1159 = Home_Bolog9("#rev_home_blog_1159").show().revolution({
			sliderType: "standard",
			jsFileLocation: "revolution/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 4000,
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [900, 600, 500, 400],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,
			shuffle: "off",
			autoHeight: "off",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
		44. One Page Portfolio Slider
	------------------------------ */
	var Home_Portfolio_S = jQuery;
	var revapi10007;
	if (Home_Portfolio_S("#rev_slider_10007_1_Portfolio").revolution == undefined) {
		revslider_showDoubleJqueryError("#rev_slider_10007_1_Portfolio");
	} else {
		revapi10007 = Home_Portfolio_S("#rev_slider_10007_1_Portfolio").show().revolution({
			sliderType: "standard",
			jsFileLocation: "revolution/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 4000,
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [800, 600, 500, 400],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,
			shuffle: "off",
			autoHeight: "off",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
		45. Onepage Corporate Slider
	------------------------------ */
	var Jhon_Corporate = jQuery;
	var revapi1079;
	if (Jhon_Corporate("#rev_slider_1079_1_corporate").revolution == undefined) {
		revslider_showDoubleJqueryError("#rev_slider_1079_1_corporate");
	} else {
		revapi1079 = Jhon_Corporate("#rev_slider_1079_1_corporate").show().revolution({
			sliderType: "standard",
			jsFileLocation: "revolution/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 4000,
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [900, 600, 500, 400],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,
			shuffle: "off",
			autoHeight: "off",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
			46. Onepage Freelancer Slider
		------------------------------ */
	var freelasncer = jQuery;
	var revapi1079;
	if (freelasncer("#rev_slider_freelanceR").revolution == undefined) {
		revslider_showDoubleJqueryError("#rev_slider_freelanceR");
	} else {
		revapi1079 = freelasncer("#rev_slider_freelanceR").show().revolution({
			sliderType: "standard",
			jsFileLocation: "revolution/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 4000,
			navigation: {
				keyboardNavigation: "off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation: "off",
				mouseScrollReverse: "default",
				onHoverStop: "off",
				touch: {
					touchenabled: "on",
					swipe_threshold: 75,
					swipe_min_touches: 50,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				},
				arrows: {
					style: "uranus",
					enable: true,
					hide_onmobile: true,
					hide_under: 778,
					hide_onleave: true,
					hide_delay: 200,
					hide_delay_mobile: 1200,
					tmp: '',
					left: {
						h_align: "left",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					},
					right: {
						h_align: "right",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					}
				}
			},
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [900, 600, 500, 400],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,
			shuffle: "off",
			autoHeight: "off",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
		47. Onepage Photographer Slider
	------------------------------ */
	var OnePage_photographer = jQuery;
	var revapi1679;
	if (OnePage_photographer("#OnePage_photographer_i1679").revolution == undefined) {
		revslider_showDoubleJqueryError("#OnePage_photographer_i1679");
	} else {
		revapi1679 = OnePage_photographer("#OnePage_photographer_i1679").show().revolution({
			sliderType: "standard",
			jsFileLocation: "revolution/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 4000,
			navigation: {
				keyboardNavigation: "off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation: "off",
				mouseScrollReverse: "default",
				onHoverStop: "off",
				touch: {
					touchenabled: "on",
					swipe_threshold: 75,
					swipe_min_touches: 50,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				},
				arrows: {
					style: "uranus",
					enable: true,
					hide_onmobile: true,
					hide_under: 778,
					hide_onleave: true,
					hide_delay: 200,
					hide_delay_mobile: 1200,
					tmp: '',
					left: {
						h_align: "left",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					},
					right: {
						h_align: "right",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					}
				}
			},
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [800, 600, 500, 400],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,
			shuffle: "off",
			autoHeight: "off",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
			47. Home Portfolio Slider
		------------------------------ */
	var tpj = jQuery;
	var revapi14;
	tpj(document).ready(function() {
		if (tpj("#angel_slider_1071_1").revolution == undefined) {
			revslider_showDoubleJqueryError("#angel_slider_1071_1");
		} else {
			revapi14 = tpj("#angel_slider_1071_1").show().revolution({
				sliderType: "hero",
				jsFileLocation: "//server.local/revslider/wp-content/plugins/revslider/public/assets/js/",
				sliderLayout: "fullscreen",
				dottedOverlay: "none",
				delay: 20000,
				navigation: {},
				responsiveLevels: [1240, 1024, 778, 778],
				visibilityLevels: [1240, 1024, 778, 778],
				gridwidth: [1240, 1024, 778, 480],
				gridheight: [800, 600, 400, 300],
				lazyType: "none",
				parallax: {
					origo: "slidercenter",
					speed: 3000,
					levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 46, 47, 48, 49, 50, 55],
					type: "mouse",
				},
				shadow: 0,
				spinner: "off",
				autoHeight: "off",
				fullScreenAutoWidth: "off",
				fullScreenAlignForce: "off",
				fullScreenOffsetContainer: "",
				fullScreenOffset: "60px",
				disableProgressBar: "on",
				hideThumbsOnMobile: "off",
				hideSliderAtLimit: 0,
				hideCaptionAtLimit: 0,
				hideAllCaptionAtLilmit: 0,
				debugMode: false,
				fallbacks: {
					simplifyAll: "off",
					disableFocusListener: false,
				}
			});
		}
	});
	/*----------------------------
			47. Onepage Photographer Slider
		------------------------------ */
	var OnePage_photographer = jQuery;
	var revapi1679;
	if (OnePage_photographer("#OnePage_photographer_i1679").revolution == undefined) {
		revslider_showDoubleJqueryError("#OnePage_photographer_i1679");
	} else {
		revapi1679 = OnePage_photographer("#OnePage_photographer_i1679").show().revolution({
			sliderType: "standard",
			jsFileLocation: "revolution/js/",
			sliderLayout: "fullscreen",
			dottedOverlay: "none",
			delay: 4000,
			navigation: {
				keyboardNavigation: "off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation: "off",
				mouseScrollReverse: "default",
				onHoverStop: "off",
				touch: {
					touchenabled: "on",
					swipe_threshold: 75,
					swipe_min_touches: 50,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				},
				arrows: {
					style: "uranus",
					enable: true,
					hide_onmobile: true,
					hide_under: 778,
					hide_onleave: true,
					hide_delay: 200,
					hide_delay_mobile: 1200,
					tmp: '',
					left: {
						h_align: "left",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					},
					right: {
						h_align: "right",
						v_align: "center",
						h_offset: 20,
						v_offset: 0
					}
				}
			},
			responsiveLevels: [1240, 1024, 778, 480],
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: [1600, 1024, 778, 480],
			gridheight: [800, 600, 500, 400],
			lazyType: "none",
			shadow: 0,
			spinner: "off",
			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,
			shuffle: "off",
			autoHeight: "off",
			hideThumbsOnMobile: "off",
			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			debugMode: false,
			fallbacks: {
				simplifyAll: "off",
				nextSlideOnWindowFocus: "off",
				disableFocusListener: false,
			}
		});
	}
	/*----------------------------
		48. Paralax Agency Active
	------------------------------ */
	$('#parallaxone').parallax("70%", 0.20);
	$('#parallaxone_service').parallax("70%", 0.20);
	$('#parallaxone_work').parallax("70%", 0.20);
	$('#parallaxone_Skill').parallax("70%", 0.20);
	$('#parallaxone_Team').parallax("70%", 0.20);
	$('#parallaxone_Testimonial').parallax("70%", 0.20);
	$('#parallaxone_Clients').parallax("70%", 0.20);
	/*----------------------------
		49. Click To Top [Tooltip]
	------------------------------ */
	$('[data-toggle="tooltip"]').tooltip();
	/*----------------------------
		50. Ripples Effect
	------------------------------ */
	if (typeof $.fn.ripples == 'function') {
		try {
			$('.ripple').ripples({
				resolution: 500,
				perturbance: 0.04
			});
		} catch (e) {
			$('.error').show().text(e);
		}
	}
	/*----------------------------
			51. Counter Up
	------------------------------ */
	$('.counter').counterUp({
		delay: 10,
		time: 5000
	});
	/*----------------------------
		52. Gmaps Active
	------------------------------ */
	var map;
	var getTile = function(coord, zoom, ownerDocument) {
		var div = ownerDocument.createElement('div');
		div.style.width = this.tileSize.width + 'px';
		div.style.height = this.tileSize.height + 'px';
		div.style.background = 'rgba(7, 7, 7, 0.50)';
		div.style.lineHeight = this.tileSize.height + 'px';
		return div;
	};
	$('.ev-map-display').each(function() {
		var element = $(this).attr('id');
		map = new GMaps({
			el: '#' + element,
			center: new google.maps.LatLng(40.7504864, -74.0014333),
			zoom: 13,
			scrollwheel: false,
			styles: [{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [{
					"color": "#b3b3b3"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e0e0e0"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#a8a8a8"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#dfdfdf"
				}, {
					"lightness": 29
				}, {
					"weight": 0.2
				}]
			}, {
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f8f8f8"
				}, {
					"lightness": 18
				}]
			}, {
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f8f8f8"
				}, {
					"lightness": 16
				}]
			}, {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dfdfdf"
				}, {
					"lightness": 21
				}]
			}, {
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [{
					"color": "#333"
				}, {
					"lightness": 21
				}]
			}, {
				"elementType": "labels.text.stroke",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#dfdfdf"
				}, {
					"lightness": 16
				}]
			}, {
				"elementType": "labels.text.fill",
				"stylers": [{
					"saturation": 36
				}, {
					"color": "#333333"
				}, {
					"lightness": 10
				}]
			}, {
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "on"
				}]
			}, {
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dfdfdf"
				}, {
					"lightness": 19
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#dfdfdf"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#535353"
				}, {
					"lightness": 17
				}, {
					"weight": 1.2
				}]
			}]
		});
		map.addOverlayMapType({
			index: 0,
			tileSize: new google.maps.Size(256, 256),
			getTile: getTile
		});
		map.addMarker({
			lat: 40.7587442,
			lng: -73.9808623,
			title: 'Dhaka',
			icon: 'images/map-marker.png',
		});
	});
	/*----------------------------
		53. About Me Skill-Bar Active
	------------------------------ */
	jQuery('.skillbar').each(function() {
		jQuery(this).find('.skillbar-bar').animate({
			width: jQuery(this).attr('data-percent')
		}, 2000);
	});
	/*----------------------------
		54. MixItUp JS Active
	------------------------------ */
	$('.work-inner').mixItUp();
	/*----------------------------
		55. Circliful Js Active
	------------------------------ */
	$('.single_circle_fr').circliful();
	/*----------------------------
		56. Shop filter Js Active
	------------------------------ */
	$("#slider-range").slider({
		range: true,
		min: 2,
		max: 75,
		values: [2, 75],
		slide: function(event, ui) {
			$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
		}
	});
	$("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
	/*----------------------------
		57. Quantity Buttons Shop
	------------------------------ */
	$(".qtyplus").on("click", function() {
		var b = $(this).parents(".quantity-form").find("input.qty"),
			c = parseInt(b.val(), 10) + 1,
			d = parseInt(b.attr("max"), 10);
		d || (d = 9999999999), c <= d && (b.val(c), b.change())
	});
	$(".qtyminus").on("click", function() {
		var b = $(this).parents(".quantity-form").find("input.qty"),
			c = parseInt(b.val(), 10) - 1,
			d = parseInt(b.attr("min"), 10);
		d || (d = 1), c >= d && (b.val(c), b.change())
	});
	/*----------------------------
		58. Show Case Slider Active  
	------------------------------ */
	Slider.init();
	/*-------------- Pre-loader ------------------*/
	$(window).on('load', function() {
		$("#loading").delay(500).fadeOut(500);
		$("#loading-center").on('click', function() {
			$("#loading").fadeOut(500);
		});
	});
	/*----------------------------
			59. For Navbar-bg Change Js
		------------------------------ */
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 600) {
			$(".Menu_Active_Class").addClass("Menu_Active_bg");
		} else {
			$(".Menu_Active_Class").removeClass("Menu_Active_bg");
		}
	});
	/*----------------------------
		60. Preloader
	------------------------------ */
	jQuery(window).load(function() {
		$('.preloader').fadeOut(2000);
	});
});