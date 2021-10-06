const emailStyle = (authCode) => {
  return `<div class='heading'>
		<h1 style="color:#ffb86c"><span>4399 CRM Authentication Code</span></h1>
	</div>

	<div class='heading'>
  <h1 style="background: linear-gradient(120deg,#8be9fd,#ff79c6);-webkit-background-clip: text;color: transparent;"><span style="background: linear-gradient(120deg,#8be9fd,#ff79c6);-webkit-background-clip: text;color: transparent;">4399 CRM Authentication Code</span></h1>
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
