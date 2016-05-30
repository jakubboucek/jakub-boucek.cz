// @koala-prepend "jquery/jquery-2.1.1.js"
// @koala-prepend "pgpengine.js"
// @koala-prepend "bootstrap/tab.js"
// @koala-prepend "bootstrap/transition.js"

function encrypt( text, pgp ) {
	var keyid='225fdc9c0bfaa273';
	var keytyp = 0;
	var pubkey = "EADbDBDuSFDsdvih5Gb6Gphhl1xJ7H8Mo86XMcruZKCgfBWCVDiX64WWV1aoH5SoGpDIY1AP9s3GHlgRpxvQ43BpWJRG8aq9MbqOr5yklEFJ2PCoCN2m+GJ4nZ+XFRJIBX0nRwA6zNkZfmyE64Ova5NBKrZvffoF9ba/2HWFFyTeitq+GcHnBZPZg2FAo4D49NE8jd8CR/KZwmNQNlpGw6ihdeJ1zxGX2QVBcKLtZsZY81RMtbqrbi63Aw/7TQ+hqpQCEGCf9rklaRMhAwh52KYAe3fjPQDsk1sNUW9Y6LvZupQLyzwvIEbTIEKpLiIgy7ZoPi1oLAjafMCwX++BwGJwONPIve7CsLT6e85NJgPbpLnmpy8QX72s5C8Sv8tytleN1Jh78O6wj+4aLeaCdD2zYZZ0kXSqJ729JQ2YW7lLseA72l9PLff3ZI4VPMl0il1GBvDYKUpH6Hk+ZHv4oMNn8XI5k0MRmrHzWbdKs4KEvHZpJpb5RjaF4m3ZUJIb+iELMZqDqyLltMzTswox7LDZjCHRvrpmgTO0UdFVV09pmqypPF3giT3JrFQD8KCetX6yzVwJ6whu5baDxCGuF7P2dYCEJQZXnHcCBkycXm61vyGyY27aDvX7V3OtvhO7rKmve5WbUE/R8PYCiV3HpVkcEr9bHLJoRMoXNZ/ymW1PTQARAQAB";

	text = text + '\r\n';
	var encrypted = pgp.encrypt( keyid, keytyp, pubkey, text );

	return encrypted;
}

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
$(function() {
	var pgp = new PGPengine();
	pgp.init();
	var u = $('#unsecure-text');
	var s = $('#secure-text');
	var e = $('#encrypt');
	var b = $('#encrypt-back');
	var i = $('#secure-info');
	var n = $('#secure-note');
	i.click(function(){
		n.slideToggle();
	});
	e.click(function(){
		var text = u.val();
		var encrypted = encrypt( text, pgp );
		s.val(encrypted);
		s.height(u.height());
		e.hide();
		u.fadeOut(200, function(){
			u.val('');
			s.fadeIn(200, function(){
				s.focus().select().scrollTop( 0 );
				b.show();
			})
		});

	});
	s.click(function(){
		s.select();
	});
	b.click(function(){
		b.hide();
		s.fadeOut(200, function(){
			u.fadeIn(200, function(){
				u.focus();
				e.show();
			})
		});
	});
});

