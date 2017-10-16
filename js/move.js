function movePiece(x, y, to_x, to_y, color, type) {

	if($('.field#' + to_x + '_' + to_y + ' img').length) {

		var taken_id = $('.field#' + to_x + '_' + to_y + ' img').attr('id');
		$('.field#' + to_x + '_' + to_y + ' img').remove();
		
		switch(taken_id) {

			case 'b_g':
				console.log('Whites win!!!');
				restartGame();
				return;
			case 'w_g':
				console.log('Blacks win!!!');
				restartGame();
				return;
			default:
				break;
		}

		if($('.field img').length == 2) {

			console.log('DRAW!!!');
			restartGame();
			return;
		}
	}

	$('.field#' + x + '_' + y + ' img').remove();

	var id = color + '_' + type;

	createFigure(to_x, to_y, id);
	changeTurn();

	$('#main-content .field#' + to_x + '_' + to_y + ' img').bind("click", function(){

		if($(this).parent().attr('id') == figure_selected_coords) {

			unselectFigure();
		} else if($(this).attr('class').substr(0,1) == playerTurn){

			selectFigure($(this));
		}
	});
}