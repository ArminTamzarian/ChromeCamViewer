function CamControls() {
	this._COMMAND_PAN_UP			= {start: 2, stop: 3};
	this._COMMAND_PAN_DOWN			= {start: 0, stop: 1};
	this._COMMAND_PAN_LEFT			= {start: 6, stop: 7};
	this._COMMAND_PAN_RIGHT			= {start: 4, stop: 5};

	this._COMMAND_PAN_UP_LEFT		= {start: 93, stop: 1};
	this._COMMAND_PAN_UP_RIGHT		= {start: 92, stop: 1};
	this._COMMAND_PAN_DOWN_LEFT		= {start: 91, stop: 1};
	this._COMMAND_PAN_DOWN_RIGHT	= {start: 90, stop: 1};

	this._COMMAND_CENTER			= {start: 25, stop: null};

	this._COMMAND_PATROL_VERTICAL	= {start: 26, stop: 27};
	this._COMMAND_PATROL_HORIZONTAL	= {start: 28, stop: 29};

	this._address = "";
	this._username = "";
	this._password = "";

	this.setAddress = function(address) {
		this._address = address;
	}

	this.setUsername = function(username) {
		this._username = username;
	}
	
	this.setPassword = function(password) {
		this._password = password;
	}

	this.setCredentials = function(username, password) {
		this.setUsername(username);
		this.setPassword(password);
	}
	
	this.bindCommand = function(object, command) {
		var context = this;
		
		if(command.start != null) {
			$(object).unbind('mousedown').mousedown(function(e){
				context._submitCommand(command.start);
			});
		}
		
		if(command.stop != null) {
			$(object).unbind('mouseup').mouseup(function(e){
				context._submitCommand(command.stop);
			});
		}
	}

	this.setResolution = function(value) {
		this._changeParameter(0, value);
	}
	
	this.setBrightness = function(value) {
		this._changeParameter(1, value);
	}

	this.setContrast = function(value) {
		this._changeParameter(2, value);
	}

	this.setRefresh = function(value) {
		this._changeParameter(3, value);
	}
	
	this.setFlip = function(value) {
		this._changeParameter(5, value);
	}

	this._submitCommand = function(command) {
		$.ajax({
		    type: 'GET',
			url: this._address + "/decoder_control.cgi",
			data: {
				command: command
			},
			headers : {
				"Authorization" : "Basic " + btoa(this._username + ":" + this._password)
			},
		    success: function(responseData, textStatus, xhr) {
		    },
		    error: function(xhr, textStatus, errorThrown) {
		    },
		});
	}
	
	this._changeParameter = function(parameter, value) {
		$.ajax({
		    type: 'GET',
			url: this._address + "/camera_control.cgi",
			data: {
				param: parameter,
				value: value
			},
			headers : {
				"Authorization" : "Basic " + btoa(this._username + ":" + this._password)
			},
		    success: function(responseData, textStatus, xhr) {
		    },
		    error: function(xhr, textStatus, errorThrown) {
		    },
		});
	}
}