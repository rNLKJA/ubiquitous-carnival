const emailStyle = (authCode) => {
  return `<script>
		function copyContent() {
			var aux = document.createElement("input");
			var text = document.getElementById('authCode').innerHTML;
			console.log(text)
			aux.setAttribute("value", text);
			document.body.appendChild(aux);
			try {
				aux.select();
				document.execCommand("copy");
				document.body.removeChild(aux);
				alert("You've successful copy the code!")
			} catch(err) {
				alert("The current browser doesn't support copy past function.")
			}
		}
	</script>

	<div class='heading'>
		<h1 style="color:#ffb86c"><span>4399 CRM Authentication Code</span></h1>
	</div>

	<div class='content'>
		<p>Hey friend, How you doing?</p>
		
		<p style='user-select:none'>Here is your verification code，please enter your authentication code in <strong style="color:#ff5555;">5 minutes</strong>.</p>
		
		<h3 id='authCode' style='padding-left:20px;display:inline' onclick=copyContent() >${authCode}</h3>
		<p style="user-select:none;color:lightgrey;display:inline" onclick=copyContent()>Copy to the Click Board</p>
		
		<p style='user-select:none'>If you didn't request this code by setting up Verification, please go to your <a href="http://www.4399crm.com/">Personal Information</a> page and change your password right away. </p>
		
		<br />
		
		<p>Hope you have an wonderful day!</p>
		<p>Best Regards.</p>
	</div>
		
		

	<div class='footer'>
		<hr style='color:green' />
		<p style="text-align:right; padding:20px;color:#6272a4;">COMP30022 IT Project Team 4399</p>
		
		<div class='color-bar'></div>
	</div>

	<style>
		body {
			font-family: system-ui;
			background: #383A59;
			color: 	#f8f8f2;
			padding:0;
			margin:0;
		}

		.heading {
			background-color: #282942;
			width: 100%;
			height: 80px;
		}

		.heading h1 {
			text-align: left;
			padding: 20px;
			color: #bd93f9;
		}

		.content {
			padding: 20px;
		}

		.content h3 {
			color: 	#ff79c6;
		}
		
		a {
			text-decoration: none;
			color: #6272a4;
		}
		
		a:hover {
			font-weight: bold;
		}
		
		.color-bar {
			width: 100%;
			height: 10px;
			background-image: linear-gradient(120deg, #40b3ff, #d97aff);
		}
		
		span {
			background: linear-gradient(120deg, #8be9fd, 	#ff79c6);
			-webkit-background-clip: text;
			color: transparent;
		}
	</style>`;
};

module.exports = emailStyle;
