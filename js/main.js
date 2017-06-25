$(document).ready(function(){

	createField();
	initializeField();

	// $('#main-content .field img').bind("click", function(){

	// 	var $this = $(this);
	// 	var id = $this.attr('id');
	// 	var coords = $this.parent().attr('id');
	// 	var x = coords.charAt(0);
	// 	var y = coords.charAt(2); 

	// 	console.log(id + " on " + coords);

	// 	if (id == 'w_p') {
	// 		var greenX = x - 1;
	// 		$('.field#' + pX + '_' + y).css('background-color', 'green');
	// 		console.log($('.field#' + x + '_' + y).attr(id))
	// 	}
	// });

	var greenDots = new Array();

	$('#main-content .field img').bind("mouseenter", function(){

		var $this = $(this);
		var id = $this.attr('id');
		var coords = $this.parent().attr('id');
		var x = coords.charAt(0);
		var y = coords.charAt(2); 

		//console.log(id + " on " + coords);

		if (id == 'w_p') {
			var greenX = x - 1;
			$('.field#' + greenX + '_' + y).css('background-image', "url('resources/images/GreenDot.png')");
			//console.log($('.field#' + greenX + '_' + y).attr(id))
			greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
		}
	});

	$('#main-content .field img').bind("mouseleave", function(){
		console.log(greenDots[0]);
		for (var i = 0; i < greenDots.length; i++) {
			$('.field#' + greenDots[i]).css('background-image', "none");
		}
		greenDots.length = 0;
	});
});

function createField() {

	for (var i = 0; i < 8; i++) {
		
		for (var j = 0; j < 8; j++) {
			
			var color;

			if( (i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0) ) {

				color = "black";
			} else {

				color = "white";
			}

			var htmlToAdd = "<div class='field " + color + "' id=" + i + "_" + j + "></div";
			$('#main-content').append(htmlToAdd);
		}
	}
}

function initializeField() {

	$('.field#0_0, .field#0_7').append("<img src='resources/images/pieces/b_t.svg' id='b_t'>");
	$('.field#0_1, .field#0_6').append("<img src='resources/images/pieces/b_k.svg' id='b_k'>");
	$('.field#0_2, .field#0_5').append("<img src='resources/images/pieces/b_o.svg' id='b_o'>");
	$('.field#0_3').append("<img src='resources/images/pieces/b_q.svg' id='b_q'>");
	$('.field#0_4').append("<img src='resources/images/pieces/b_kg.svg' id='b_kg'>");

	$('.field#7_0, .field#7_7').append("<img src='resources/images/pieces/w_t.svg' id='w_t'>");
	$('.field#7_1, .field#7_6').append("<img src='resources/images/pieces/w_k.svg' id='w_k'>");
	$('.field#7_2, .field#7_5').append("<img src='resources/images/pieces/w_o.svg' id='w_o'>");
	$('.field#7_3').append("<img src='resources/images/pieces/w_q.svg' id='w_q'>");
	$('.field#7_4').append("<img src='resources/images/pieces/w_kg.svg' id='w_kg'>");

	for (var i = 0; i < 8; i++) {
		
		$('.field#1_' + i).append("<img src='resources/images/pieces/b_p.svg' id='b_p'>");
		$('.field#6_' + i).append("<img src='resources/images/pieces/w_p.svg' id='w_p'>");
	}
}
