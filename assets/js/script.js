var MODULE = (function () {

	var obj = {};

	// Array To store All Recent Viewed Videos
	var emptyArray = [],
			Loadedframe = $('.iframe').find('iframe').attr('src');

	// Go Small Button Functionality
	obj.GoSmall = function() {
		$('.big-video iframe').addClass('smallerframe');
	}

	// Play Sidebar Video in Main Video Box
	obj.playCurrent = function() {
		var sidebarVideo = $(this).siblings('iframe').attr('src');
		var playingVideo = $('.big-video iframe').attr('src');
		var newAttr = sidebarVideo;
		$('.big-video iframe').attr('src', newAttr );
		$(this).parent().remove();
		$('.big-video iframe').removeClass('smallerframe');
	}

	// Function To set And Get All Recent Viewed Videos
	obj.RecentVideos = function() {
		console.log('RecentVideos');
		var	newIframeSrc = $('.iframe').find('iframe').attr('src');

		emptyArray.push( newIframeSrc );
		// On Load Do Not Set LocalStorage Or Cookie
		if ( Loadedframe === newIframeSrc ) {
			// Do Nothing
		} else {
			// Store Recent Videos in Local Storage And Cookie
			localStorage.setItem( "recent", emptyArray );
			document.cookie = "myCookie" + emptyArray;
			console.log('emptyArray', emptyArray);
			obj.OperationWithList();
		}
	}

	// Operation With LocalStorage and Cookies
	obj.OperationWithList = function () {

		// Get Recent Videos From Local Storage
		var localList = localStorage.getItem('recent'),
				NewlocalList = localList.split(','),
				CookieList = document.cookie,
				NewCookieList = CookieList.split(/[ ;,]+/);
				console.log('document.cookie', NewCookieList);

		$('.recently-viewed-list li').remove();
		$('.recently-viewed-cookies li').remove();

		// Add All Recent Videos To This Li LocalStorage
		NewlocalList.forEach( function( element ) {
			$('.recently-viewed-list').append('<li><iframe src="'+ element +'"></iframe></li>');
		});

		// Add All Recent Videos To This Li Cookies
		NewCookieList.forEach( function( element ) {
			$('.recently-viewed-cookies').append('<li><iframe src="'+ element.replace('myCookie', "") +'"></iframe></li>');
		});
	}

	obj.bindevents = function () {
		$('.sidebar > div span').on('click', obj.playCurrent );
		$('.go-small').on('click', obj.GoSmall );
	}

	obj.init = function () {
		obj.bindevents();
		if (document.cookie) {
			obj.OperationWithList();
		}
	}

	obj.init();

	return obj;

})();
