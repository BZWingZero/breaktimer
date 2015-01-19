var name = 'Brian';

var breakEnds = new Date();
var currTime = new Date();

var breakLen = 15;
var mealLen = 60;

var breakType = 0; // 0 is break, 1 is meal
var recordNum;

$(document).ready(function(){

	$('.break-start').height($('.break-start').width());
	$(window).resize(function(){
		$('.break-start').height($('.break-start').width());
	});

	//Loads the images
	$('.coffee').html(coffeeSVG);
	$('.pizza').html(pizzaSVG);

	$('.welcome').html('Welcome '+name+'!');

	//controls the click to start a break
	$('#coffee').click(function(){
		breakType = 0;
		$('.timer').html(breakLen+':00');
		getStartTime(breakLen);
		breakStart();
	});
	$('#pizza').click(function(){
		breakType = 1;
		$('.timer').html(mealLen+':00');
		getStartTime(mealLen);
		breakStart();
	});

	function getStartTime(len) {
		currTime.getTime();
		breakEnds.setTime(currTime.getTime()+(len*60000));
	}

	function breakStart() {
		var h, m, s;
		var onBreak = true;

		$('.btn-wrapper').hide();
		$('.header-row').hide();
		$('.break-running-wrapper').fadeIn('200');

		//Sets the number of seconds in the break
		secondsLeft = parseInt( (breakEnds.getTime()-currTime.getTime()) / 1000);

		// h = parseInt(secondsLeft % 3600);
		// //secondsLeft = secondsLeft % 3600;
		// m = parseInt(secondsLeft / 60);
		// s = parseInt(secondsLeft % 60);


		var timer = setInterval(function() {
			secondsLeft--;

			h = parseInt(secondsLeft % 3600);
			//secondsLeft = secondsLeft % 3600;
			m = parseInt(secondsLeft / 60);
			s = parseInt(secondsLeft % 60);

			if (s < 10) {
				s = "0"+s;
			}

			$('.timer').html(m+':'+s);

			//Stops the timer when time runs out
			if(secondsLeft === 0){
				breakEnd(timer);
			}
		}, 1000);

		//Ends the timer when the stop button is clicked
		$('.end-break').click(function() {
			breakEnd(timer);
		});
		
	}

});

if(!localStorage.recordCount) {
	populateHistory();
} else {
	recordNum = localStorage.recordCount;
	console.log(recordNum);
	checkNext(recordNum);
}

function breakEnd(timer) {
	clearInterval(timer);
	$('.break-start').height($('.break-start').width());
	$('.break-running-wrapper').hide();
	$('.btn-wrapper').fadeIn('200');
	$('.break-start').height($('.break-start').width());

	t = new Date();

	var completedBreakStart = currTime.getTime();
	var completedBreakEnd = t.getTime();

	if(breakType === 0) {
		localStorage.setItem('breakType', 'coffee');
	} else {
		localStorage.setItem('breakType', 'pizza');
	}

	var breakRecord = [breakType, completedBreakStart, completedBreakEnd];
	recordNum++;
	console.log(recordNum);
	localStorage.recordCount = recordNum;
	localStorage.setItem('breakRecord'+recordNum, JSON.stringify(breakRecord));
	console.log('stored new break record: '+localStorage.getItem('breakRecord'+recordNum));
}

function populateHistory() {
	console.log('populate');
	recordNum = 0;
	localStorage.recordCount = recordNum;
}

function checkNext(recordNum) {
	for(i = 0; i <= recordNum && i < 5; i++) {
	//if(localStorage.getItem('breakRecord'+recordNum) !== null) {
		var completedBreakStart = new Date();
		var completedBreakEnd = new Date();
		var completedBreakType;

		var retrievedRecord = localStorage.getItem('breakRecord'+i);
		console.log(JSON.parse(retrievedRecord));
		if (JSON.parse(retrievedRecord)[0] === 0) {
			completedBreakType = "coffee";
		} else if(JSON.parse(retrievedRecord)[0] ===1){
			completedBreakType = "pizza";
		}

		completedBreakStart.setTime(JSON.parse(retrievedRecord)[1]);
		completedBreakEnd.setTime(JSON.parse(retrievedRecord)[2]);

		$('.list-group').prepend('<li class="list-group-item" id="first-history"><h4><div class="history-list-span '+completedBreakType+'"></div>Break from <strong>'+completedBreakStart.toLocaleTimeString()+'</strong> to <strong>'+completedBreakEnd.toLocaleTimeString()+'</strong></li>');
		//recordNum++;
		//checkNext(recordNum);
	 } //else {
	// 	console.log('end of records. '+recordNum+' of records found.');
	// }
}

