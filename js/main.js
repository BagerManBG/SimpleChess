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
		
		for (var i = 0; i < greenDots.length; i++) {

			$('.field#' + greenDots[i]).removeClass('greenBG');
			$(this).parent().removeClass('selectedPiece');
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
	$('.field#0_4').append("<img src='resources/images/pieces/b_g.svg' id='b_g' class='b'>");

	$('.field#7_0, .field#7_7').append("<img src='resources/images/pieces/w_t.svg' id='w_t' class='w'>");
	$('.field#7_1, .field#7_6').append("<img src='resources/images/pieces/w_k.svg' id='w_k' class='w'>");
	$('.field#7_2, .field#7_5').append("<img src='resources/images/pieces/w_o.svg' id='w_o' class='w'>");
	$('.field#7_3').append("<img src='resources/images/pieces/w_q.svg' id='w_q' class='w'>");
	$('.field#7_4').append("<img src='resources/images/pieces/w_g.svg' id='w_g' class='w'>");

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
			if(x + 1 <= 7 || x - 1 >= 0) {

				greenX.push( eval(x + sign + '1') );
				greenY.push(y);
				dots++;
			}

			if (turn == 1) {

				greenX.push( eval(x + sign + '2') );
				greenY.push(y);
				dots++;
			}
			break;

		case 'k':
			if(x + 2 <= 7) {

				if(y + 1 <= 7) {

					greenX.push(x+2); greenY.push(y+1);
					dots++;
				}

				if(y - 1 >= 0) {

					greenX.push(x+2); greenY.push(y-1);
					dots++;
				}
			}

			if(x - 2 >= 0) {

				if(y + 1 <= 7) {

					greenX.push(x-2); greenY.push(y+1);
					dots++;
				}

				if(y - 1 >= 0) {

					greenX.push(x-2); greenY.push(y-1);
					dots++;
				}
			}
			break;

		case 't':
			/* upwards */
			for (var i = x - 1; i >= 0; i--) {
				
				greenX.push(i);
				greenY.push(y);
				dots++;
			}

			/* downwards */
			for (var i = x + 1; i <= 7 - x; i++) { 
				
				greenX.push(i);
				greenY.push(y);
				dots++;
			}

			/* left */
			for (var i = y - 1; i >= 0; i--) {
				
				greenX.push(x);
				greenY.push(i);
				dots++;
			}

			/* right */
			for (var i = y + 1; i <= 7 - y; i++) { 
				
				greenX.push(x);
				greenY.push(i);
				dots++;
			}

		default:
			break;
	}

	for (var i = 0; i < dots; i++) {

		greenDots.push( greenX[i] + '_' + greenY[i] );

		$('.field#' + greenDots[i]).addClass('greenBG');
		piece.parent().addClass('selectedPiece');
	}
}