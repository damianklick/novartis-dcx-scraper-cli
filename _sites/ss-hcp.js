/* 
?ed=1&call=jQuery.getScript('ss-hcp.js')
*/
(function($){
	var omniScreenshots = {
		_getKeyValue: function(queryString) {
			queryString = (typeof(queryString) === 'undefined') ? window.location.search : queryString;
			var arr = queryString.substring(1).split('&');
			return arr;
		},
		_edMode:function() {
			//Correcting height of pages (cause: NVS error pages rendering too small)
			var vh = $(window).height();
			if(vh >= 720){
				jQuery('#uso-page').css('minHeight','720px');
				setTimeout(function() {
					jQuery('.teasers-sticky').css({
						'top':'0px'
					});
				}, 2500);
			}
			
			jQuery('.rowIsi').css({
				'position':'relative',
			});

			jQuery('#uso-page').css({
				'min-height':'auto'
			});

			jQuery('.teasers-sticky').css({
					'position':'relative'
			});

			setTimeout(function() {
				$('iframe.commander-iframe').css({
					'display':'none'
				});
				window.scrollTo(0, 0);
			}, 2000);

			$('iframe.commander-iframe').remove();
		},
		_element_showDropdown: function() {
			jQuery('#selector-container').addClass('open');
		},
		_element_showMobileNav: function() {
			jQuery('#uso-brandheader-mobile-btn').trigger('click');
		},
		_element_showSelectOptions: function() {
			jQuery('.bootstrap-select').addClass('open');
		},
		_element_clickSelect: function(e) {
			jQuery('.selectpicker>li:eq('+e+')>a:eq(0)').trigger('click');
			$(window).scroll(function(){
				$(".teasers-sticky").css({"position": "static"});
			});
		},
		_element_showTab: function(index) {
			jQuery('ul.nav-tabs li:nth-child('+index+') a').trigger('click');
		},
		_element_showAccordion: function () {
			jQuery('.panel-collapse').addClass('in').css('display','block');
		},
		_element_showMedArea: function (index) {
			jQuery('.medical-area-nav .area-list.sections').css('display','none');
			jQuery('.medical-area-nav .area-list.subsections').eq(index).addClass('active');
		},
		init: function() {
			var href = window.location.href;
			var query = window.location.search;
			var keyValue = this._getKeyValue(query);

			//CHECK FOR SPECIFIC KEY AND VALUE
			if(keyValue.indexOf('ed=1') > -1) { this._edMode(); }
			if(query.indexOf('showDropdown=1') > -1) { this._element_showDropdown(); }
			if(query.indexOf('showMobileNav=1') > -1) { this._element_showMobileNav(); }
			if(query.indexOf('showSelectOptions=1') > -1) { this._element_showSelectOptions(); }

			//SHOW NAV TABS (Medical SIte)
			if(query.indexOf('showNavTab=1') > -1) { this._element_showTab(1); }
			if(query.indexOf('showNavTab=2') > -1) { this._element_showTab(2); }
			if(query.indexOf('showNavTab=3') > -1) { this._element_showTab(3); }
			if(query.indexOf('showNavTab=4') > -1) { this._element_showTab(4); }
			
			//below needs to be refactored later
			if(query.indexOf('clickSelect=1') > -1) { this._element_clickSelect(1); }
			if(query.indexOf('clickSelect=2') > -1) { this._element_clickSelect(2); }
			if(query.indexOf('clickSelect=3') > -1) { this._element_clickSelect(3); }
			if(query.indexOf('clickSelect=4') > -1) { this._element_clickSelect(4); }
			if(query.indexOf('clickSelect=5') > -1) { this._element_clickSelect(5); }
			if(query.indexOf('clickSelect=6') > -1) { this._element_clickSelect(6); }
			if(query.indexOf('clickSelect=7') > -1) { this._element_clickSelect(7); }
			if(query.indexOf('clickSelect=8') > -1) { this._element_clickSelect(8); }
			if(query.indexOf('clickSelect=9') > -1) { this._element_clickSelect(9); }

			//Accordions
			if (query.indexOf('accordion=1') > -1) { this._element_showAccordion(); }

			//Medical Area
			if (query.indexOf('medarea=1') > -1) { this._element_showMedArea(0); }
			if (query.indexOf('medarea=2') > -1) { this._element_showMedArea(1); }
			if (query.indexOf('medarea=3') > -1) { this._element_showMedArea(2); }
			if (query.indexOf('medarea=4') > -1) { this._element_showMedArea(3); }

		}
	};

	omniScreenshots.init();

})(jQuery);