$(function(){
	var msgSend={
		content: false,
		author: false,
		color: false,
		time: false
	};

	var socket=io.connect('http://localhost/');

	socket.on('open', function(){
		$('span').text('Input your username:');
	});

	socket.on('system', function(msg){
		if( msgSend.author ){
			$('.main').append('<p>' + msg.time + ' ' +'@' +msg.author + ': <br/>' + msg.content + '</p>');
			$('.main p:last').css('background-color', msg.color);	
		}
	});

	$('input').keydown(function(word) 
	{
		if( word.keyCode===13){
			var msg=$('input').val();
			if(!msg) return;

			//消息不为空
			$(this).val('');
			//第一次发送消息
			if(!msgSend.author) {
				msgSend.content='Welcome!' + msg;
				msgSend.author='system';
				msgSend.color=getColor();
				msgSend.time=getTime();

				socket.send( msgSend );
				msgSend.author=msg;
			}
			else
			{
				msgSend.time=getTime();
				msgSend.content=msg;
				socket.send(msgSend);
			}
			
		}
	});





	function getTime(){
		var myDate=new Date(),
			str=myDate.getHours().toString()+':'+myDate.getMinutes().toString()+':'+myDate.getSeconds().toString();
		return str;
	}

	function getColor(){
		return	'#'+(parseInt( Math.random() * Math.pow(2,24) ) ).toString(16);
	}
});