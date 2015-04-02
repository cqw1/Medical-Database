
console.log("hello world");


var dbName = "medical database";
var searchEngine = new fullproof.BooleanEngine();
var variableData = variableData;

var index1 = {
	name: "normalindex",
	analyzer: new fullproof.StandardAnalyzer(fullproof.normalizer.to_lowercase_nomark),
	capabilities: new fullproof.Capabilities().setUseScores(false).setDbName(dbName),
	initializer: initializer
};

//help get score in scoring engine
var index2 = {
	name: "stemmedindex",
	analyzer: new fullproof.StandardAnalyzer(fullproof.normalizer.to_lowercase_nomark),
	capabilities: new fullproof.Capabilities().setUseScores(false).setDbName(dbName),
	initializer: initializer
};

//append all fields into one long string and place it into the search engine 
function initializer(injector, callback) {
	var synchro = fullproof.make_synchro_point(callback, variableData.length-1);
	for (var i = 0; i < variableData.length; ++i) {
		var text = "";
		text += variableData[i].getEquipment() + " ";
		text += variableData[i].getModel() + " ";
		text += variableData[i].getSerialNumber() + " ";
		text += variableData[i].getManufacturer() + " ";
		text += variableData[i].getManualName() + " ";
		text += variableData[i].getDownloadLink() + " ";
		text += variableData[i].getOperationManualName() + " ";
		text += variableData[i].getOperationDownloadLink();

		injector.inject(text, i, synchro);
	}
}

// need for a parameter in fullprof.make_callback
function engineReady(state) {
}

// library call. doesn't do anything 
searchEngine.open([index1, index2], fullproof.make_callback(engineReady, true), fullproof.make_callback(engineReady, false));

// typehere is in html. the name of the text box 
function search() {

	var value = document.getElementById("typehere").value;
	console.log("document.getElementById(typehere): " + value); //print statement 

	searchEngine.lookup(value, function(resultset) { // result set is a list of everything they found that matches our value 
		if (resultset && resultset.getSize()) {
			var rsize = resultset.getSize();
			var result = "<br>Found " + rsize + " result" + (rsize>1?"s":"") + " matching your request."; // create a html tag 

			// Creating the table format in html.
			result += '<br><table style="width:100%">';

			// Creating the table headings.
			result += "<tr>";
			result += "<th>Equipment</th>"; // table heading 
			result += "<th>Model</th>";
			//result += "<th>Serial Number</th>";
			result += "<th>Manufacturer</th>";
			result += "<th>Download Service Manual</th>";
			result += "<th>Download Operation Manual </th>";
			result += "</tr>";

			// Inserting the search results into the table.
			resultset.forEach(function (e) {
				var c = variableData[e];

				console.log("c.getManualName: " + c.getManualName());

				result += "<tr>"; //tr is table row, defined in css 
				result += "<td>" + c.getEquipment() + "</td>"; // cell in a table 
				result += "<td>" + c.getModel() + "</td>";
				//result += "<td>" + c.getSerialNumber() + "</td>";
				result += "<td>" + c.getManufacturer() + "</td>";

				if (c.getDownloadLink() == '-') {
					result += "<td> Currently Unavailable </td>";
				}
				else {
					result += "<td>" + '<a href="' + c.getDownloadLink() + '">' + c.getManualName() +"</a>" + "</td>"; // define the info as a link, displayed as manual name 
				}

				if (c.getOperationDownloadLink() == '-') {
					result += "<td> Currently Unavailable </td>";
				}
				else {
					result += "<td>" + '<a href="' + c.getOperationDownloadLink() + '">' + c.getOperationManualName() +"</a>" + "</td>"; // define the info as a link, displayed as manual name 
				}

				result += "</tr>";
			});

			result += "</table>";


		} else {
			result = "<h2>No result found</h2>";
		}
		document.getElementById("results").innerHTML = result;
	});
	
}



