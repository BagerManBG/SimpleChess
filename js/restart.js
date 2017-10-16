function restartGame() {

	$('.field img').remove();

	initializeField();

	playerTurn = "w";
	turn = 1;

	$('#main-content .field img.pieces').bind("click", function(){

		if($(this).parent().attr('id') == figure_selected_coords) {

			unselectFigure();
		} else if($(this).attr('class').substr(0,1) == playerTurn){

			selectFigure($(this));
		}
	});
}