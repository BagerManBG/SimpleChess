function restartGame() {

	$('.field img').remove();

	initializeField();

	playerTurn = "w";
	turn = 1;

	$('#main-content .field img.pieces').bind("click", function(){

		if(!figure_selected) {

			selectFigure($(this));
			
		} else if($(this).attr('id') == figure_selected_coords) {

			unselectFigure($(this));
		}
	});
}