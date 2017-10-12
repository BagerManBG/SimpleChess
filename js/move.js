function movePiece(x, y, to_x, to_y, color, type) {

	$('.field#' + x + '_' + y + ' img').remove();
	$('.field#' + to_x + '_' + to_y + ' img').remove();

	var id = color + '_' + type;

	createFigure(to_x, to_y, id);

	$('#main-content .field#' + to_x + '_' + to_y + ' img').bind("click", function(){

		if(!figure_selected) {

			selectFigure($(this));
			
		} else if($(this).attr('id') == figure_selected_coords) {

			unselectFigure($(this));
		}
	});
}