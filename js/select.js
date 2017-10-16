function selectFigure($this) {

	unselectFigure();

	var coords = $this.parent().attr('id');
	var x = parseInt(coords.charAt(0));
	var y = parseInt(coords.charAt(2)); 

	var id = $this.attr('id');
	var color = id.charAt(0);
	var type = id.charAt(2);

	if(color == playerTurn) {

		figure_selected = true;
		figure_selected_coords = coords;

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
}

function unselectFigure() {

	$('.greenBG').unbind("click");

	for (var i = 0; i < greenDots.length; i++) {

		$('.field').removeClass('greenBG');
		$('.field').removeClass('cursorPointer');
	}

	$('.field').removeClass('selectedPiece');

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
	figure_selected_coords = null;
}