var playerTurn = 1; //1 - whites; 0 - blacks
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

			var $this = $(this);

			var coords = $this.parent().attr('id');
			var x = parseInt(coords.charAt(0));
			var y = parseInt(coords.charAt(2)); 

			var id = $this.attr('id');
			var color = id.charAt(0);
			var type = id.charAt(2);

			figure_selected = true;
			figure_selected_coords = id;

			$('.field').removeClass('cursorPointer');
			$('.field#' + x + '_' + y).addClass('cursorPointer');

			findPossibleMoves($this, x, y, color, type);
			
		} else if($(this).attr('id') == figure_selected_coords) {

			for (var i = 0; i < greenDots.length; i++) {

				$('.field#' + greenDots[i]).removeClass('greenBG');
				$(this).parent().removeClass('selectedPiece');
			}

			greenDots.length = 0;

			figure_selected = false;
		}
	});
});