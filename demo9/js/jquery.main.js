$(document).ready(function() {
	resizeHeadTabs();
	initHeight();
	customOnResize();
	if ($('.resizable').size()) {
		initResize();
	}
	$(window).resize(function(event) {
		resizeHeadTabs();
		initHeight();
		initSly();
		customOnResize();
	});
	$(window).load(function() {
		initHeight();
		initSly();
	});
	initPanel();
	if ($('.datepicker-holder').size()) {
		$(".datepicker-holder input").datepicker({
			showOn: "button",
			buttonImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALpJREFUeNpiYKAFKCws/E+MGAgwIimYD6L7+/sToYoDgewNaAYEArE/TB2IZoFKNgCpBCB+gGT4eqA4jN0IpUGaHYBYASj3EGhIAwtUoh5NIQh8ACoQRHIBSE0AiAnE86F6GpiQ/QPUsACJ+wCLlx+gqWFgwRYwQEWMxIiBABOhWMDFxmkALDbwsbHaiCueCakfbl4ApUggFiCguQFbOjgATaKg1FWPlITxgQPILgiECRAJDkD1MAAEGAAAQWZj7/jeWQAAAABJRU5ErkJggg==",
			buttonImageOnly: true,
			buttonText: ""
		});
	}
	if ( false /*!IsIE()*/ )  // buggy
	{
		$('.control-list a').tooltip({
			position: {
				my: "center bottom-5",
				at: "center top"
			}
		});
		$('.controls a').tooltip({
			position: {
				my: "left-14 center", at: "right center"
			}
		});
	}
});

function initPanel() {
	$('.side-menu .open').on('click', function(event) {
		var _this = $(this);
		if (!_this.closest('aside').hasClass('active')) {
			_this.closest('aside').animate({
				'margin-right': 0
			}, 400).addClass('active');
			_this.closest('aside').find('.scrollbar').animate({
				'margin-right': 0
			}, 400);
		} else {
			_this.closest('aside').animate({
				'margin-right': -217
			}, 400).removeClass('active');
			_this.closest('aside').find('.scrollbar').animate({
				'margin-right': 217
			}, 400);
		}
		event.preventDefault();
	});
	$('.slide-block .open').on('click', function(event) {
		var _this = $(this),
			_h = _this.closest('.slide-block').height() + 3;
		if (!_this.closest('.slide-block').hasClass('active')) {
			_this.closest('.slide-block').animate({
				'margin-top': 0
			}, 400).addClass('active');
		} else {
			_this.closest('.slide-block').animate({
				'margin-top': -_h
			}, 400).removeClass('active');
		}
		event.preventDefault();
	});
}

function initResize() {
	_windowW = $(window).width();
	$('.resizable').resizable({
		maxWidth: _windowW / 1.4,
		minWidth: _windowW / 7
	});
}

function initSly() {
	if ('sly' in $.fn) {
		$frame = $('.menu-holder .menu');
		$frame1 = $('.scroll-side, .side-menu');
		$frame.each(function() {
			var _this = $(this);
			var $wrap = $(this).parent();

			_this.find("ul").each(function() {
				var sum = 0;
				$(this).find(">li").each(function() {
					sum += $(this).outerWidth(true);
				}).parent().width(sum);
			});

			var _menuW = $(this).width(),
				_listW = $('ul', this).width();

			if (_listW > _menuW) {
				_this.parent().addClass('scroll-menu');
			} else {
				_this.parent().removeClass('scroll-menu');
			}

			$(this).sly({
				horizontal: 1,
				smart: 1,
				activateOn: 'click',
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 0,
				cycleBy: 0,
				cycleInterval: 0,
				scrollBar: $wrap.find('.scrollbar'),
				scrollBy: 100,
				speed: 450,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
				prevPage: $wrap.find('.btn-prev'),
				nextPage: $wrap.find('.btn-next'),
				draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
				activeClass: 'active', // Class for active items and pages.
				disabledClass: 'disabled'
			}, {
				move: function(a) {
					wst = this.pos.cur;
					$(window).trigger('scroll');
				}
			});
			$frame.sly('reload');
			$frame.on('touchmove', function(e) {
				e.preventDefault();
			});
			initHeight();

		});
		$frame1.each(function() {
			var _this = $(this);
			var $wrap = $(this).parent();

			_this.outerHeight($('#main').height() - $(this).closest('aside').find('.control-list').outerHeight());

			var _thisH = $(this).outerHeight(true),
				_listH = $(this).children().height();

			if (!$('.scrollbar', _this).size()) {
				_this.append('<div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>');
			}

			if (_listH > _thisH) {
				_this.addClass('has-scroll');
			} else {
				_this.removeClass('has-scroll');
			}

			$(this).sly({
				horizontal: 0,
				smart: 1,
				activateOn: 'click',
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 0,
				cycleBy: 0,
				cycleInterval: 0,
				scrollBar: _this.find('.scrollbar'),
				scrollBy: 100,
				speed: 450,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
				prevPage: $wrap.find('.btn-prev'),
				nextPage: $wrap.find('.btn-next'),
				draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
				activeClass: 'active', // Class for active items and pages.
				disabledClass: 'disabled'
			}, {
				move: function(a) {
					wst = this.pos.cur;
					$(window).trigger('scroll');
				}
			});
			$frame1.sly('reload');
			$frame1.on('touchmove', function(e) {
				e.preventDefault();
			});
			initHeight();
		});
	}
}

