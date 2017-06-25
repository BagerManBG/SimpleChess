$(document).ready(function(){

	createField();
	initializeField();

	$('#main-content .field img').bind("click", function(){

		var $this = $(this);
		var id = $this.attr('id');
		var coords = $this.parent().attr('id');

		console.log(id + " on " + coords);
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