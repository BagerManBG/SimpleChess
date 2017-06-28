function findPossibleMoves(piece, x, y, color, type) {

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

	var i_1 = y - 1; /* upwards */
	var i_2 = y + 1; /* downwards */
	var i_3 = x - 1; /* left */
	var i_4 = x + 1; /* right */

	/* up-right */
	var x_1 = x + 1;
	var y_1 = y - 1;

	/* up-left */
	var x_2 = x - 1;
	var y_2 = y - 1;

	/* down-right */
	var x_3 = x + 1;
	var y_3 = y + 1;

	/* down-left */
	var x_4 = x - 1;
	var y_4 = y + 1;

	switch(type) {

		case 'p':
			if (y + 1 <= 7 || y - 1 >= 0) {

				greenX.push(x);
				greenY.push( eval(y + sign + '1') );
				dots++;
			}

			if ((y == 6 && color == 'w') || (y == 1 && color == 'b')) {

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
			dots += horizVertCheck(i_1, i_2, i_3, i_4, x, y, 7);
			break;

		case 'o':
			dots += diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, 7);
			break;

		case 'q':
			dots += horizVertCheck(i_1, i_2, i_3, i_4, x, y, 7);
			dots += diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, 7);
			break;

		case 'g':
			dots += horizVertCheck(i_1, i_2, i_3, i_4, x, y, 1);
			dots += diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, 1);
			break;

		default:
			break;
	}

	for (var i = 0; i < dots; i++) {

		greenDots.push( greenX[i] + '_' + greenY[i] );

		$('.field#' + greenDots[i]).addClass('greenBG');
		piece.parent().addClass('selectedPiece');
	}

	greenX.length = 0;
	greenY.length = 0;
}

function horizVertCheck(i_1, i_2, i_3, i_4, x, y, loops) {

	var dots_loc = 0;

	for (var i = 0; i < loops; i++) {
				
		/* upwards */
		if ( i_1 >= 0 ) { 

			greenX.push(x);
			greenY.push(i_1);
			dots_loc++;
			i_1--;
		} 

		/* downwards */
		if ( i_2 <= 7 ) { 

			greenX.push(x);
			greenY.push(i_2);
			dots_loc++;
			i_2++;
		}

		/* left */
		if ( i_3 >= 0 ) { 

			greenX.push(i_3);
			greenY.push(y);
			dots_loc++;
			i_3--;
		}

		/* right */
		if ( i_4 <= 7 ) { 

			greenX.push(i_4);
			greenY.push(y);
			dots_loc++;
			i_4++;
		}
	}

	return dots_loc;
}

function diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, loops) {

	var dots_loc = 0;

	for (var i = 0; i < loops; i++) {

		/* up-right */
		if(x_1 <= 7 && y_1 >= 0) {

			greenX.push(x_1);
			greenY.push(y_1);
			dots_loc++;
			x_1++;
			y_1--;
		}

		/* up-left */
		if(x_2 >= 0 && y_2 >= 0) {

			greenX.push(x_2);
			greenY.push(y_2);
			dots_loc++;
			x_2--;
			y_2--;
		}

		/* down-right */
		if(x_3 <= 7 && y_3 <= 7) {

			greenX.push(x_3);
			greenY.push(y_3);
			dots_loc++;
			x_3++;
			y_3++;
		}

		/* down-left */
		if(x_4 >= 0 && y_4 <= 7) {

			greenX.push(x_4);
			greenY.push(y_4);
			dots_loc++;
			x_4--;
			y_4++;
		}
	}

	return dots_loc;
}