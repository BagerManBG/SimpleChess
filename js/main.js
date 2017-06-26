var playerTurn = 1; //1 - whites; 0 - blacks
var turn = 1;
var greenDots = new Array();

$(document).ready(function(){

	createField();
	initializeField();

	$('#main-content .field img').bind("mouseenter", function(){

		var $this = $(this);

		var coords = $this.parent().attr('id');
		var x = parseInt(coords.charAt(0));
		var y = parseInt(coords.charAt(2)); 

		var id = $this.attr('id');
		var color = id.charAt(0);
		var type = id.charAt(2);

		findPossibleMoves($this, x, y, color, type);
	});

	$('#main-content .field img').bind("mouseleave", function(){
		//console.log(greenDots[0]);
		for (var i = 0; i < greenDots.length; i++) {
			$('.field#' + greenDots[i]).removeClass('greenBG');
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

	$('.field#0_0, .field#0_7').append("<img src='resources/images/pieces/b_t.svg' id='b_t' class='b'>");
	$('.field#0_1, .field#0_6').append("<img src='resources/images/pieces/b_k.svg' id='b_k' class='b'>");
	$('.field#0_2, .field#0_5').append("<img src='resources/images/pieces/b_o.svg' id='b_o' class='b'>");
	$('.field#0_3').append("<img src='resources/images/pieces/b_q.svg' id='b_q' class='b'>");
	$('.field#0_4').append("<img src='resources/images/pieces/b_kg.svg' id='b_kg' class='b'>");

	$('.field#7_0, .field#7_7').append("<img src='resources/images/pieces/w_t.svg' id='w_t' class='w'>");
	$('.field#7_1, .field#7_6').append("<img src='resources/images/pieces/w_k.svg' id='w_k' class='w'>");
	$('.field#7_2, .field#7_5').append("<img src='resources/images/pieces/w_o.svg' id='w_o' class='w'>");
	$('.field#7_3').append("<img src='resources/images/pieces/w_q.svg' id='w_q' class='w'>");
	$('.field#7_4').append("<img src='resources/images/pieces/w_kg.svg' id='w_kg' class='w'>");

	for (var i = 0; i < 8; i++) {
		
		$('.field#1_' + i).append("<img src='resources/images/pieces/b_p.svg' id='b_p' class='b'>");
		$('.field#6_' + i).append("<img src='resources/images/pieces/w_p.svg' id='w_p' class='w'>");
	}

	$('.field img').addClass('pieces');
	$('.field img.w').addClass('onTurn');
}

function changeTurn() {

	switch (playerTurn) {

		case 0:
			playerTurn++;
			$('.field img.b').removeClass('onTurn');
			$('.field img.w').addClass('onTurn');
			break;

		case 1:
			playerTurn--;
			$('.field img.w').removeClass('onTurn');
			$('.field img.b').addClass('onTurn');
			break;

		default:
			break;
	}

	if( $('#main-content').hasClass('rotated') ) {

		$('#main-content').removeClass('rotated');
	} else {

		$('#main-content').addClass('rotated');
	}

	console.log(playerTurn);
}

function findPossibleMoves(piece, x, y, color, type) {

	var greenX = new Array();
	var greenY = new Array();
	var dots = 0;
	var sign;

	switch (color) {

		case 'b':
			sign = '+';
			break;

		case 'w':
			sign = '-';
			break;

		default:
			break;
	}

	switch(type) {

		case 'p':
			greenX.push( eval(x + sign + '1') );
			greenY.push(y);
			dots++;

			if (turn == 1) {

				greenX.push( eval(x + sign + '2') );
				greenY.push(y);
				dots++;
			}
			break;

		default:
			break;
	}

	for (var i = 0; i < dots; i++) {

		greenDots.push( greenX[i] + '_' + greenY[i] );

		$('.field#' + greenDots[i]).addClass('greenBG');
	}

	/*
	if (id == 'w_p') {

		if (turn == 1) {

			greenX = x - 2;
			greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
			greenX = x - 1;
			greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
		} else {

			greenX = x - 1;
			greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
		}

		for (var i = 0; i < greenDots.length; i++) {

			$('.field#' + greenDots[i]).addClass('greenBG');
		}

		greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
	}

	if (id == 'b_p') {

		if (turn == 1) {

			greenX = x + 2;
			greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
			greenX = x + 1;
			greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
		} else {

			greenX = x + 1;
			greenDots.push($('.field#' + greenX + '_' + y).attr('id'));
		}

		for (var i = 0; i < greenDots.length; i++) {

			$('.field#' + greenDots[i]).addClass('greenBG');
		}	
	}
	*/
}