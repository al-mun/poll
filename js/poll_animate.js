// JavaScript Document
$(document).ready(function () {
//run this file only when the page is loaded, run the file
	///1. first we take care of scaling the height of the "results" div, so it is always in proportion to its width///////////////////////////
	var resultsW;
	var resultsH;
	if ($(window).width() > 1200) { // big screen
		resultsW = 1180;
		resultsH = 600;
	} else {						// small screen
		resultsW = $("#container").innerWidth();
		resultsH = resultsW / 1.5;
	}

	//alert (resultsW);


	$("#results").height(resultsH);

	//////////////////////////end scaling results height//////////////////////////////////////////////////////////////////////////////////////////////////////

	///2. we create the loadXMLDoc function./////////////////////////////////////////////
	
	var xmlhttp;

	function loadXMLDoc(url, callfunc) {

		xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = callfunc;
//cal the function I will give you, only when the ready state changes
		xmlhttp.open("POST", url, true);
		xmlhttp.send();


	} 

	//////////////////end loadXMLDoc/////////////////////////////////////////////////////////////////
	
	
	////////////////////////3. call and define the getMyData() function///////////////////////////////
	getMyData();

	function getMyData() {

		loadXMLDoc("poll_to_xml.php", function () {

			//alert(xmlhttp.status);

			if (xmlhttp.readyState == 4) {
// if the file we requested is fully ready. 
				//alert(xmlhttp.responseText);
				var response = xmlhttp.responseText;
				/////


				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(response, "text/xml");

				var children = xmlDoc.getElementsByTagName('voter');	//build an array of voters
				//alert(children[3].getAttribute('myoption'));
				//alert(children.length);
				var totalVotes = 0;
				var Avotes = 0;
				var Bvotes = 0;
				var Cvotes = 0;


				for (var i = 0; i < children.length; i++) {		//for loop, loop through every vote


					var findOut = children[i].getAttribute('myoption');

					switch (findOut) {
						case "a":
							Avotes++;
							break;

						case "b":
							Bvotes++;
							break;

						case "c":
							Cvotes++;
							break;


					} //end switch
											//Now we have a count of how many 'A's 'B's and 'C's there are. 

				} //end for loop

				//alert (Avotes);


				totalVotes = children.length;
				//alert(Cvotes);

				var Atext = "Banana: " + Avotes + "<br/>" + (Avotes / totalVotes * 100).toFixed(1) + "%";			//text at the bottom of the results. toFixed rounds to a number
				var Btext = "Stawberry: " + Bvotes + "<br/>" + (Bvotes / totalVotes * 100).toFixed(1) + "%";
				var Ctext = "Avocado: " + Cvotes + "<br/>" + (Cvotes / totalVotes * 100).toFixed(1) + "%";

				$("#optAbottom").html(Atext);
				$("#optBbottom").html(Btext);
				$("#optCbottom").html(Ctext);

				var whoTallest = Math.max(Avotes, Bvotes, Cvotes);	//who's the tallest?
				//	alert (whoTallest);
				var heightUnit = resultsH / whoTallest * 0.6;		// The part that grows will take 60% of the results height
				//alert (heightUnit);



				var Aheight = (resultsH * 0.3) + (Avotes * heightUnit);
				var Bheight = (resultsH * 0.3) + (Bvotes * heightUnit);
				var Cheight = (resultsH * 0.3) + (Cvotes * heightUnit);
//calculate the height of each bar, but the min is 30% of the results height. This allows at least the image to show.


				$("#optA").animate({
					height: Aheight + "px"
				}, 700, "easeInOutBack", function () {
					$("#optB").animate({
							height: Bheight + "px"
						}, 700, "easeInOutBack", function () {
							$("#optC").animate({
								height: Cheight + "px"
							}, 700, "easeInOutBack")	//1300 = animation speed
						}) //end animate b
				}); //end animate a


			} //end if ready state
		}); //end loadXML func
	} //end getMy data

///////////////end getMyData()//////////////////////////////////////////////////////////////////////////


	/////////////////////////////////4. reset every time window is resized///////////////////////////////
	function myreset() {
		location.reload(); //reload the page
	}

	var $window = $(window);
	var lastWindowWidth = $window.width();

	$window.resize(function () {
		/* Do not calculate the new window width twice.
		 * Do it just once and store it in a variable. */
		var windowWidth = $window.width();

		/* Use !== operator instead of !=. */
		if (lastWindowWidth !== windowWidth) {
			var doit; //declare a new obj
			clearTimeout(doit); //clear prev values
			doit = setTimeout(myreset, 1000); //after 1000 ms call the func 
			lastWindowWidth = windowWidth;
		}
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


}); //end doc ready