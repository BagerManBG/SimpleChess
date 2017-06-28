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

	createFigure(0, 0, 'b_t');
	createFigure(7, 0, 'b_t');
	createFigure(1, 0, 'b_k');
	createFigure(6, 0, 'b_k');
	createFigure(2, 0, 'b_o');
	createFigure(5, 0, 'b_o');
	createFigure(3, 0, 'b_q');
	createFigure(4, 0, 'b_g');

	createFigure(0, 7, 'w_t');
	createFigure(7, 7, 'w_t');
	createFigure(1, 7, 'w_k');
	createFigure(6, 7, 'w_k');
	createFigure(2, 7, 'w_o');
	createFigure(5, 7, 'w_o');
	createFigure(3, 7, 'w_q');
	createFigure(4, 7, 'w_g');

	for (var i = 0; i <= 7; i++) {
		
		createFigure(i, 1, 'b_p');
		createFigure(i, 6, 'w_p');
	}
}

function createFigure(x, y, id) {

	$('.field#' + x + '_' + y).append("<img src='resources/images/pieces/" + id + ".svg' id='" + id + "' class='" + id.charAt(0) + "'>");
	$('.field#' + x + '_' + y + ' img').addClass('pieces');

	if(id.charAt(0) == 'w') {

		$('.field#' + x + '_' + y + ' img').addClass('onTurn');
	}
}