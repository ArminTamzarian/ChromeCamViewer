$(document).ready(function(){

	module("Chrome Cam Viewer Tests");
	
	test("Preference Tests", function() {
		expect(18);

		// Positive Testing
		ok(validate_text("username"),	"Verifying validate_text(\"username\") functionality.");
		
		// Negative Testing
		ok(!validate_text(""),
				"Verifying !validate_text(\"\") functionality.");
		ok(!validate_text(null),
				"Verifying !validate_text(null) functionality.");
		ok(!validate_text(),
				"Verifying !validate_text(undefined) functionality.");
		
		// Positive Testing
		ok(validate_url("http://example.com"),
				"Verifying validate_url(\"http://example.com\") functionality.");
		ok(validate_url("http://example.com:8080"),
				"Verifying validate_url(\"http://example.com:8080\") functionality.");
		ok(validate_url("https://example.com"),
				"Verifying validate_url(\"https://example.com\") functionality.");
		ok(validate_url("https://example.com:8080"),
				"Verifying validate_url(\"https://example.com:8080\") functionality.");
		ok(validate_url("http://127.0.0.1"),
				"Verifying validate_url(\"http://127.0.0.1\") functionality.");
		ok(validate_url("http://127.0.0.1:8080"),
				"Verifying validate_url(\"http://127.0.0.1:8080\") functionality.");
		ok(validate_url("https://127.0.0.1"),
			"Verifying validate_url(\"https://127.0.0.1\") functionality.");
		ok(validate_url("https://127.0.0.1:8080"),
			"Verifying validate_url(\"https://127.0.0.1:8080\") functionality.");
		
		// Negative Testing
		ok(!validate_url(""),
				"Verifying !validate_url(\"\") functionality.");
		ok(!validate_url(null),
				"Verifying !validate_url(null) functionality.");
		ok(!validate_url(),
				"Verifying !validate_url(undefined) functionality.");
		ok(!validate_url("ftp://example.com"),
				"Verifying !validate_url(\"ftp://example.com\") functionality.");
		ok(!validate_url("example"),
			"Verifying !validate_url(\"example\") functionality.");
		ok(!validate_url("example:8080"),
			"Verifying !validate_url(\"example:8080\") functionality.");
	});
});
