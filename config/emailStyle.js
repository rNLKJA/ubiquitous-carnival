const emailStyle = (authCode) => {
  return `
	<div class='container' style='font-family: system-ui;
																background: #383A59;
																color:#f8f8f2;padding:0;
																margin:0;
																width:100%;
																height:100%'>
		<div class='heading' style="background-color: #282942;
																width: 100%;
																height: 80px;">
			<h1 style="text-align: left;
									padding: 20px;
									color: #bd93f9;">
									<span style="background: linear-gradient(120deg,#8be9fd,#ff79c6);
															-webkit-background-clip: text;color: transparent;">
															4399 CRM Authentication Code
									</span>
			</h1>
		</div>

		<div class='content' style="padding: 20px;">
			<p>Hey friend, How you doing?</p>

			<p style='user-select:none'>
				Here is your verification code，please enter your authentication code in <strong style="color:#ff5555;">5 minutes</strong>.
			</p>

			<h3 id='authCode' style='padding-left:20px;display:inline;color: 	#ff79c6;'>
				${authCode}
			</h3>

			<p style='user-select:none'>
				If you didn't request this code by setting up Verification, please go to your <a href="http://www.4399crm.com/" style="text-decoration: none;color: #6272a4;">Personal Information</a> page and change your password right away. 
			</p>

			<br />

			<p>Hope you have an wonderful day!</p>
			<p>Best Regards.</p>
		</div>
		
		<div class='footer'>
			<hr style='color:green' />
			<p style="text-align:right; padding:20px;color:#6272a4;">COMP30022 IT Project Team 4399</p>

			<div class='color-bar' style="width: 100%;height: 10px;background-image: linear-gradient(120deg, #40b3ff, #d97aff);"></div>
		</div>
	</div>`;
};

module.exports = emailStyle;
