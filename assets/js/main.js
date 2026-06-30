/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			//$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			/*$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.disable-popup', //'.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});*/

	// for the carousel animation
    let currentPosition = 0;

    function moveSlide(direction) {
        const track = document.getElementById('carouselTrack');
        const items = document.querySelectorAll('.carousel-item');

		console.log("Track element found:", track);
        console.log("Number of items found:", items.length);
        if(items.length === 0) { console.error("No items found with class .carousel-item!"); return; }

        const itemWidth = items[0].getBoundingClientRect().width + 20; // card size + flex gap space
		const container = document.querySelector('.carousel-container');

		console.log("Container element found:", container);
        if(!container) { console.error("No container found with class .carousel-container!"); return; }

        const visibleWidth = container.offsetWidth - 80;
        const totalWidth = itemWidth * items.length;
        
        // Calculate max scroll displacement boundary
        const maxScroll = -(totalWidth - visibleWidth - 20);

        // Update tracking calculation index position 
        currentPosition += (direction * -itemWidth);

        // Clamp tracking indices so they don't slide off into empty blank space
        if (currentPosition > 0) {
            currentPosition = 0; // Lock to beginning
        } else if (currentPosition < maxScroll) {
            currentPosition = maxScroll; // Lock to end item card boundary
        }

		console.log("Moving to position:", currentPosition); // Check if position changes
        track.style.transform = `translateX(${currentPosition}px)`;
		
        // Apply physical transform manipulation offset 
        track.style.transform = `translateX(${currentPosition}px)`;
    }
	// ... your existing moveSlide(direction) function code ...
    
    // ATTACH CLICK LISTENERS HERE (Inside the wrapper)
    $('.prev-btn').on('click', function() {
        moveSlide(-1);
    });

    $('.next-btn').on('click', function() {
        moveSlide(1);
    });

})(jQuery);