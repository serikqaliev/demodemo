 /*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
;(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.buttons = {
		defaults : {
			skipSingle : false, // disables if gallery contains single image
			position   : 'top', // 'top' or 'bottom'
			tpl        : '<div id="fancy-animspeed"></div><div id="fancybox-buttons"><ul><li><a class="btnPrev" title="" href="javascript:;"></a></li><li><a class="btnPlay" title="" href="javascript:;"></a></li><li><a class="btnNext" title="" href="javascript:;"></a></li><li><a class="btnToggle" title="" href="javascript:;"></a></li><li><a class="btnClose" title="" href="javascript:;"></a></li></ul></div>'
		},

		list : null,
		buttons: null,

		beforeLoad: function (opts, obj) {
			//Remove self if gallery do not have at least two items

			if (opts.skipSingle && obj.group.length < 2) {
				obj.helpers.buttons = false;
				obj.closeBtn = true;

				return;
			}

			//Increase top margin to give space for buttons
			obj.margin[ opts.position === 'bottom' ? 2 : 0 ] += 30;
		},

		onPlayStart: function () {
			if (this.buttons) {
				this.buttons.play.attr('title', '').addClass('btnPlayOn');

                                var div = document.getElementById('fancy-animspeed');
                                if ( div )
                                   {
                                     if ( !div.firstChild )
                                        {
                                          var curr_speed = $.fancybox.opts.playSpeed;

                                          for ( var n = 0; n < 4; n++ )
                                              {
                                                var a = document.createElement('a');
                                                a.href = 'javascript:;';
                                                a.playSpeed = (n==0?500:n*1000);
                                                a.onclick = function(){ $('#fancy-animspeed').children().removeClass('active'); $(this).addClass('active'); $.cookie('fancyanimspeed',this.playSpeed,{expires:365,path:'/',sameSite:'Lax'}); $.fancybox.play(false); $.fancybox.opts.playSpeed = this.playSpeed; $.fancybox.play(true); };
                                                a.appendChild(document.createTextNode(a.playSpeed+'ms'));

                                                if ( curr_speed == a.playSpeed )
                                                   {
                                                     $(a).addClass('active');
                                                   }

                                                div.appendChild(a);
                                              }
                                        }
 
                                     $(div).show();
                                   }
			}
		},

		onPlayEnd: function () {
			if (this.buttons) {
				this.buttons.play.attr('title', '').removeClass('btnPlayOn');

				var div = document.getElementById('fancy-animspeed');
				if ( div )
				   {
   				     $(div).hide();
				   }
			}
		},

		afterShow: function (opts, obj) {
			var buttons = this.buttons;

			if (!buttons) {
				this.list = $(opts.tpl).addClass(opts.position).appendTo('body');

				buttons = {
					prev   : this.list.find('.btnPrev').click( F.prev ),
					next   : this.list.find('.btnNext').click( F.next ),
					play   : this.list.find('.btnPlay').click( F.play ),
					toggle : this.list.find('.btnToggle').click( F.toggle ),
					close  : this.list.find('.btnClose').click( F.close )
				}
			}

			//Prev
			if (obj.index > 0 || obj.loop) {
				buttons.prev.removeClass('btnDisabled');
			} else {
				buttons.prev.addClass('btnDisabled');
			}

			//Next / Play
			if (obj.loop || obj.index < obj.group.length - 1) {
				buttons.next.removeClass('btnDisabled');
				buttons.play.removeClass('btnDisabled');

			} else {
				buttons.next.addClass('btnDisabled');
				buttons.play.addClass('btnDisabled');
			}

			this.buttons = buttons;

			this.onUpdate(opts, obj);
		},

		onUpdate: function (opts, obj) {
			var toggle;

			if (!this.buttons) {
				return;
			}

			toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');

			//Size toggle button
			if (obj.canShrink) {
				toggle.addClass('btnToggleOn');

			} else if (!obj.canExpand) {
				toggle.addClass('btnDisabled');
			}
		},

		beforeClose: function () {
			if (this.list) {
				this.list.remove();
			}

			this.list    = null;
			this.buttons = null;
		}
	};

}(jQuery));
