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

			var htmlToAdd = "<div class='field " + color + "' id=" + j + "_" + i + "></div";
			$('#main-content').append(htmlToAdd);
		}
	}
}

function initializeField() {

	$('.field#0_0, .field#7_0').append("<img src='resources/images/pieces/b_t.svg' id='b_t' class='b'>");
	$('.field#1_0, .field#6_0').append("<img src='resources/images/pieces/b_k.svg' id='b_k' class='b'>");
	$('.field#2_0, .field#5_0').append("<img src='resources/images/pieces/b_o.svg' id='b_o' class='b'>");
	$('.field#3_0').append("<img src='resources/images/pieces/b_q.svg' id='b_q' class='b'>");
	$('.field#4_0').append("<img src='resources/images/pieces/b_g.svg' id='b_g' class='b'>");

	$('.field#0_7, .field#7_7').append("<img src='resources/images/pieces/w_t.svg' id='w_t' class='w'>");
	$('.field#1_7, .field#6_7').append("<img src='resources/images/pieces/w_k.svg' id='w_k' class='w'>");
	$('.field#2_7, .field#5_7').append("<img src='resources/images/pieces/w_o.svg' id='w_o' class='w'>");
	$('.field#3_7').append("<img src='resources/images/pieces/w_q.svg' id='w_q' class='w'>");
	$('.field#4_7').append("<img src='resources/images/pieces/w_g.svg' id='w_g' class='w'>");

	for (var i = 0; i <= 7; i++) {
		
		$('.field#' + i + '_1').append("<img src='resources/images/pieces/b_p.svg' id='b_p' class='b'>");
		$('.field#' + i + '_6').append("<img src='resources/images/pieces/w_p.svg' id='w_p' class='w'>");
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
			if (y + 1 <= 7 || y - 1 >= 0) {

				greenX.push(x);
				greenY.push( eval(y + sign + '1') );
				dots++;
			}

			if (turn == 1) {

				greenX.push(x);
				greenY.push( eval(y + sign + '2') );
				dots++;
			}
			break;

		case 'k':
			if (y + 2 <= 7) {

				if (x + 1 <= 7) {

					greenX.push(x+1);
					greenY.push(y+2);
					dots++;
				}

				if (x - 1 >= 0) {

					greenX.push(x-1);
					greenY.push(y+2);
					dots++;
				}
			}

			if (y - 2 >= 0) {

				if (x + 1 <= 7) {

					greenX.push(x+1);
					greenY.push(y-2);
					dots++;
				}

				if (x - 1 >= 0) {

					greenX.push(x-1);
					greenY.push(y-2);
					dots++;
				}
			}
			break;

		case 't':
			var i_1 = y - 1; /* upwards */
			var i_2 = y + 1; /* downwards */
			var i_3 = x - 1; /* left */
			var i_4 = x + 1; /* right */

			for (var i = 0; i < 7; i++) {
				
				/* upwards */
				if ( i_1 >= 0 ) { 

					greenX.push(x);
					greenY.push(i_1);
					dots++;
					i_1--;
				} 

				/* downwards */
				if ( i_2 <= 7 ) { 

					greenX.push(x);
					greenY.push(i_2);
					dots++;
					i_2++;
				}

				/* left */
				if ( i_3 >= 0 ) { 

					greenX.push(i_3);
					greenY.push(y);
					dots++;
					i_3--;
				}

				/* right */
				if ( i_4 <= 7 ) { 

					greenX.push(i_4);
					greenY.push(y);
					dots++;
					i_4++;
				}
			}
			break;

		case 'o':
			/* up-right */
			x_1 = x + 1;
			y_1 = y - 1;

			/* up-left */
			x_2 = x - 1;
			y_2 = y - 1;

			/* down-right */
			x_3 = x + 1;
			y_3 = y + 1;

			/* down-left */
			x_4 = x - 1;
			y_4 = y + 1;

			for (var i = 0; i < 7; i++) {

				/* up-right */
				if(x_1 <= 7 && y_1 >= 0) {

					greenX.push(x_1);
					greenY.push(y_1);
					dots++;
					x_1++;
					y_1--;
				}

				/* up-left */
				if(x_2 >= 0 && y_2 >= 0) {

					greenX.push(x_2);
					greenY.push(y_2);
					dots++;
					x_2--;
					y_2--;
				}

				/* down-right */
				if(x_3 <= 7 && y_3 <= 7) {

					greenX.push(x_3);
					greenY.push(y_3);
					dots++;
					x_3++;
					y_3++;
				}

				/* down-left */
				if(x_4 >= 0 && y_4 <= 7) {

					greenX.push(x_4);
					greenY.push(y_4);
					dots++;
					x_4--;
					y_4++;
				}
			}

			break;

		default:
			break;
	}

	//console.log(dots);

	for (var i = 0; i < dots; i++) {

		greenDots.push( greenX[i] + '_' + greenY[i] );

		$('.field#' + greenDots[i]).addClass('greenBG');
		piece.parent().addClass('selectedPiece');
	}
}