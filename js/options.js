function displayMessage(message) {
	$("#info_message").html(message).slideDown();
	setTimeout(function(){
		$("#info_message").slideUp();
	}, 3000);

}

function loadPreference(storage_name, control_id) {
	if(localStorage[storage_name] != null && localStorage[storage_name] != undefined) {
		$("#"+control_id).val(localStorage[storage_name]);
	}	
}

function validateText(value) {
	return !(value == undefined || value == null || value.length == 0);
}

function validateUrl(value) {
	if(!validateText(value)) {
		return false;
	}
	
	var regexUrl = /((http|https):\/\/[\w?=&.\/-;#~%!-]+(?![\w\s?&.\/;#~%!"=-]*>))/g
		
	return regexUrl.test(value);
}

function validatePreferences() {
	var errors = [];
	
	if(!validateUrl($("#camera_address").val())){
		errors.push("Invalid address specified.")
	}

	if(!validateText($("#camera_username").val())){
		errors.push("Invalid username specified.")
	}
	
	if(!validateText($("#camera_password").val())){
		errors.push("Invalid password specified.")
	}

	if(errors.length > 0) {
		displayMessage(errors.join("<br/>"))
		return false;
	}
	
	return true;
}

$(document).ready(function(){
	
	loadPreference("camera_address", "camera_address");
	loadPreference("camera_username", "camera_username");
	loadPreference("camera_password", "camera_password");

	$("#options_update").click(function() {
		if(validatePreferences()) {			
			localStorage['camera_address'] = $("#camera_address").val();
			localStorage['camera_username'] = $("#camera_username").val();
			localStorage['camera_password'] = $("#camera_password").val();
			
			displayMessage("Options Saved");
		}
	});
});