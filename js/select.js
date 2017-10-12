function selectFigure($this) {

	var coords = $this.parent().attr('id');
	var x = parseInt(coords.charAt(0));
	var y = parseInt(coords.charAt(2)); 

	var id = $this.attr('id');
	var color = id.charAt(0);
	var type = id.charAt(2);

	figure_selected = true;
	figure_selected_coords = id;

	$('.field img').removeClass('cursorPointer');
	$('.field#' + x + '_' + y + ' img').addClass('cursorPointer');

	findPossibleMoves($this, x, y, color, type);

	$('.greenBG').bind("click", function(){

		unselectFigure($('.field#' + coords + ' img'));

		$this = $(this);

		var to_coords = $this.attr('id');
		var to_x = parseInt(to_coords.charAt(0));
		var to_y = parseInt(to_coords.charAt(2));

		movePiece(x, y, to_x, to_y, color, type);
	});
}

function unselectFigure(figure) {

	$('.greenBG').unbind("click");

	for (var i = 0; i < greenDots.length; i++) {

		$('.field').removeClass('greenBG');
		$('.field').removeClass('cursorPointer');
	}

	figure.parent().removeClass('selectedPiece');

	switch(playerTurn) {

		case 1:
			$('.w').addClass('cursorPointer');
			break;
		case 0:
			$('.b').addClass('cursorPointer');
			break;
		default:
			break;
	}

	greenDots.length = 0;

	figure_selected = false;
}