var privateId;
var password;
var realm;
var callid;
var msg;
var aux = true;

var sipManager = {
	register: function () {

		console.log('reg')
		cordova.plugins.sip.login(privateId, password , 'voip.vn3anjo.com.br', function (e) {
			console.log("here")
			if (e == 'RegistrationSuccess') {
	
				msg.innerHTML = "Conectado";
				console.log(e);
				sipManager.listen();

			} else {
	
				msg.innerHTML = "Registration Failed!";
			}

		}, function (e) { console.log(e) })
	},
	call: function () {
		msg.innerHTML = "Realizando Chamada";
		cordova.plugins.sip.call(callid, '12345678','voip.vn3anjo.com.br', sipManager.events, sipManager.events)
		
	},
	listen: function () {
		cordova.plugins.sip.listenCall(sipManager.events, sipManager.events);
		msg.innerHTML = "Conectado e Pronto Para receber Ligações" ;
	},
	hangup: function () {
		cordova.plugins.sip.hangup(function (e) { console.log(e) }, function (e) { console.log(e) })
	},
	// speaker: function() {
	// 	AudioToggle.setAudioMode(AudioToggle.SPEAKER);
	// 	alert('viva loz ligado')
	// },


	// video: function () {
	// 	cordova.plugins.sip.toggleVideo(function (e) { console.log(e) }, function (e) { console.log(e) })
	// },
	// mute: function () {
	// 	cordova.plugins.sip.toggleMute(function (e) { console.log(e) }, function (e) { console.log(e) })
	// },

	

	events: function (e) {
		console.log(e);
		if (e == 'Incoming') {
			var r = confirm("Recebendo Chamada");
			if (r == true) {
				cordova.plugins.sip.accept(true, sipManager.events, sipManager.events);
			} else {

			}
		}
		if (e == 'Connected') {
			alert("Connected!");
			sipManager.listen();
		}
		if (e == 'Error') {
			alert("Call Error!");
			sipManager.listen();
		}
		if (e == 'End') {
			msg.innerHTML = "Chamada Finalizada";
			sipManager.listen();
		}


	}
}

const logar = () => {
	login('203', '203', '192.168.1.111:5060', function (e) {

		if (e == 'RegistrationSuccess') {
			console.log(e);
			listen();
		} else {
			alert("Registration Failed!");
		}

	}, function (e) { console.log(e) })

}

const successCallback = () => {
	console.log("listen");
}
const errrooor = () => {
	console.log("listen");
}

function onload() {
	console.log("1")
	document.addEventListener("deviceready", onDeviceReady, false);
}


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
}




const offButton = () => {
	alert("Desligou")
	sipManager.hangup();
}

  const vivaVoz = () =>{
	 
    if (aux ==true){
		AudioToggle.setAudioMode(AudioToggle.SPEAKER);
		aux = false;
		alert('viva voz ligado')
	}
     else{
		AudioToggle.setAudioMode(AudioToggle.EARPIECE);
		aux = true;
		alert('viva voz desligado')
	 }
	
}




// const mute = () =>{
// 	alert("mutou")
// 	 sipManager.mute(); 
//   }

//   const video = () =>{
// 	alert("ligou video")
// 	 sipManager.video(); 
//   }  


const handleCallButton = () => {
	msg.innerHTML = "Conectando..";
	const options = {
		method: 'get',
		data: {
		 },
	};

	cordova.plugin.http.sendRequest('https://teste.vn3anjo.com.br/vn3/api/recebe_ligacao.php', options, function(response) {
	
	const data = JSON.parse(response.data);

	password = data.password;
	realm = data.realm;
	privateId = data.priviateid; 
	callid = data.ligarpara;
	


	sipManager.register();
	sipManager.call();

	}, function(response) {
		// prints 403
		console.log(response);
	
		//prints Permission denied

		console.log(response.error);
	});


}


document.querySelector("#connect").addEventListener("click", ()=>{handleCallButton()})
document.querySelector("#viva").addEventListener("click", ()=>{vivaVoz()})
// document.querySelector("#video").addEventListener("click", ()=>{video()})
// document.querySelector("#mute").addEventListener("click", ()=>{mute()})
msg = document.querySelector("#spanid")
document.querySelector("#off").addEventListener("click", ()=>{offButton()})

