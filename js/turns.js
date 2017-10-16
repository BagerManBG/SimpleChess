function changeTurn() {

	switch (playerTurn) {

		case "w":
			playerTurn = "b";
			$('.w').removeClass('cursorPointer');
			$('.b').addClass('cursorPointer');
			break;
		case "b":
			playerTurn = "w";
			$('.b').removeClass('cursorPointer');
			$('.w').addClass('cursorPointer');
			break;
		default:
			break;
	}

	turn++;

	$('.field img').removeClass('cursorPointer');
	$('.field img#' + playerTurn + '_p').addClass('cursorPointer');
	$('.field img#' + playerTurn + '_t').addClass('cursorPointer');
	$('.field img#' + playerTurn + '_k').addClass('cursorPointer');
	$('.field img#' + playerTurn + '_o').addClass('cursorPointer');
	$('.field img#' + playerTurn + '_q').addClass('cursorPointer');
	$('.field img#' + playerTurn + '_g').addClass('cursorPointer');
}