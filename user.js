$(document).ready(function() {

    // popup bio for speakers
    $('.speaker').each(function() {
	      var $this = $(this);
	      $this.popover({
            html: true,
            trigger: 'manual',
            animation: false,
            placement: 'top',
 	          title: $this.find('.speaker-name').html(),
            content: $this.find('.speaker-bio').html()
        }).on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(this).siblings(".popover").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function () {
            var _this = this;
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(_this).popover("hide")
                }
            }, 100);
        });
	  });

    // toggle show/hide abstract for a talk
    $('.talk').click(function() {
	      $(this).next().toggle();
    });
    $('.abstract').click(function() {
	      $(this).toggle();
    });
    // auto toggle abstract on direct links
    $(window).on( 'hashchange', function(e) {
	      e.preventDefault();
        var hash = location.hash;
        console.log('hash changed to ' + hash);
        if (hash.startsWith("#talk-2-")) {
            console.log('opening talk abstract for ' + hash);
            $(hash).next().toggle();
        }
    });
    $('.point-to-abstract').click(function(event) {
        event.preventDefault();
        console.log($(this).attr('id'));
        window.location.hash = $(this).attr('id').replace('schedule', 'talk');
        return false;
    });

    $(".sidebar").on("activate", function(){
	      $(".usermenu li a i").removeClass("icon-white");
	      $(".usermenu li.active a i").addClass("icon-white")
    });

    //fancy scrolling animation	
    $('.usermenu li a').on('click', function(e) {
	      // prevent default anchor click behavior
	      e.preventDefault();

	      // store hash
	      var hash = this.hash;

	      // animate
	      $('html, body').animate({
	          scrollTop: $(this.hash).offset().top
	      }, 500, function(){
	          // when done, add hash to url
	          // (default click behaviour)
	          window.location.hash = hash;
	      });
    });	

    //see https://github.com/twitter/bootstrap/issues/6350
    $('[data-clampedwidth]').each(function () {
	      var elem = $(this);
	      var parentPanel = elem.data('clampedwidth');
	      var resizeFn = function () {
	          var sideBarNavWidth = $(parentPanel).width() - parseInt(elem.css('paddingLeft')) - parseInt(elem.css('paddingRight')) - parseInt(elem.css('marginLeft')) - parseInt(elem.css('marginRight')) - parseInt(elem.css('borderLeftWidth')) - parseInt(elem.css('borderRightWidth'));
	          elem.css('width', sideBarNavWidth);
	      };

	      resizeFn();
	      $(window).resize(resizeFn);
    });	

});
