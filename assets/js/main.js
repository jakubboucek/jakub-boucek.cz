$(function() {
	$('.nav-tabs a').click(function (e) {
	 	e.preventDefault();
	 	$(this).tab('show');
	}).filter(':first').tab('show');
});
$(function() {
	var x=$('#bank-box');
	var b=$('#bank-show-more', x);
	var g=$('i.glyphicon', b);
	var m=$('.no-more, .only-more', x);
	b.click(function(){
		g.toggleClass('glyphicon-zoom-in').toggleClass('glyphicon-zoom-out');
		m.slideToggle(200);
	});
});