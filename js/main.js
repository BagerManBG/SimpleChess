var playerTurn = "w"; //w - whites; b - blacks
var turn = 1;
var greenDots = new Array();
var greenX = new Array();
var greenY = new Array();
var figure_selected = false;
var figure_selected_coords;

$(document).ready(function(){

	createField();
	initializeField();

	$('#main-content .field img.pieces').bind("click", function(){

		if(!figure_selected) {

			selectFigure($(this));
			
		} else if($(this).attr('id') == figure_selected_coords) {

			unselectFigure($(this));
		}
	});	
});