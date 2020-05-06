'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
?ed=1&call=jQuery.getScript('ss.js')
*/
(function ($) {
	var omniScreenshots = {
		_regexReplace: function _regexReplace() {
			//Replace header tracking
			var n = [{
				'rgx': '<script.*(window.NREUM).*<\/script>',
				'sbl': '<script.*(window.NREUM).*</script>'
			},
			//Replace adobe link
			{
				'rgx': '<script.*assets.adobe.*<\/script>',
				'sbl': '<script.*assets.adobed.*</script>'
			},
			//Replace adobe link
			{
				'rgx': '<script.*adobetrackingdb.*<\/script>',
				'sbl': '<script.*adobetrackingdb.*</script>'
			},
			//Remove comments
			{
				'rgx': '<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>',
				'sbl': '(?s)<!--\[if(.*?)endif\]-->'
			}];
		},
		_getKeyValue: function _getKeyValue(queryString) {
			queryString = typeof queryString === 'undefined' ? window.location.search : queryString;
			var arr = queryString.substring(1).split('&');
			return arr;
		},
		_edMode: function _edMode() {

			$('iframe.commander-iframe').css({
				'opacity': 0,
				'display':'none'
			});

			// make fixed the navigation menu don't move with the page
			var ww = $(window).width();

			if (ww >= 1024) {
				$('.gc-nav').css({
					'position': 'relative'
				})
			}
			//make side navigation don't follow the screen scroll
			$('.chapternav-on').css({"position": "relative"})
			$('.gc-chapternav.on').css({
				"position": "absolute",
				"top": 0,
				"bottom" : 0
			})

		},
		_element_showInterstitial: function _element_showInterstitial() {
			$('.js-externalLinkDisclaimerPopUp').removeClass('fade')
			$('.js-externalLinkDisclaimerPopUp').addClass('in');
			$('.js-externalLinkDisclaimerPopUp').parents('div.container').css({
				"position":"absolute",
				"top":0,
				"left":0,
				"width":"100%"
			})
			$('.js-externalLinkDisclaimerPopUp').css({
				'height': $('body').height(),
				'width': '100%',
				'display': 'block',
				'background': 'rgba(0, 0, 0, 0.4)',
				'position': 'absolute'
			});
			var ww = $(window).width();
			if (ww >= 1024) {
				$('.js-externalLinkDisclaimerPopUp').find('.modal-dialog').css({ 'margin-top': '150px' });
			}
		},
		_element_showAccordion: function _element_showAccordion() {
			jQuery('.panel-heading a').removeClass('panel-icon-down collapsed').addClass('panel-icon-up');
			jQuery('.panel-collapse').addClass('in');
		},
		_element_showTooltip: function _element_showTooltip() {
			jQuery('.tooltip-box').addClass('myShow').removeClass('myHide');
		},
		_element_showTabs: function _element_showTabs(arr) {
			console.log('tab called');
			var index = '';
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i].indexOf('tabs=') > -1) {
					index = arr[i].split('=');
					index = index[1];
				}
			}
			console.log(index);

			if (index === '') {
				return;
			} else {
				console.log('calling tabs');
				jQuery('.nav-tabs li').removeClass('active');
				jQuery('.nav-tabs li').eq(index - 1).addClass('active');

				jQuery('.tab-pane').removeClass('active');
				jQuery('.tab-pane').eq(index - 1).addClass('active');
			}
		},
		_element_triggerSectionMenu: function _element_triggerSectionMenu(){
			jQuery('.cn-drpdown-header').addClass('open');
			jQuery('.icon-thin-arrow-down').addClass('icon-thin-arrow-up').removeClass('icon-thin-arrow-down');
		},
		_element_showMenu: function _element_showMenu(arr) {
			var index = '';

			// arr = ["menu=2","ed=1", ...]
			// Findout the number after menu=
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i].indexOf('menu=') > -1) {
					index = arr[i].split('=');
					index = index[1];
				}
			}

			if (index === '') {
				return;
			} else {
				var ww = $(window).width();
				if (ww >= 1024) {
					$('.navbar-nav li.dropdown').eq(index - 1).addClass('open');
				} else {
					$('.navbar-toggle').click();
					if( index > 0 ){
						$('.navbar-nav li.dropdown').eq(index - 1).addClass('open');
						$('.navbar-nav li.dropdown > a').css('color','white');
					}
				}
			}
		},
		handleRadio: function handleRadio(input) {
			var radios = document.querySelectorAll('input[name="' + input.name + '"]');
			radios[0].checked = true;
		},
		handleSelects: function handleSelects(selects) {
			for (var i = 0; i < selects.length; i++) {
				var select = selects[i];
				select[1].selected = true;
			}
		},
		init: function init() {
			var href = window.location.href;
			var query = window.location.search;
			var keyValue = this._getKeyValue(query);

			console.log('loaded', keyValue);

			//CHECK FOR SPECIFIC KEY AND VALUE
			if (keyValue.indexOf('ed=1') > -1) { this._edMode(); }

			//CHECK FOR SPECIFIC KEY
			if (query.indexOf('accordion=1') > -1) { this._element_showAccordion(); }
			if (query.indexOf('menu=') > -1) { this._element_showMenu(keyValue); }
			if (query.indexOf('tabs=') > -1) { this._element_showTabs(keyValue); }
			if (query.indexOf('interstitial=1') > -1) { this._element_showInterstitial(); }
			if (query.indexOf('tooltip=1') > -1) { this._element_showTooltip(); }
			if (query.indexOf('sectionDropdown=1') > -1) { this._element_triggerSectionMenu(); }
		}
	};

	omniScreenshots.init();
})(jQuery);
