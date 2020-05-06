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

			//Correcting height of pages (cause: NVS error pages rendering too small)
			var vh = $(window).height();
			if (vh >= 720) {
				jQuery('#uso-page').css('minHeight', '720px');
			}

			var ww = $(window).width();
			if (ww >= 1024) {
				// jQuery('.gc-content-right-column > div').css({'border-top':'1px solid red', 'border-bottom':'1px solid red', 'box-sizing': 'border-box'});
				var divHTML = '<div id="staticISI" class="seemoreBlocksContainerBlock col-lg-12" style="margin:0 0 45px 0; position:relative; clear:both; height:auto; overflow:hidden; min-height: 377px;"></div>';
				jQuery(divHTML).insertAfter('.scrollmagic-pin-spacer:eq(1)');
				// NOTE: Big assumption is made with the eq(1). The scrollmagic-pin-spacer is added with ISI blocks, and this assumes the mobile-isi block, which is hidden on desktop, is the first to be added in that container.
				setTimeout(function () {
					jQuery('.seemoreBlock').appendTo('#staticISI');
					jQuery('.scrollmagic-pin-spacer:eq(1)').css({
						'margin-bottom': '0',
						'min-height': '0'
					});
					jQuery('.seemoreBlock button.CTALabel').css({ 'opacity': '1' });
				}, 500);
			} else {
				//page is detail page
				if(jQuery('.gc-content-right-column').length > 0){
					console.log('ED=1, detail page');
					jQuery('.gc-content-right-column').addClass('seemoreBlocksContainerBlock seemoreBlocksContainerBlockMobile');
					jQuery('.seemoreBlocksContainerBlockMobile .btn').prependTo('.gc-content-right-column');
					jQuery('.scrollmagic-pin-spacer').css('min-height', '0px');
				}
				//page is homepage
				else {
					console.log('ED=1, homepage');
					jQuery('.left-side').addClass('seemoreBlocksContainerBlock seemoreBlocksContainerBlockMobile');
					jQuery('.seemoreBlocksContainerBlockMobile .btn').prependTo('.left-side');
					jQuery('.scrollmagic-pin-spacer').css('min-height', '0px');
					jQuery('.left-side').css('zIndex','2');
				}
			}

			$('iframe.commander-iframe').css({
				'opacity': 0
			});

			setTimeout(function(){
				$('iframe.commander-iframe').attr('style','opacity:0;display:none;');
				$('iframe.commander-iframe').remove();
			}, 2000);

			//Large Tout Correction
			//this block holds on to the primary-brand-color-bg-transparent class when the window is resized for screenshots (live issue)
			if(jQuery('.large-tout-block').length > 0){
				jQuery('.large-tout-block').find('.primary-brand-color-bg-transparent').removeClass('primary-brand-color-bg-transparent');
			}
		},
		_element_showInterstitial: function _element_showInterstitial() {
			$('#interstitialPopUp').css({
				'height': $('body').height(),
				'width': '100%',
				'display': 'block',
				'background': 'rgba(0, 0, 0, 0.4)',
				'position': 'absolute'
			});
			$('#interstitialPopUp').addClass('in');
			var ww = $(window).width();
			if (ww >= 1024) {
				$('#interstitialPopUp').find('.modal-dialog').css({ 'margin-top': '150px' });
			}
		},
		_element_showFlyout: function _element_showFlyout() {
			var ww = $(window).width();

			if (ww >= 1024) {

				//this no longer works on IE10 as of 10/19/2017
				//jQuery('.CTALabel:eq(0)').click();

				//old style of flyout, only works on IE10
				// jQuery('.seemoreModal').modal();
				// setTimeout(function() {
				// 	jQuery('body').prepend('<div id="flyout" class="seemoreBlocksContainerBlock" style="position: absolute; top: 0; left: 0; z-index: 1100; display: block; width: 100%; height: auto;"></div>');
				// 	jQuery('.seemoreModal').prependTo('#flyout');
				// 	jQuery('.seemoreModal').css({'position':'relative'});
				// 	jQuery('.ps-scrollbar-y-rail').css({'padding-top':'750px'});
				// 	jQuery('.ps-scrollbar-y').css({'padding-top':'45px', 'top': '0'});
				// 	jQuery('body').removeClass('modal-open');
				// }, 500);
				console.log('SHOWFLYOUT=1, desktop');
				//new style of flyout, confirmed working on IE11 on 10/20/2017
				setTimeout(function () {
					jQuery('body').prepend('<div id="flyout" class="seemoreBlocksContainerBlock" style="position: absolute; top: 0; left: 0; z-index: 1100; display: block; width: 100%; height: auto;"></div>');
					jQuery('.seemoreModal').prependTo('#flyout');
					jQuery('.seemoreModal').css({ 'position': 'relative', 'display': 'block' });
					jQuery('.ps-scrollbar-y-rail').css({ 'padding-top': '750px' });
					jQuery('.ps-scrollbar-y').css({ 'padding-top': '45px', 'top': '0' });
					jQuery('.seemoreModal').addClass('in');
					jQuery('body').prepend('<div class="modal-backdrop fade in"></div>');
				}, 500);
			} else {
				console.log('SHOWFLYOUT=1, mobile');
				setTimeout(function () {
					jQuery('body').prepend('<div id="flyout" style="position: absolute; top: 0; left: 0; z-index: 91100; display: block; width: 100%; height: auto;"></div>');
					jQuery('.seemoreBlocksContainerBlockMobile .collapse').addClass('in');
					jQuery('.seemoreBlocksContainerBlockMobile').css({
						'position': 'absolute'
					});
					jQuery('.seemoreBlocksContainerBlockMobile button').css({
						'position': 'absolute'
					});

					jQuery('.seemoreBlocksContainerBlockMobile button:not(".CTALabel")').appendTo('#flyout');
					jQuery('.seemoreBlocksContainerBlockMobile .collapse').appendTo('#flyout');
					jQuery('#flyout').addClass('seemoreBlocksContainerBlock seemoreBlocksContainerBlockMobile');

					jQuery('.isi-icon-mobile').css({ 'transform': 'rotate(45deg)', 'transform-origin': '50% 50%' });

					jQuery('body').addClass('modal-open');
				}, 3000);
			}
		},
		_element_showHeaderAccordion: function() {
			var targets = jQuery('.gc-header .block-accordion');
			this.showAccordion(targets);
		},
		_element_showBodyAccordion: function() {
			var targets = jQuery('.block-accordion, .block-accordion-richtext-item').not('.gc-header .block-accordion');
			this.showAccordion(targets);
		},
		showAccordion: function(targets) {
			jQuery(targets).each(function() {
				var toggle = jQuery('.toggle-accordion span', this);
				if (toggle.length > 0) {
					jQuery(toggle).click();
				}else {
					jQuery('.panel-heading a', this).removeClass('collapsed');
					jQuery('.panel-collapse', this).addClass('in');
				}
			});
		},
		_element_showTooltip: function _element_showTooltip() {
			jQuery('.tooltip-box').addClass('myShow').removeClass('myHide');
		},
		_element_quiz: function(arr){
			//quiz calls only works on staging host environments (scraper cannot get this data)
			//please set your CSV to have the appropriate host
			//
			//how to use: ?ed=1&quiz=QUESTIONNUM,ANSWERNUM
			//IE: ?ed=1&quiz=2,3 :: This will select the 2nd question, and select the 3rd answer
			console.log('quiz called');

			var index = '',
				question = '',
				answer = '';
			//grab variables from query
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i].indexOf('quiz=') > -1) {
					index = arr[i].split('=');
					index = index[1].split('_');
					question = index[0];
					answer = index[1];
				}
			}
			// omniScreenshots._quiz_selectQuestion(question, function(){
			// 	omniScreenshots._quiz_selectAnswer(answer, question);
			// });
			omniScreenshots._tasigna_quiz(question, answer);
		},
		_quiz_selectQuestion: function(question, callback){
			//advances to specific question
			if(question > 1){
				for(var i=0; i<question-1; i++){
					console.log('quiz question num: ' + i);
					setTimeout(function(){ 
						$('input[value="Next Question"]').click();
					}, i*1000);
				}
			}
			callback()
		},
		_quiz_selectAnswer: function(answer, delay){
			//selects one of the available answers of the question
			console.log('quiz answer num: ' + answer);
			setTimeout(function(){ 
				jQuery('.products-quiz-answer-component:eq('+(answer-1)+')').click();
			}, delay*1100);
		},
		//
		//
		//	 The following code is designed to only work on Tasigna Consumer
		//
		//
		_tasigna_quiz: function(question, answer){
			var tasignaQuiz = [
				'<div id="products-quiz-question-component-89552" class="products-quiz-question-component col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-0 "> <form action="/modules/DigiOne.Oncology.Library/ProductQuizContainerBlock/Submit" data-ajax="true" data-ajax-complete="OnSubmitComplete()" data-ajax-method="POST" data-ajax-mode="replace" data-ajax-update="#products-quiz-question-component-89552" id="products-quiz-form" method="post" novalidate="novalidate"><input name="__RequestVerificationToken" type="hidden" value="kfaNkuGZGNoZ5x7eo9K388XaW9iuN1hcbfAekU9kh6qimNNng4JSmZDv4_IT_65CkT_yblNysv4IE9l0yZPLCcIdgxXmaraekBUW6v-Wic4aVeUI24rvQA6TjY7hc_ht0"> <p>Do all medications for Ph+ CML have FDA approval for treatment-free remission?</p> <div class="products-quiz-answer-container clearfix"> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">Yes</span> <input id="answer-id" name="answer-id" type="hidden" value="89554"> <input id="answer-description" name="answer-description" type="hidden" value="Only TASIGNA has proven efficacy and FDA approval for treatment-free remission."> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">No</span> <input id="answer-id" name="answer-id" type="hidden" value="89555"> <input id="answer-description" name="answer-description" type="hidden" value="Only TASIGNA has proven efficacy and FDA approval for treatment-free remission."> <input id="answer-correct" name="answer-correct" type="hidden" value="True"> </div> </div> </div> <div class="products-quiz-answer-description-container"> <div id="products-quiz-answer-component-89554"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Only TASIGNA has proven efficacy and FDA approval for treatment-free remission.</p></div><div id="products-quiz-answer-component-89555"><p><span class="products-quiz-icon products-quiz-icon-correct"><img style="margin-bottom:5px; margin-right:5px;" class="" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizCorrectCheck.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-correct">Correct</span> : Only TASIGNA has proven efficacy and FDA approval for treatment-free remission.</p></div> </div> <div class="products-quiz-form-buttons"> <input class="products-quiz-form-button primary-brand-color-bg" type="submit" value="Next Question" name="products-quiz-form-submit" id="products-quiz-form-submit"> </div> <input id="form-quiz-id" name="form-quiz-id" type="hidden" value="89549"><input id="form-quiz-question-index" name="form-quiz-question-index" type="hidden" value="0"><input id="detectLang" name="detectLang" type="hidden" value="en"></form></div>',
				'<div id="products-quiz-question-component-89556" class="products-quiz-question-component col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-0 "> <form action="/modules/DigiOne.Oncology.Library/ProductQuizContainerBlock/Submit" data-ajax="true" data-ajax-complete="OnSubmitComplete()" data-ajax-method="POST" data-ajax-mode="replace" data-ajax-update="#products-quiz-question-component-89556" id="products-quiz-form" method="post"><input name="__RequestVerificationToken" type="hidden" value="MxeLus1lkF1dbry6jqSFPnOsR5p8F5zfzGTQ3C2_4IV92EP_Gc9gqWgaxMs9J0ENAc_QoSx6P1AQuHdbuD2PUNT7YXEI6vdmEvXdTdqRh_Pb9RljzvF_vM2GKzCUHGd_0"> <p>How long does someone with Ph+ CML need to be taking TASIGNA to be eligible for TFR?</p> <div class="products-quiz-answer-container clearfix"> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">1 year</span> <input id="answer-id" name="answer-id" type="hidden" value="89558"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must be taking TASIGNA alone for 3+ years and achieved a DMR (MR4.5) within the last year or imatinib for >4 weeks, then switched to TASIGNA for 2+ years and achieved a DMR (MR4.5) within the last year."> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">1-2 years</span> <input id="answer-id" name="answer-id" type="hidden" value="89559"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must be taking TASIGNA alone for 3+ years and achieved a DMR (MR4.5) within the last year or imatinib for >4 weeks, then switched to TASIGNA for 2+ years and achieved a DMR (MR4.5) within the last year."> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">â‰¥ 2 years</span> <input id="answer-id" name="answer-id" type="hidden" value="89560"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must be taking TASIGNA alone for 3+ years and achieved a DMR (MR4.5) within the last year or imatinib for >4 weeks, then switched to TASIGNA for 2+ years and achieved a DMR (MR4.5) within the last year."> <input id="answer-correct" name="answer-correct" type="hidden" value="True"> </div> </div> </div> <div class="products-quiz-answer-description-container"> <div id="products-quiz-answer-component-89558"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Someone with Ph+ CML must be taking TASIGNA alone for 3+ years and achieved a DMR (MR4.5) within the last year or imatinib for &gt;4 weeks, then switched to TASIGNA for 2+ years and achieved a DMR (MR4.5) within the last year.</p></div><div id="products-quiz-answer-component-89559"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Someone with Ph+ CML must be taking TASIGNA alone for 3+ years and achieved a DMR (MR4.5) within the last year or imatinib for &gt;4 weeks, then switched to TASIGNA for 2+ years and achieved a DMR (MR4.5) within the last year.</p></div><div id="products-quiz-answer-component-89560"><p><span class="products-quiz-icon products-quiz-icon-correct"><img style="margin-bottom:5px; margin-right:5px;" class="" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizCorrectCheck.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-correct">Correct</span> : Someone with Ph+ CML must be taking TASIGNA alone for 3+ years and achieved a DMR (MR4.5) within the last year or imatinib for &gt;4 weeks, then switched to TASIGNA for 2+ years and achieved a DMR (MR4.5) within the last year.</p></div> </div> <div class="products-quiz-form-buttons"> <input class="products-quiz-form-button primary-brand-color-bg" type="submit" value="Next Question" name="products-quiz-form-submit" id="products-quiz-form-submit"> </div> <input id="form-quiz-id" name="form-quiz-id" type="hidden" value="89549"><input id="form-quiz-question-index" name="form-quiz-question-index" type="hidden" value="1"><input id="detectLang" name="detectLang" type="hidden" value="en"></form></div>',
				'<div id="products-quiz-question-component-89561" class="products-quiz-question-component col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-0 "> <form action="/modules/DigiOne.Oncology.Library/ProductQuizContainerBlock/Submit" data-ajax="true" data-ajax-complete="OnSubmitComplete()" data-ajax-method="POST" data-ajax-mode="replace" data-ajax-update="#products-quiz-question-component-89561" id="products-quiz-form" method="post"><input name="__RequestVerificationToken" type="hidden" value="7k3boUWtzfY0SxOKQYHSD1eX7Mo1mnM96sT1AR9_puWNveCo10q4pu6RSZ6Mh2YohgHL439UIJFfcvNVinQ2P_qGZHAJpILFvlAhlE3nJ2aXVm8rkNWiYllujUIjHs0j0"> <p>Which molecular response must be reached to be eligible for TFR with TASIGNA?</p> <div class="products-quiz-answer-container clearfix"> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">MR3</span> <input id="answer-id" name="answer-id" type="hidden" value="89563"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must reach a deep molecular response (DMR) of MR4.5 as one of the criteria to be eligible for TFR."> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">MR4</span> <input id="answer-id" name="answer-id" type="hidden" value="89564"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must reach a deep molecular response (DMR) of MR4.5 as one of the criteria to be eligible for TFR."> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">MR4.5</span> <input id="answer-id" name="answer-id" type="hidden" value="89565"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must reach a deep molecular response (DMR) of MR4.5 as one of the criteria to be eligible for TFR."> <input id="answer-correct" name="answer-correct" type="hidden" value="True"> </div> </div> </div> <div class="products-quiz-answer-description-container"> <div id="products-quiz-answer-component-89563"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Someone with Ph+ CML must reach a deep molecular response (DMR) of MR4.5 as one of the criteria to be eligible for TFR.</p></div><div id="products-quiz-answer-component-89564"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Someone with Ph+ CML must reach a deep molecular response (DMR) of MR4.5 as one of the criteria to be eligible for TFR.</p></div><div id="products-quiz-answer-component-89565"><p><span class="products-quiz-icon products-quiz-icon-correct"><img style="margin-bottom:5px; margin-right:5px;" class="" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizCorrectCheck.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-correct">Correct</span> : Someone with Ph+ CML must reach a deep molecular response (DMR) of MR4.5 as one of the criteria to be eligible for TFR.</p></div> </div> <div class="products-quiz-form-buttons"> <input class="products-quiz-form-button primary-brand-color-bg" type="submit" value="Next Question" name="products-quiz-form-submit" id="products-quiz-form-submit"> </div> <input id="form-quiz-id" name="form-quiz-id" type="hidden" value="89549"><input id="form-quiz-question-index" name="form-quiz-question-index" type="hidden" value="2"><input id="detectLang" name="detectLang" type="hidden" value="en"></form></div>',
				'<div id="products-quiz-question-component-89566" class="products-quiz-question-component col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-0 "> <form action="/modules/DigiOne.Oncology.Library/ProductQuizContainerBlock/Submit" data-ajax="true" data-ajax-complete="OnSubmitComplete()" data-ajax-method="POST" data-ajax-mode="replace" data-ajax-update="#products-quiz-question-component-89566" id="products-quiz-form" method="post"><input name="__RequestVerificationToken" type="hidden" value="Co4seVckXxiS87wsIhOs-W1MynR2QLmb0B9D1Xe1TlPqqMttcf15MZ5DOh1SOPwJ7JHqJvQDJVnQKA5XcLLB501KCYeU-86rIWBwcb914xlz2oijTEQdbcqNOOhr-6Lu0"> <p>How long must someone maintain MR4.5/DMR (deep molecular response) to be eligible for TFR with TASIGNA?</p> <div class="products-quiz-answer-container clearfix"> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">â‰¤ 6 months</span> <input id="answer-id" name="answer-id" type="hidden" value="89568"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must maintain MR4.5 or DMR for at least 1 year to be eligible for TFR. "> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">6 â€“ 11 months</span> <input id="answer-id" name="answer-id" type="hidden" value="89569"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must maintain MR4.5 or DMR for at least 1 year to be eligible for TFR. "> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">â‰¥ 1 year</span> <input id="answer-id" name="answer-id" type="hidden" value="89570"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML must maintain MR4.5 or DMR for at least 1 year to be eligible for TFR. "> <input id="answer-correct" name="answer-correct" type="hidden" value="True"> </div> </div> </div> <div class="products-quiz-answer-description-container"> <div id="products-quiz-answer-component-89568"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Someone with Ph+ CML must maintain MR4.5 or DMR for at least 1 year to be eligible for TFR. </p></div><div id="products-quiz-answer-component-89569"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Someone with Ph+ CML must maintain MR4.5 or DMR for at least 1 year to be eligible for TFR. </p></div><div id="products-quiz-answer-component-89570"><p><span class="products-quiz-icon products-quiz-icon-correct"><img style="margin-bottom:5px; margin-right:5px;" class="" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizCorrectCheck.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-correct">Correct</span> : Someone with Ph+ CML must maintain MR4.5 or DMR for at least 1 year to be eligible for TFR. </p></div> </div> <div class="products-quiz-form-buttons"> <input class="products-quiz-form-button primary-brand-color-bg" type="submit" value="Next Question" name="products-quiz-form-submit" id="products-quiz-form-submit"> </div> <input id="form-quiz-id" name="form-quiz-id" type="hidden" value="89549"><input id="form-quiz-question-index" name="form-quiz-question-index" type="hidden" value="3"><input id="detectLang" name="detectLang" type="hidden" value="en"></form></div>',
				'<div id="products-quiz-question-component-89571" class="products-quiz-question-component col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-0 "> <form action="/modules/DigiOne.Oncology.Library/ProductQuizContainerBlock/Submit" data-ajax="true" data-ajax-complete="OnSubmitComplete()" data-ajax-method="POST" data-ajax-mode="replace" data-ajax-update="#products-quiz-question-component-89571" id="products-quiz-form" method="post"><input name="__RequestVerificationToken" type="hidden" value="rHRQDZc8Uiel2UJBvN-5qFOZ9eeDXP5e3Ft1CHrWgy6a9t70GST_1TDbX6GheJzHDSZI6T8_KiDm5bR18G_qN4ue8JCUFiuPvdGqb4nKKwth2nfs4Hy73NWN-2pKiKqf0"> <p>Can someone with Ph+ CML restart TASIGNA if they lose MMR during TFR?</p> <div class="products-quiz-answer-container clearfix"> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">Yes</span> <input id="answer-id" name="answer-id" type="hidden" value="89573"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML has the possibility to restart TASIGNA with the goal to regain MR3/MMR."> <input id="answer-correct" name="answer-correct" type="hidden" value="True"> </div> </div> <div class="products-quiz-answer-component primary-brand-color-bg-hover-15" style="height: 99px;"> <div class="inner"> <span class="products-quiz-answer-component-title primary-brand-color">No</span> <input id="answer-id" name="answer-id" type="hidden" value="89574"> <input id="answer-description" name="answer-description" type="hidden" value="Someone with Ph+ CML has the possibility to restart TASIGNA with the goal to regain MR3/MMR."> <input id="answer-correct" name="answer-correct" type="hidden" value="False"> </div> </div> </div> <div class="products-quiz-answer-description-container"> <div id="products-quiz-answer-component-89573"><p><span class="products-quiz-icon products-quiz-icon-correct"><img style="margin-bottom:5px; margin-right:5px;" class="" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizCorrectCheck.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-correct">Correct</span> : Someone with Ph+ CML has the possibility to restart TASIGNA with the goal to regain MR3/MMR.</p></div><div id="products-quiz-answer-component-89574"><p><span class="products-quiz-icon products-quiz-icon-incorrect"><img style="margin-bottom:5px; margin-right:5px;" class="svg" src="../../modules/DigiOne.Oncology.Library/Client/Static/Images/Icons/QuizIncorrectx.png"></span><span class="products-quiz-icon-text products-quiz-icon-text-incorrect">Try again</span> : Someone with Ph+ CML has the possibility to restart TASIGNA with the goal to regain MR3/MMR.</p></div> </div> <div class="products-quiz-form-buttons"> <input class="products-quiz-form-button primary-brand-color-bg" type="submit" value="Start Over" name="products-quiz-form-submit-start" id="products-quiz-form-submit"> </div> <input id="form-quiz-id" name="form-quiz-id" type="hidden" value="89549"><input id="form-quiz-question-index" name="form-quiz-question-index" type="hidden" value="4"><input id="detectLang" name="detectLang" type="hidden" value="en"></form></div>'
			];
			jQuery('#products-quiz-question-container').html(tasignaQuiz[question-1]);
			if(answer > 0){
				jQuery('.products-quiz-answer-component').eq(answer-1).addClass('primary-brand-color-bg');
				jQuery('.products-quiz-answer-description-container > div').eq(answer-1).attr('style','display:block');
				if(jQuery('.products-quiz-answer-component').eq(answer-1).find('#answer-correct').val() == "True"){
					jQuery('.products-quiz-form-button').attr('style','display:inline-block')
				}
			}
		},
		//
		//
		//	 End of Tasigna specific code
		//
		//
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

				var holder = jQuery('.tab-help-content div').eq(index - 1).text();
				jQuery('.tooltip-box').html(holder);
			}
		},
		_element_showMenu: function _element_showMenu(arr) {
			var index = '';
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i].indexOf('menu=') > -1) {
					index = arr[i].split('=');
					index = index[1];
				}
			}
			console.log(index);

			if (index === '') {
				return;
			} else {
				var ww = $(window).width();
				if (ww >= 1024) {
					jQuery('.navbar-nav li.dropdown').eq(index - 1).addClass('open');
					jQuery('.dropdown-menu').eq(index - 1).css("max-height","none");
				} else {
					jQuery('.navbar-toggle').click();
					jQuery('.navbar-nav li.dropdown').eq(index - 1).addClass('open');
				}
			}
			jQuery('.modal-backdrop').css({
				'height': $('body').height(),
				'width': '100%'
			});
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
		_element_fillForm: function _element_fillForm() {
			var _this = this;

			var stockInfo = {
				// these are taken from the name field of the inputs on the page
				// add as necessary
				FirstName: "First",
				LastName: "Last",
				MailingAddress: "123 Anywhere St.",
				City: "Mobile",
				ZipCode: "11111",
				Email: "example@site.com"

				// Handle inputs
			};
			var inputs = [];

			//IE Does not support forEach
			//document.querySelectorAll('input').forEach(function(input){ inputs.push(input)});
			var nonTextInputs = ["radio", "checkbox", "submit", "hidden"];
			inputs = document.querySelectorAll('input');
		

			for(var i=0; i!=inputs.length; i++){
				if(nonTextInputs.indexOf(inputs[i].type) === -1){
					inputs[i].value = stockInfo[inputs[i].name]
				}
				else if(inputs[i].type === "radio"){
					omniScreenshots.handleRadio(inputs[i]);
				}
			}

			//IE Does not support forEach
			// inputs.forEach(function(input){
			// 	if(nonTextInputs.indexOf(input.type) === -1){
			// 		input.value = stockInfo[input.name]
			// 	}
			// 	else if(input.type === "radio"){
			// 		omniScreenshots.handleRadio(input);
			// 	}
			// });

			//var textInputs = inputs.filter(function (input) { return nonTextInputs.indexOf(input.type) === -1; });
			//var radioInputs = inputs.filter(function (input) { return input.type === "radio"; });

			// textInputs.map(function (input) {
			// 	input.value = stockInfo[input.name];
			// });
			// radioInputs.map(function (input) {
			// 	return _this.handleRadio(input);
			// });

			// Handle selects
			var selects = document.querySelectorAll('select');
			if (selects.length > 0) {
				omniScreenshots.handleSelects(selects);
			}
		},
		formReviewContent: '<div class="row"> <div class="ffb-component-form-container-top-content"> <div id="" class="ffb-component ffb-component-rich-content-block  col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="inner"> <div class="clearfix"> <div class="digione-image col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offet-3 col-xs-12"><img class="img-responsive digione-reset" alt="" src="../../../globalassets/products.com/sandostatin/carcinoid/patient-support/sign-up-for-support/realsupport-marquee.jpg" /></div> </div> <div id="detail-page-content-block-11502" class="products-detailed-content-block block-rich-text"> <div class="inner"> <h3 class="title primary-brand-color">Sign Up for RealSupportâ„¢</h3> <p><strong>RealSupportâ„¢</strong> is an information and support program specifically designed to help patients diagnosed with severe diarrhea and flushing associated with carcinoid syndrome to access the materials and tools they need to help manage their symptoms. Simply complete the questionnaire below to enroll with the <strong>RealSupportâ„¢</strong> program.</p> <p><strong>Through <strong>RealSupportâ„¢</strong>, youâ€™ll receive:</strong></p> </div> </div> <div id="link-list-item-block-18474" class="link-list-item-block "> <div class="inner"> <div class="link-list-item-thumbnail-image"><img alt="" src="../../../globalassets/products.com/sandostatin/carcinoid/patient-support/sign-up-for-support/real-stories-v2.jpg" /></div> <div class="link-list-item-content"> <h2>Patient Stories</h2> <p>Hearing from someone whoâ€™s been there can be helpful. Youâ€™ll find:</p> <ul> <li><strong>Patient Webcasts</strong> that give you a chance to view brief videos hosted by experts who can provide real insights into living with severe diarrhea and flushing associated with carcinoid syndrome</li> <li><strong>Podcasts</strong>, featuring stories of real people with the severe diarrhea and flushing associated with carcinoid syndrome</li> </ul> </div> </div> </div> <div id="link-list-item-block-18472" class="link-list-item-block "> <div class="inner"> <div class="link-list-item-thumbnail-image"><img alt="" src="../../../globalassets/products.com/sandostatin/carcinoid/patient-support/sign-up-for-support/real-recipes.jpg" /></div> <div class="link-list-item-content"> <h2>Recipes</h2> <p>Certain foods can trigger symptoms, so itâ€™s important to be aware of what you eat. Youâ€™ll have access to:</p> <ul> <li><strong>A Recipe Collection</strong>, prepared by an oncology nutritionist with expertise in supporting people living with the severe diarrhea and flushing associated with carcinoid syndrome</li> </ul> </div> </div> </div> <div id="link-list-item-block-18475" class="link-list-item-block "> <div class="inner"> <div class="link-list-item-thumbnail-image"><img alt="" src="../../../globalassets/products.com/sandostatin/carcinoid/patient-support/sign-up-for-support/downloadable-resources.jpg" /></div> <div class="link-list-item-content"> <h2>Resources and Support</h2> <p>Access downloadable tools to help you understand treatment:</p> <ul> <li>Enroll in <strong>RealSupportâ„¢</strong> now and get access to the latest educational information, recipes, and downloadable tools</li> </ul> </div> </div> </div> <h3 style="clear: both;">Privacy Notice</h3> <p>Novartis Pharmaceuticals Corporation and Novartis Group of Companies understands your personal and health information is private.</p> <p>&nbsp;</p> <p>The personal information we collect from you will be used to bring you information about products, programs, support, and services, to conduct market research, and as provided in our <a class="nobreak primary-brand-color" title="Novartis Privacy Policy" href="http://www.usprivacy.novartis.com" target="_blank">Privacy Policy</a>.</p> <p>&nbsp;</p> <p>You may unsubscribe from our programs and services at any time by calling <span class="nobreak primary-brand-color">1-888-669-6682</span>. For more information about our privacy practices, please visit our Privacy Policy at <a class="nobreak primary-brand-color" title="Novartis Privacy Policy" href="http://www.pharma.us.novartis.com/privacy-policy" target="_blank">www.usprivacy.novartis.com</a>.</p>    </div> </div> </div> <div class="ffb-component-form-container-step-container"> <form action="/modules/DigiOne.FluidFormBuilder.Components/FluidFormContainerBlock/Submit" data-ajax="true" data-ajax-begin="OnSubmitBegin()" data-ajax-complete="OnSubmitComplete()" data-ajax-failure="OnSubmitFailure()" data-ajax-method="POST" data-ajax-mode="replace" data-ajax-success="OnSubmitSuccess()" data-ajax-update="#ffb-component-form-container-31873" id="ffb-component-form" method="post"><input name="__RequestVerificationToken" type="hidden" value="YgxSNaAo9xPzE8SFy3ckoh6jVCc8J8UQHI1N9BVHIbXSv0qSNE3lbiZtEzjwhrGh9pHCkBWzYgIR0mc7zVFUN0aSVClAbWVZfGpuGhm2Cq5dX_b2F60BhaKoy84fT9hF0" /><ol class="ffb-component-form-container-step-nav secondary-brand-color" start= 1 ><li class=><span class="ffb-component-form-container-step-nav-text-mobile" >1/2</span><span>:</span><span class="ffb-component-form-container-step-nav-text" >Enter Your Information</span></li><li class=active ><span class="ffb-component-form-container-step-nav-text-mobile" >2/2</span><span>:</span><span class="ffb-component-form-container-step-nav-text" >Review and Submit</span></li></ol> <div id="ffb-component-form-summary-step-31877" class="ffb-component ffb-component-form-summary-step   col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="row"> <div class="ffb-submit-button-edit-container primary-brand-color"> <figure> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M1.6 74.4c18.9-19 37.9-38 56.7-56.8 6.9 6.9 13.3 13.3 20 19.9 -0.7 0.8-1.7 1.9-2.7 2.9C58.1 57.8 40.8 75.3 23.2 92.6L0 96 1.6 74.4z" ></path><path d="M64.8 10.5c3-2.8 6.1-5.6 9.1-8.5 3-2.8 5.9-2.7 8.7 0.1 3.8 3.8 7.6 7.5 11.3 11.3 2.7 2.7 2.7 5.5 0.1 8.4 -2.9 3.2-5.8 6.4-8.5 9.3C78.4 24.1 72 17.7 64.8 10.5z" ></path></svg> </figure> <input class="ffb-submit-button-edit primary-brand-color" type="submit" value="Edit" formnovalidate name="ffb-form-submit-edit" id="ffb-form-submit-edit" /> </div> <div id="" class="ffb-component ffb-component-rich-content-block review-content col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="inner"> <div class="personal-info row"> <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"> <h2>Name</h2> <p>First Last</p> </div> <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"> <h2>Email</h2> <p>example@site.com</p> </div> <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"> <h2>Mailing Address</h2> <p>123 Anywhere St.</p> </div> <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"> <h2>City</h2> <p>Mobile</p> </div> <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"> <h2>State</h2> <p>Alabama</p> </div> <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"> <h2>Zip Code</h2> <p>11111</p> </div> <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> <h2>Have you or someone you know experienced severe diarrhea or flushing associated with metastatic carcinoid tumors (carcinoid syndrome)?</h2> <p>Yes</p> </div> <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> <h2>What is your relationship to the person diagnosed with carcinoid syndrome?</h2> <p>I am the patient</p> </div> <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> <h2>Are you currently taking Sandostatin<sup>Â®</sup>&nbsp;(octreotide&nbsp;acetate) Injection or Sandostatin<sup>Â®</sup> LAR Depot&nbsp;(octreotide&nbsp;acetate for injectable suspension)? *</h2> <p>Yes</p> </div> </div>    </div> </div> <div id="" class="ffb-component ffb-component-rich-content-block  col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="inner"> <p>By clicking â€œSUBMIT,â€ I certify that I am 18 years of age or older. I agree to receive marketing information, offers, and promotions regarding Sandostatin<sup>Â®</sup> LAR Depot from Novartis Pharmaceuticals Corporation and also agree that I may be contacted for my opinions regarding products, programs, and services. I understand that the information that I provide will be used in accordance with the above Notice and the Novartis <a class="primary-brand-color" href="http://www.usprivacy.novartis.com" target="_blank">Privacy&nbsp;Policy</a>.</p>    </div> </div> </div> </div> <div class="ffb-submit-button-container" id="ffb-form-container-back"> <i class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></i> <input class="ffb-submit-button" type="submit" value="Back" formnovalidate name="ffb-form-submit" id="ffb-form-submit-back" /> </div> <div class="ffb-submit-button-container"> <i class="glyphicon glyphicon-refresh glyphicon-refresh-animate glyphicon-refresh-animate-submit"></i> <input class="ffb-submit-button ffb-final-submit-button" data-hvce="" data-hvce-description="" type="submit" value="Submit" name="ffb-form-submit" id="ffb-form-submit" /> </div> <div class="ffb-submit-button-container hidden-button"> <i class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></i> <input class="ffb-submit-button" type="submit" value="Back" formnovalidate name="ffb-form-submit" id="ffb-form-submit-back" /> </div> <input id="ffb-form-container-id" name="ffb-form-container-id" type="hidden" value="31873" /><input id="ffb-form-step-index" name="ffb-form-step-index" type="hidden" value="1" /><input id="FirstName" name="FirstName" type="hidden" value="First" /><input id="LastName" name="LastName" type="hidden" value="Last" /><input id="MailingAddress" name="MailingAddress" type="hidden" value="123 Anywhere St." /><input id="City" name="City" type="hidden" value="New York" /><input id="State" name="State" type="hidden" value="NY" /><input id="ZipCode" name="ZipCode" type="hidden" value="11111" /><input id="Email" name="Email" type="hidden" value="example@site.com" /><input id="diarrhea_or_flushing" name="diarrhea_or_flushing" type="hidden" value="Yes" /><input id="your_relationship" name="your_relationship" type="hidden" value="I am the patient" /><input id="currently_taking" name="currently_taking" type="hidden" value="Yes" /></form>    </div> </div>',

		formSuccessContent: '<div id="ffb-component-form-container-31873" data-evar36="success" data-tracking-event="event43" class="ffb-component ffb-component-form-container-success   col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="row"> <div id="" class="ffb-component ffb-component-rich-content-block success-page col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="inner"> <h2 class="primary-brand-color">Thank you! You are now registered for RealSupport<sup>â„¢</sup></h2> <h3 class="primary-brand-color">Here\'s what you can expect</h3> <p>During the course of your participation in the <strong>RealSupportâ„¢</strong> program, you\'ll receive <strong>a series of personalized communications</strong>, including e-mails, recipes, and real patient storiesâ€”all offering you useful information about the severe diarrhea and flushing symptoms of carcinoid syndrome and treatment with <span class="nobreak">Sandostatin<sup>Â®</sup>&nbsp;LAR&nbsp;Depot (octreotide acetate</span> for injectable suspension).</p>    </div> </div>    </div> </div>',
		formErrorContent: '<div id="ffb-component-form-container-31873" data-evar36="success" data-tracking-event="event43" class="ffb-component ffb-component-form-container-success   col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="row"> <div id="" class="ffb-component ffb-component-rich-content-block success-page col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="inner"> <h2 class="primary-brand-color">Sorry, a system error has occurred.</h2><p>We\'re working to fix this issue. Please try again later.</p>    </div> </div>    </div> </div>',

		formDuplicateContent: '<div id="ffb-component-form-container-31873" data-evar36="duplicate" data-tracking-event="event43" class="ffb-component ffb-component-form-container-duplicate   col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="row"> <div id="" class="ffb-component ffb-component-rich-content-block success-page col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0  col-md-offset-0 col-sm-offset-0  col-xs-offset-0 "> <div class="inner"> <h2 class="primary-brand-color">Hello, again! You\'re already enrolled in RealSupport<sup>â„¢</sup>.</h2>    </div> </div>    </div> </div>',

		formHeader: '<ol class="ffb-component-form-container-step-nav secondary-brand-color" start="1"><li class="active"><span class="ffb-component-form-container-step-nav-text-mobile">1/2</span><span>:</span><span class="ffb-component-form-container-step-nav-text">Enter Your Information</span></li><li class=""><span class="ffb-component-form-container-step-nav-text-mobile">2/2</span><span>:</span><span class="ffb-component-form-container-step-nav-text">Review and Submit</span></li></ol>',
		_element_missingHeader: function _element_missingHeader() {
			var theParent = document.querySelector(".ffb-component-form-step>.row");
			var theKid = document.createElement("div");
			theKid.innerHTML = this.formHeader;

			// append theKid to the end of theParent
			theParent.appendChild(theKid);

			// prepend theKid to the beginning of theParent
			theParent.insertBefore(theKid, theParent.firstChild);
		},
		_element_errorForm: function _element_errorForm() {
			document.querySelector('input[type="submit"]').click();
		},
		_element_submitForm: function _element_submitForm() {
			document.querySelector('.ffb-component-form-container').innerHTML = this.formReviewContent;
		},
		_element_formSuccess: function _element_formSuccess() {
			console.log("form success");
			document.querySelector('.ffb-component-form-container').innerHTML = this.formSuccessContent;
		},
		_element_formFailure: function _element_formFailure() {
			console.log("form failure");
			document.querySelector('.ffb-component-form-container').innerHTML = this.formErrorContent;
		},
		_element_formDuplicate: function _element_formDuplicate() {
			console.log("form duplicate");
			document.querySelector('.ffb-component-form-container').innerHTML = this.formDuplicateContent;
		},
		init: function init() {
			var href = window.location.href;
			var query = window.location.search;
			var keyValue = this._getKeyValue(query);

			console.log('loaded', keyValue);

			//CHECK FOR SPECIFIC KEY AND VALUE
			if (keyValue.indexOf('ed=1') > -1) { this._edMode(); }

			//CHECK FOR SPECIFIC KEY
			if (query.indexOf('showFlyout=1') > -1) { this._element_showFlyout(); }
			if (query.indexOf('headerAccordion=1') > -1) { this._element_showHeaderAccordion(); }
			if (query.indexOf('accordion=1') > -1) { this._element_showBodyAccordion(); }
			if (query.indexOf('menu=') > -1) { this._element_showMenu(keyValue); }
			if (query.indexOf('tabs=') > -1) { this._element_showTabs(keyValue); }
			if (query.indexOf('interstitial=1') > -1) { this._element_showInterstitial(); }
			if (query.indexOf('tooltip=1') > -1) { this._element_showTooltip(); }
			if (query.indexOf('missingHeader=1') > -1) { this._element_missingHeader(); }
			if (query.indexOf('fillForm=1') > -1) { this._element_fillForm(); }
			if (query.indexOf('submitForm=1') > -1) { this._element_submitForm(); }
			if (query.indexOf('errorForm=1') > -1) { this._element_errorForm(); }
			if (query.indexOf('formSuccess=1') > -1) { this._element_formSuccess(); }
			if (query.indexOf('formFailure=1') > -1) { this._element_formFailure(); }
			if (query.indexOf('formDuplicate=1') > -1) { this._element_formDuplicate(); }

			//quiz calls only works on tasigna consumer
			if (query.indexOf('quiz=') > -1) { this._element_quiz(keyValue); }
		}
	};

	omniScreenshots.init();
})(jQuery);