//The following two variables store the svgs for the buttons
var coffeeSVG = '<svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" preserveAspectRatio="xMinYMin meet" class="svg-content" xml:space="preserve">\
	<path d="M383.1,257.4c0.6-5.4,0.9-10,0.9-13.8c0-19.6-3.3-19.7-16-19.7h-75.5c7.3-12,11.5-24.4,11.5-37c0-37.9-57.3-56.4-57.3-88\
	c0-11.7,5.1-21.3,9.3-34.9c-26.5,7-47.4,33.5-47.4,61.6c0,48.3,56.3,48.7,56.3,84.8c0,4.5-1.4,8.5-2.1,13.5h-55.9\
	c0.8-3,1.3-6.2,1.3-9.3c0-22.8-39.1-33.9-39.1-52.8c0-7,1-12.8,3.2-21c-12.9,5.1-28.3,20-28.3,36.8c0,26.7,31.9,29.3,36.8,46.3H80\
	c-12.7,0-16,0.1-16,19.7c0,19.6,7.7,61.3,28.3,111c20.6,49.7,44.4,71.6,61.2,86.2l0.1-0.2c5.1,4.6,11.8,7.3,19.2,7.3h102.4\
	c7.4,0,14.1-2.7,19.2-7.3l0.1,0.2c9-7.8,20-17.8,31.4-32.9c4.7,2,9.8,3.7,15.4,5c8.4,2,16.8,3,24.8,3c24,0,45.6-9.2,60.8-25.8\
	c13.4-14.6,21.1-34.4,21.1-54.2C448,297,420,264.5,383.1,257.4z M366.1,384.2c-8.6,0-15.6-1.2-22.1-4.2c4-8,7.9-15.9,11.7-25.1\
	c10.1-24.4,17.1-47,21.6-65.8c22,4.3,38.7,23.8,38.7,47.1C416,358.9,398.8,384.2,366.1,384.2z"/>\
	</svg>'
var pizzaSVG = '<svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" preserveAspectRatio="xMinYMin meet" class="svg-content" xml:space="preserve">\
	<g>\
	<path d="M396.7,131.4c-0.1-0.1-0.2-0.1-0.3-0.2c-0.6-0.2-1.1-0.5-1.6-0.7c0,0,0,0-0.1,0C352.3,112.3,305.4,102,256,102\
	c-49.4,0-96.3,10-138.7,28c0,0-0.1,0-0.1,0c-0.6,1-1.2,0.8-1.9,1.1c-0.1,0-0.1,0.1-0.1,0.2c-4.8,2.5-8.1,7.4-8.1,13.1\
	c0,1.8,0.3,3.6,1,5.1l0,0.1L256,480l147.6-329.9l0,0c0.8-1.8,1.2-3.7,1.2-5.8C404.8,138.8,401.5,133.9,396.7,131.4z M247.3,118\
	c3.8-2.2,8.7-0.8,10.9,3c0.1,0.2,3.4,5.8,9.3,9.5c7.1,4.6,14.8,4.5,23.5-0.4c3.8-2.2,8.7-0.8,10.9,3c2.2,3.8,0.8,8.7-3,10.9\
	c-14,7.9-28.4,7.7-40.7-0.5c-8.7-5.9-13.4-13.8-13.8-14.7C242.1,125.1,243.4,120.2,247.3,118z M160,160.1c0-17.7,14.3-32,32-32\
	s32,14.3,32,32s-14.3,32-32,32S160,177.7,160,160.1z M213.8,261.4c-0.3,4.4-4.2,7.7-8.6,7.4c-4.4-0.3-7.7-4.2-7.4-8.6\
	c1.2-16,9.4-27.9,23.1-33.5c9.7-4,18.9-3.4,19.9-3.3c4.4,0.3,7.7,4.2,7.4,8.6c-0.3,4.4-4.2,7.7-8.5,7.4c-0.2,0-6.7-0.4-13.1,2.4\
	C218.7,245,214.6,251.5,213.8,261.4z M268.1,395.1c-9.3,5-18.4,5.4-19.4,5.4c-4.4,0.1-8.1-3.3-8.2-7.8c-0.1-4.4,3.3-8.1,7.7-8.2\
	c0.2,0,6.7-0.3,12.8-3.7c7.4-4.2,10.8-11,10.5-21c-0.1-4.4,3.3-8.1,7.8-8.2c4.4-0.1,8.1,3.3,8.2,7.8\
	C288,375.4,281.1,388.1,268.1,395.1z M256,339.1c-17.7,0-32-14.3-32-32s14.3-32,32-32s32,14.3,32,32S273.7,339.1,256,339.1z\
	 M320,224.1c-17.7,0-32-14.3-32-32s14.3-32,32-32s32,14.3,32,32S337.7,224.1,320,224.1z"/>\
	<path d="M423.7,65.9c-0.6-0.3-1.2-0.9-1.8-0.9c-0.1,0-0.1,0-0.1,0C371.1,44,315,31.9,256,31.9c-58.9,0-115.1,11.9-165.8,33.3l0,0\
	c-0.7,0.3-1.3,0.6-2,0.9c0,0,0,0-0.1,0c-4.8,2.5-8.1,7.4-8.1,13c0,1.7,0.3,3.4,0.9,5c0.1,0.4,0.2,0.7,0.4,1l6.6,15.9l1,2.4\
	c2.5,4.9,7.7,8.2,13.8,8.2c2.1,0,4.2-0.4,6-1.2c0.2-0.1,0.5-0.2,0.7-0.3c44.9-19,94.5-29.6,146.7-29.6\
	c52.2,0,101.8,10.6,146.7,29.6c0.2,0.1,0.5,0.2,0.7,0.3c1.8,0.8,3.8,1.2,6,1.2c6,0,11.2-3.3,13.7-8.1l1.1-2.6l6.5-15.8\
	c0.2-0.3,0.3-0.6,0.4-1c0.6-1.6,0.9-3.3,0.9-5C432,73.4,428.6,68.4,423.7,65.9z"/>\
	</g>\
	</svg>'