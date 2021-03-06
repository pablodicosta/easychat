var socket;

_386 = { onePass: true };

function initializeSocket() {
	socket = io(window.location.href);
	socket.on('chat', function(data) {
		$('#textarea').append(data.message);
		$('#textarea').scrollTop($('#textarea')[0].scrollHeight);
	});
}

$(document).ready(function() {
	
	$('.chat-widget').prop("disabled", true);

	$('#join-chat').click(function() {
		var nickname = $('#nickname').val().trim();
		if(nickname) {
			if(!socket) {
				initializeSocket();
				socket.emit('join', { nickname : nickname });
				$('.chat-widget').prop("disabled", false);
				$('#join-chat').html('Cambiar Nombre');
				$('#message').focus();
			} else {
				socket.emit('changename', { nickname : nickname });
			}
		}
	});

	$('#send-chat').click(function() {
		var message = $('#message').val().trim();
		if(message) {
			socket.emit('clientchat', { message : message });
			$('#message').val('');
		}			
	})

});
