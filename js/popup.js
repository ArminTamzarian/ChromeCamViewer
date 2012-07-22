$(document).ready(function() {
	$.ajax({
	    type: 'GET',
		url: localStorage['camera_address'] + "/get_camera_params.cgi",
		headers : {
			"Authorization" : "Basic " + btoa(localStorage['camera_username'] + ":" + localStorage['camera_password'])
		},
	    success: function(responseData, textStatus, xhr) {
	    	eval(responseData);
	    	
			$("#show_controls").click(function(){
				if($("#controls").is(':hidden')){
					$("#controls").show();
				}
				else {
					$("#controls").hide();
				}
			})
	    	
	    	$("#camera_image").attr("src", localStorage['camera_address'] + "/videostream.cgi?user="+localStorage['camera_username']+"&pwd="+localStorage['camera_password']);

	    	var controls = new CamControls();
	    	controls.setAddress(localStorage['camera_address']);
	    	controls.setCredentials(localStorage['camera_username'], localStorage['camera_password']);

	    	applyParameters(resolution, brightness, contrast, mode, flip, fps, controls);
	    	bindControls(controls, flip);
	    	
			$(".control_button")
				.mousedown(function(){
					$(this).css({"background-color": "#FF0000"});
				})			
				.mouseup(function(){
					$(this).css({"background-color": "transparent"});
				});
	    },
	    error: function(xhr, textStatus, errorThrown) {
	    	$("#camera_container").html("Error connecting.<br/><br/>Please verify camera address and credentials in the <a id='options' href='#'>options</a>.")
	    	$("#options").click(function(){
	    		chrome.tabs.create({url:"options.html"});
	    		return false;
	    	});
	    },
	});
});

function bindControls(controls, flip) {
	var flipV = flip & 0x01;
	var flipH = flip & 0x02;
	
	controls.bindCommand($("#control_nw"),	flipV ?
												flipH ? controls._COMMAND_PAN_DOWN_RIGHT : controls._COMMAND_PAN_DOWN_LEFT
												:
												flipH ? controls._COMMAND_PAN_UP_RIGHT : controls._COMMAND_PAN_UP_LEFT
												);
	controls.bindCommand($("#control_n"),	flipV ? controls._COMMAND_PAN_DOWN : controls._COMMAND_PAN_UP);
	controls.bindCommand($("#control_ne"),	flipV ?
												flipH ? controls._COMMAND_PAN_DOWN_LEFT : controls._COMMAND_PAN_DOWN_RIGHT
												:
												flipH ? controls._COMMAND_PAN_UP_LEFT: controls._COMMAND_PAN_UP_RIGHT
												);

	controls.bindCommand($("#control_w"),	flipH ? controls._COMMAND_PAN_RIGHT : controls._COMMAND_PAN_LEFT);
	controls.bindCommand($("#control_e"),	flipH ? controls._COMMAND_PAN_LEFT : controls._COMMAND_PAN_RIGHT);

	controls.bindCommand($("#control_sw"),	flipV ?
												flipH ? controls._COMMAND_PAN_UP_RIGHT : controls._COMMAND_PAN_UP_LEFT
												:
												flipH ? controls._COMMAND_PAN_DOWN_RIGHT: controls._COMMAND_PAN_DOWN_LEFT
												);
	controls.bindCommand($("#control_s"),	flipV ? controls._COMMAND_PAN_UP : controls._COMMAND_PAN_DOWN);
	controls.bindCommand($("#control_se"),	flipV ?
												flipH ? controls._COMMAND_PAN_UP_LEFT : controls._COMMAND_PAN_UP_RIGHT
												:
												flipH ? controls._COMMAND_PAN_DOWN_LEFT: controls._COMMAND_PAN_DOWN_RIGHT
												);
}

function applyParameters(resolution, brightness, contrast, mode, flip, fps, controls) {
			
	if(resolution == 8) {
		$("#video_mode_vga").attr("checked", "checked");		
	}
	else if(resolution == 32) {
		$("#video_mode_qvga").attr("checked", "checked");
		/* TODO: Await bugfix for http://code.google.com/p/chromium/issues/detail?id=36080
		$("#camera_container").removeClass("size1x").addClass("size2x");
		$("#showControls, #controls").css({width: "640px"});
		$("html, body").css({width: "655px"});
		*/
	}
	
	if(mode == 0) {
		$("#refresh_mode_50hz").attr("checked", "checked");		
	}
	else if(mode == 1) {
		$("#refresh_mode_60hz").attr("checked", "checked");		
	}	
	else if(mode == 2) {
		$("#refresh_mode_outdoor").attr("checked", "checked");		
	}	
	
	$("input[name=video_mode]").change(function(){
		controls.setResolution($("input[name=video_mode]:checked").val());
	});
	
	$("input[name=refresh_mode]").change(function(){
		controls.setRefresh($("input[name=refresh_mode]:checked").val());
	});
	
	$("#video_mode, #refresh_mode").buttonset();

	// Slider Controls
	$("#brightness").slider({
		min:0,
		max:255,
		value: brightness,
		change: function(event, ui) {
			controls.setBrightness(ui.value);
		}
	});
	
	$("#contrast").slider({
		min:0,
		max:6,
		value: contrast,
		change: function(event, ui) {
			controls.setContrast(ui.value);
		}
	});
	
	// Flip Controls
	if(flip & 0x01) {
		$("#flip_vertical").attr("checked", "checked");
	}
	
	if(flip & 0x02) {
		$("#flip_horizontal").attr("checked", "checked");
	}
	$("#flip_horizontal, #flip_vertical")
		.button()
		.change(function(){
			controls.setFlip($("#flip_vertical:checked").val() | $("#flip_horizontal:checked").val());
			bindControls(controls, $("#flip_vertical:checked").val() | $("#flip_horizontal:checked").val());
		});
}