function initHeight() {
	var _h = $(window).height() - $('#header').outerHeight() - $('#footer').height();
	$('#main').height(_h);
}
$(function init() {
	if ($('select').size()) {
		var select = $('select').not('.default').select();
	}
});
//version 1.1.0
$.fn.select = function(o) {
	var callMethod = $.fn.select.method,
		itemClick = jQuery.Event("itemClick"),
		selectReady = jQuery.Event("selectReady"),
		enabled = jQuery.Event("enabled"),
		disabled = jQuery.Event("disabled"),
		destroyed = jQuery.Event("destroyed");
	if (typeof o == "string" && o in $.fn.select.method) {
		var select = $(this);
		callMethod[o](select, arguments[1]);
		return $(this);
	}
	if (!("method" in $.fn.select)) {
		$.fn.select.method = {
			"destroy": function(select) {
				if (select.data('customized')) {
					select.off('change' + o.namespace);
					select.each(function() {
						var instance = $(this);
						instance.data('customSelect').remove();
						$(document).off('mousedown', instance.data("mousedownHandler"));
						$(window).off('resize', instance.data("resizeHandler"));
					});
					select.removeData();
					select.trigger('destroyed');
				} else {
					throw new Error('объект не проинициализирован');
				}
			},
			"enable": function(select) {
				if (select.data('disable')) {
					select.attr('disabled', false);
					select.data('customSelect').first().on('click' + o.namespace, select.data('openerHandler')).removeClass('disabled');
					select.trigger('enabled');
				}
			},
			"disable": function(select) {
				if (!select.data('disable')) {
					select.data('disable', true);
					select.attr('disabled', true);
					select.data('openerHandler', $._data(select.data('customSelect').first().get(0), "events").click[0].handler);
					select.data('customSelect').first().off('click').addClass('disabled');
					select.trigger('disabled');
				}
			},
			"pick": function(select, index) {
				select.each(function() {
					this.selectedIndex = index;
				});
				select.trigger("change" + o.namespace);
			}
		};
		callMethod = $.fn.select.method;
	}
	o = $.extend({
		"list": "ul",
		"namespace": ".select",
		"item": "li",
		"itemHTML": "li span",
		"openerClass": "selectmenu",
		"icoClass": "selectmenu-icon",
		"selectedClass": "selectmenu-status",
		"activeItemClass": "active",
		"activeOpenerClass": "active",
		"dropDownClass": "selectmenu-menu",
		"style": "dropdown", //popup,dropdown
		"transferClass": true,
		"dropdownHasBorder": true,
		"hasIcons": true,
		"resizable": false,
		"triggerEvents": true
	}, o);
	var select = [],
		body = $('body'),
		openerHTML = $('<a class="' + o.openerClass + '"><span class="' + o.icoClass + '"></span><span class="' + o.selectedClass + '"></span></a>'),
		dropdownHTML = $('<div class=' + o.dropDownClass + '>' +
			'<div class="select-top">' +
			'<div class="select-l"></div>' +
			'<div class="select-r"></div>' +
			'</div>' +
			'<div class="select-c">' +
			'<div class="c appendHere">' +
			'</div>' +
			'</div>' +
			'<div class="select-bottom">' +
			'<div class="select-l"></div>' +
			'<div class="select-r"></div>' +
			'</div>' +
			'</div>');
	$(this).each(function(i) {
		if (!$(this).data('customized')) {
			select.push(this);
		}
	});
	if (select.length) {
		$(select).each(function() {
			var opener = openerHTML.clone(),
				nativeSelect = $(this),
				title = nativeSelect.find("option[title]").text(),
				options = nativeSelect.find("option[title]").attr('disabled', true).end().find('option'),
				optionSize = options.size() - 1,
				dropdown = dropdownHTML.clone(),
				itemTree = o.itemHTML.split(' '),
				hasChild = itemTree.length >= 2,
				list = "<" + o.list + ">";
			nativeSelect.find('option').each(function(i, data) {
				if ($(this).attr('title')) {
					list += "<" + o.item + " class='title' style='display:none;'>" + data.childNodes[0].nodeValue + "</" + o.item + ">";
				} else {
					if (!hasChild) {
						list += "<" + o.item + ">" + data.childNodes[0].nodeValue + "</" + o.item + ">";
					} else {
						var buffer = '';
						for (var k = itemTree.length - 1; k != 0; k--) {
							if (!buffer) {
								buffer += "<" + itemTree[k] + ">" + data.childNodes[0].nodeValue + "</" + itemTree[k] + ">";
							} else if (k != 0 && itemTree.length > 2) {
								buffer = "<" + itemTree[k] + ">" + buffer + "</" + itemTree[k] + ">";
							}
						}
						buffer = "<" + itemTree[0] + ">" + buffer + "</" + itemTree[0] + ">";
						list += buffer;
					}
				}
				if (i == optionSize) {
					list += "</" + o.list + ">";
				}
			});
			list = $(list);
			dropdown = dropdown.find('.appendHere').removeClass('appendHere').append(list).end();
			opener.insertAfter(nativeSelect);
			opener.find('.' + o.selectedClass).text(nativeSelect.find('option:selected').text());
			body.append(dropdown);
			(o.dropdownHasBorder) ? dropdown.width(opener.width()) : dropdown.width(opener.outerWidth());
			if (o.transferClass) {
				opener.addClass(opener.attr('class') + " " + nativeSelect.attr('class'));
				dropdown.addClass(dropdown.attr('class') + " " + nativeSelect.attr('class'));
			}
			$(this).data('customSelect', opener.add(dropdown));
			$(this).data('customized', true);
			var listItems = list.find(">" + o.item),
				dropdownWidth = dropdown.outerWidth(),
				dropdownHeight = dropdown.outerHeight();
			selectedByHover = '',
			selected = '';
			if (!o.resizable) {
				opener.width(nativeSelect.outerWidth());
				(o.dropdownHasBorder) ? dropdownWidth = dropdown.width(opener.width()) : dropdownWidth = dropdown.width(opener.outerWidth());
			} else {
				$(window).on('resize.opener', function() {
					(o.dropdownHasBorder) ? dropdownWidth = dropdown.width(opener.width()) : dropdownWidth = dropdown.width(opener.outerWidth());
				}).trigger('resize.opener');
			}
			if (title) {
				opener.find('.' + o.selectedClass).text(title);
				nativeSelect.trigger('change' + o.namespace, [options.filter(':selected').index()]);
			}
			nativeSelect.on("change" + o.namespace, function(e, selectedIndex, dontHide, dontTrigger) {
				if (dontTrigger) return;
				if (!selectedIndex && selectedIndex !== 0) selectedIndex = this.selectedIndex;
				this.selectedIndex = selectedIndex;
				listItems.removeClass(o.activeItemClass).eq(selectedIndex).addClass(o.activeItemClass);
				selected = options.eq(selectedIndex);
				opener.find('.' + o.selectedClass).text(selected.text());
				if (!dontHide) {
					dropdown.hide();
					opener.removeClass(o.activeOpenerClass);
				}
				nativeSelect.trigger("change", [null, null, true]);
			});
			if (o.hasIcons) {
				options.each(function(i) {
					listItems.eq(i).prepend('<span class="' + this.className + '"></span>');
				});
				nativeSelect.on("change" + o.namespace, function(e, selectedIndex, dontHide, dontTrigger) {
					if (dontTrigger) return;
					opener.find('.' + o.selectedClass).prepend('<span class="' + selected.attr('class') + '"></span>');
				});
				opener.find('.' + o.selectedClass).prepend('<span class="' + options.filter(':selected').attr('class') + '"></span>');
			}
			nativeSelect.hide();
			listItems.click(function(e) {
				if (!$(this).hasClass(o.activeItemClass)) {
					nativeSelect.trigger("change" + o.namespace, [$(this).index()]);
				}
				dropdown.hide();
				opener.removeClass(o.activeOpenerClass);
			});
			opener.click(function(e) {
				if (dropdown.is(':hidden')) {
					dropdown.show();
					opener.addClass(o.activeOpenerClass);
					alignDropDown();
				} else {
					dropdown.hide();
					opener.removeClass(o.activeOpenerClass);
				}
			});
			nativeSelect.data("resizeHandler", function() {
				if (dropdown.is(':visible')) {
					alignDropDown();
				}
			});
			nativeSelect.data("mousedownHandler", function(e) {
				if (!$(e.target).closest(dropdown).size() && !$(e.target).closest(opener).size()) {
					dropdown.hide();
					opener.removeClass(o.activeOpenerClass);
				}
			});
			$(window).on('resize', nativeSelect.data("resizeHandler"));
			$(document).on('mousedown', nativeSelect.data("mousedownHandler"));
			//event section
			if (o.triggerEvents) {
				listItems.click(function(e) {
					nativeSelect.trigger(itemClick, [$(this).text()]);
				});
				nativeSelect.trigger(selectReady, [dropdown]);
			}

			function alignDropDown() {
				if (o.style == "dropdown") {
					var top = opener.offset().top + opener.outerHeight(),
						left = opener.offset().left;
					/*
if(top + dropdownHeight > $(window).height() && top - dropdownHeight - opener.outerHeight() > 0){
							dropdown.css({
								'top': top - dropdownHeight - opener.outerHeight(),
								'left': left
							});
						}else{
*/
					dropdown.css({
						'top': top,
						'left': left
					});
					/*
}
*/
				} else {
					var activeEl = listItems.eq(nativeSelect.get(0).selectedIndex);
					activeEl = activeEl.hasClass('title') ? activeEl.next() : activeEl;
					var top = opener.offset().top - activeEl.position().top,
						left = opener.offset().left;
					dropdown.css({
						'top': top,
						'left': left
					});
				}
			}
			if (nativeSelect.is(':disabled')) nativeSelect.select('disable');
		});
	} else {
		throw Error('селектор $("' + $(this).selector + '") ничего не возвратил');
	}
}
$(function init() {
	if ($('input:checkbox').size()) var _checkbox = $('input:checkbox').checkbox();
	if ($('input:radio').size()) var _radio = $('input:radio').radio();
});
$.fn.checkbox = function(o) {
	var callMethod = $.fn.checkbox.method;
	if (typeof o == "string" && o in $.fn.checkbox.method) {
		var checkbox = $(this);
		callMethod[o](checkbox);
		return checkbox;
	}
	if (!("method" in $.fn.checkbox)) {
		$.fn.checkbox.method = {
			"destroy": function(checkbox) {
				if (checkbox.data('customized')) {
					checkbox.off('change.customForms');
					checkbox.each(function() {
						$(this).data('customCheckbox').off('click.customForms').remove();
					});
					checkbox.removeData();
				} else {
					throw new Error('объект не проинициализирован');
				}
			},
			"check": function(checkbox) {
				checkbox.trigger('change.customForms', ['check']);
			},
			"uncheck": function(checkbox) {
				checkbox.trigger('change.customForms', ['uncheck']);
			},
			"toggle": function(checkbox) {
				var method = this;
				checkbox.each(function() {
					if (!$(this).is(':checked')) {
						method.check($(this));
					} else {
						method.uncheck($(this));
					}
				});
			}
		};
		callMethod = $.fn.checkbox.method;
	}
	var checkboxes = [];
	$(this).each(function() {
		if (!$(this).data('customized')) {
			checkboxes.push(this);
		}
	});
	if (!$(this).size()) {
		throw new Error('селектор ' + $(this).selector + ' возвратил пустой набор элементов');
	}
	if (checkboxes.length) {
		o = $.extend({
			"checkboxClass": "checkboxAreaChecked",
			"labelClass": "active",
			"customCheckboxClass": "checkboxArea"
		}, o);
		var customCheckbox = $('<div class="' + o.customCheckboxClass + '"></div>');
		checkboxes = $(checkboxes);
		checkboxes.data('customized', true);
		return checkboxes.each(function() {
			var checkbox = $(this),
				localCustomCheckbox = customCheckbox.clone(),
				checkboxClass = o.checkboxClass,
				labelClass = o.labelClass;
			checkbox.data('customCheckbox', localCustomCheckbox);
			localCustomCheckbox.insertAfter(checkbox);
			if (checkbox.closest('label').size()) {
				checkbox.data('label', checkbox.closest('label'));
			} else if (checkbox.attr('id')) {
				checkbox.data('label', $('label[for=' + checkbox.attr('id') + ']'));
			}
			checkbox.on('change.customForms', function(e, command) {
				if (command == "check") {
					check();
				} else if (command == "uncheck") {
					uncheck();
				} else {
					if (checkbox.is(':checked')) {
						check();
					} else {
						uncheck();
					}
				}
			}).trigger('change.customForms');
			localCustomCheckbox.on('click.customForms', function(e) {
				if (!localCustomCheckbox.hasClass(checkboxClass)) {
					callMethod.check(checkbox);
				} else {
					callMethod.uncheck(checkbox);
				}
				e.preventDefault();
			});

			function check() {
				checkbox.get(0).checked = true;
				localCustomCheckbox.addClass(checkboxClass);
				if (checkbox.data('label')) {
					checkbox.data('label').addClass(labelClass);
				}
			}

			function uncheck() {
				checkbox.get(0).checked = false;
				localCustomCheckbox.removeClass(checkboxClass);
				if (checkbox.data('label')) {
					checkbox.data('label').removeClass(labelClass);
				}
			}
		});
	} else {
		throw Error('чекбокс/ы уже проинициализирован/ы');
	}
}
$.fn.radio = function(o) {
	var callMethod = $.fn.radio.method;
	if (typeof o == "string" && o in $.fn.radio.method) {
		var radio = $(this);
		callMethod[o](radio);
		return radio;
	}
	if (!("method" in $.fn.radio)) {
		$.fn.radio.method = {
			"destroy": function(radio) {
				var initedEls = [];
				radio.each(function() {
					if ($(this).data('customized')) {
						initedEls.push(this);
					}
				});
				if (initedEls.length) {
					radio = $(initedEls);
					radio.off('change.customForms');
					radio.each(function() {
						$(this).data('customRadio').off('click.customForms').remove();
					});
					radio.removeData();
				} else {
					throw new Error('объект не проинициализирован');
				}
			},
			"check": function(radio) {
				radio.trigger('change', ['check']);
			}
		};
		callMethod = $.fn.radio.method;
	}
	if (!('group' in $.fn.radio)) {
		$.fn.radio.group = {};
	}
	if (!$(this).size()) {
		throw new Error('селектор ' + $(this).selector + ' возвратил пустой набор элементов');
	}
	var radios = [];
	$(this).each(function() {
		if (!$(this).data('customized')) {
			radios.push(this);
		}
	});
	if (radios.length) {
		o = $.extend({
			"radioClass": "radioAreaChecked",
			"labelClass": "active",
			"customRadioClass": "radioArea"
		}, o);
		var customRadio = $('<div class="' + o.customRadioClass + '"></div>'),
			group = $.fn.radio.group;
		radios = $(radios);
		radios.data('customized', true);
		radios.each(function() {
			if ($(this).attr('name') && !($(this).attr('name') in group))
				group[$(this).attr('name')] = radios.filter('input:radio[name=' + $(this).attr('name') + ']');
		});
		return radios.each(function() {
			var radio = $(this),
				localCustomRadio = customRadio.clone(),
				curGroup = radio.attr('name') in group ? group[radio.attr('name')] : 0,
				radioClass = o.radioClass,
				labelClass = o.labelClass;
			radio.data('customRadio', localCustomRadio);
			localCustomRadio.insertAfter(radio);
			if (radio.closest('label').size()) {
				radio.data('label', radio.closest('label'));
			} else if (radio.attr('id')) {
				radio.data('label', $('label[for=' + radio.attr('id') + ']'));
			}
			radio.on('change.customForms', function(e, command) {
				if (radio.is(':checked') || command == "check") {
					if (curGroup) {
						uncheck(curGroup.not(radio).next());
						if (curGroup.data('label').size()) {
							curGroup.each(function() {
								if ($(this).data('label')) {
									$(this).data('label').removeClass('active');
								}
							});
						}
					}
					check(localCustomRadio);
					if (command == "check") check(radio);
					if (radio.data('label')) {
						radio.data('label').addClass(labelClass);
					}
				}
			}).trigger('change.customForms');
			localCustomRadio.on('click.customForms', function(e) {
				if (!localCustomRadio.hasClass(radioClass)) {
					callMethod.check(radio);
				}
				e.preventDefault();
			});

			function check(radio) {
				if (radio.is('input:radio')) {
					radio.get(0).checked = true;
				} else {
					radio.addClass(radioClass);
				}
			}

			function uncheck(radio) {
				if (radio.is('input:radio')) {
					radio.get(0).checked = false;
				} else {
					radio.removeClass(radioClass);
				}
			}
		});
	} else {
		throw Error('радиокнопка/и уже проинициализирована/ы');
	}
}

function resizeHeadTabs()
{
  var tabs = $("#CategoryTabs");
  if ( tabs.length )
     {
       var logo = $(".logo");
       var logo_width = (logo.length ? logo.outerWidth() : 0);
       var controls = $(".controls");
       var controls_width = (controls.length ? controls.outerWidth() : 0);
       tabs.width($(window).width()-logo_width-controls_width-60);
     }
}


function customOnResize()
{
}



