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

				var canMove = canMoveCheck(x, eval(y + sign + '1'), color);
				if(canMove == 1) {

					greenX.push(x);
					greenY.push( eval(y + sign + '1') );
					dots++;
				}

				canMove = canMoveCheck(x - 1, eval(y + sign + '1'), color);
				if(canMove == 2) {

					greenX.push(x - 1);
					greenY.push( eval(y + sign + '1') );
					dots++;
				}

				canMove = canMoveCheck(x + 1, eval(y + sign + '1'), color);
				if(canMove == 2) {

					greenX.push(x + 1);
					greenY.push( eval(y + sign + '1') );
					dots++;
				}
			}

			if ((y == 6 && color == 'w') || (y == 1 && color == 'b')) {

				if(canMoveCheck(x, eval(y + sign + '2'), color)) {

					greenX.push(x);
					greenY.push( eval(y + sign + '2') );
					dots++;
				}
			}
			break;

		case 'k':
			if (y + 2 <= 7) {

				if (x + 1 <= 7) {

					if(canMoveCheck(x + 1, y + 2, color)) {

						greenX.push(x+1);
						greenY.push(y+2);
						dots++;
					}
				}

				if (x - 1 >= 0) {

					if(canMoveCheck(x - 1, y + 2, color)) {

						greenX.push(x-1);
						greenY.push(y+2);
						dots++;
					}
				}
			}

			if (y - 2 >= 0) {

				if (x + 1 <= 7) {

					if(canMoveCheck(x + 1, y - 2, color)) {
					
						greenX.push(x+1);
						greenY.push(y-2);
						dots++;
					}
				}

				if (x - 1 >= 0) {

					if(canMoveCheck(x - 1, y - 2, color)) {

						greenX.push(x-1);
						greenY.push(y-2);
						dots++;
					}
				}
			}
			break;

		case 't':
			dots += horizVertCheck(i_1, i_2, i_3, i_4, x, y, 7, color);
			break;

		case 'o':
			dots += diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, 7, color);
			break;

		case 'q':
			dots += horizVertCheck(i_1, i_2, i_3, i_4, x, y, 7, color);
			dots += diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, 7, color);
			break;

		case 'g':
			dots += horizVertCheck(i_1, i_2, i_3, i_4, x, y, 1, color);
			dots += diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, 1, color);
			break;

		default:
			break;
	}

	for (var i = 0; i < dots; i++) {

		greenDots.push( greenX[i] + '_' + greenY[i] );

		$('.field#' + greenDots[i]).addClass('greenBG');
		$('.field#' + greenDots[i]).addClass('cursorPointer');
	}

	piece.parent().addClass('selectedPiece');

	greenX.length = 0;
	greenY.length = 0;
}

function horizVertCheck(i_1, i_2, i_3, i_4, x, y, loops, color) {

	var dots_loc = 0;
	var fg_1 = true, fg_2 = true, fg_3 = true, fg_4 = true;

	for (var i = 0; i < loops; i++) {
				
		/* upwards */
		if ( i_1 >= 0 && fg_1) { 

			var canMove = canMoveCheck(x, i_1, color);
			if(canMove) {

				greenX.push(x);
				greenY.push(i_1);
				dots_loc++;
				i_1--;

				if(canMove == 2) {

					fg_1 = false;
				}
			} else {

				fg_1 = false;
			}
		} 

		/* downwards */
		if ( i_2 <= 7 && fg_2 ) { 

			var canMove = canMoveCheck(x, i_2, color);
			if(canMove) {

				greenX.push(x);
				greenY.push(i_2);
				dots_loc++;
				i_2++;

				if(canMove == 2) {

					fg_2 = false;
				}
			} else {

				fg_2 = false;
			}
		}

		/* left */
		if ( i_3 >= 0 && fg_3 ) { 

			var canMove = canMoveCheck(i_3, y, color);
			if(canMove) {

				greenX.push(i_3);
				greenY.push(y);
				dots_loc++;
				i_3--;

				if(canMove == 2) {

					fg_3 = false;
				}
			} else {

				fg_3 = false;
			}
		}

		/* right */
		if ( i_4 <= 7 && fg_4 ) { 

			var canMove = canMoveCheck(i_4, y, color);
			if(canMove) {

				greenX.push(i_4);
				greenY.push(y);
				dots_loc++;
				i_4++;

				if(canMove == 2) {

					fg_4 = false;
				}
			} else {

				fg_4 = false;
			}
		}
	}

	return dots_loc;
}

function diagonalCheck(x_1, x_2, x_3, x_4, y_1, y_2, y_3, y_4, loops, color) {

	var dots_loc = 0;
	var fg_1 = true, fg_2 = true, fg_3 = true, fg_4 = true;

	for (var i = 0; i < loops; i++) {

		/* up-right */
		if(x_1 <= 7 && y_1 >= 0 && fg_1) {

			var canMove = canMoveCheck(x_1, y_1, color);
			if(canMove) {
				
				greenX.push(x_1);
				greenY.push(y_1);
				dots_loc++;
				x_1++;
				y_1--;

				if(canMove == 2) {

					fg_1 = false;
				}
			} else {

				fg_1 = false;
			}
		}

		/* up-left */
		if(x_2 >= 0 && y_2 >= 0 && fg_2) {

			var canMove = canMoveCheck(x_2, y_2, color);
			if(canMove) {
				
				greenX.push(x_2);
				greenY.push(y_2);
				dots_loc++;
				x_2--;
				y_2--;

				if(canMove == 2) {

					fg_2 = false;
				}
			} else {

				fg_2 = false;
			}
		}

		/* down-right */
		if(x_3 <= 7 && y_3 <= 7 && fg_3) {

			var canMove = canMoveCheck(x_3, y_3, color);
			if(canMove) {
				
				greenX.push(x_3);
				greenY.push(y_3);
				dots_loc++;
				x_3++;
				y_3++;

				if(canMove == 2) {

					fg_3 = false;
				}
			} else {

				fg_3 = false;
			}
		}

		/* down-left */
		if(x_4 >= 0 && y_4 <= 7 && fg_4) {

			var canMove = canMoveCheck(x_4, y_4, color);
			if(canMove) {
				
				greenX.push(x_4);
				greenY.push(y_4);
				dots_loc++;
				x_4--;
				y_4++;

				if(canMove == 2) {

					fg_4 = false;
				}
			} else {

				fg_4 = false;
			}
		}
	}

	return dots_loc;
}

function canMoveCheck(x, y, color) {

	if(!$('.field#' + x + '_' + y + ' img').length) {

		return 1; //can move
	}

	var id = $('.field#' + x + '_' + y + ' img').attr('id');
		
	if(id.charAt(0) != color) {

		return 2; //can take enemy piece
	}

	return 0; //can't move
}