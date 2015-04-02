
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

var index2 = {
	name: "stemmedindex",
	analyzer: new fullproof.StandardAnalyzer(fullproof.normalizer.to_lowercase_nomark),
	capabilities: new fullproof.Capabilities().setUseScores(false).setDbName(dbName),
	initializer: initializer
};

function initializer(injector, callback) {
	var synchro = fullproof.make_synchro_point(callback, variableData.length-1);
	for (var i = 0; i < variableData.length; ++i) {
		var text = "";
		text += variableData[i].getEquipment() + " ";
		text += variableData[i].getModel() + " ";
		text += variableData[i].getSerialNumber() + " ";
		text += variableData[i].getManufacturer() + " ";
		text += variableData[i].getManualName() + " ";
		text += variableData[i].getDownloadLink();

		injector.inject(text, i, synchro);
	}
}

function engineReady(state) {
}

searchEngine.open([index1, index2], fullproof.make_callback(engineReady, true), fullproof.make_callback(engineReady, false));


function search() {

	var value = document.getElementById("typehere").value;
	console.log("document.getElementById(typehere): " + value);

	searchEngine.lookup(value, function(resultset) {
		if (resultset && resultset.getSize()) {
			var rsize = resultset.getSize();
			var result = "<br>Found " + rsize + " result" + (rsize>1?"s":"") + " matching your request.";

			// Creating the table format in html.
			result += '<br><table style="width:100%">';

			// Creating the table headings.
			result += "<tr>";
			result += "<th>Equipment</th>";
			result += "<th>Model</th>";
			result += "<th>Serial Number</th>";
			result += "<th>Manufacturer</th>";
			result += "<th>Download</th>";
			result += "</tr>";

			// Inserting the search results into the table.
			resultset.forEach(function (e) {
				console.log("e: " + e);
				var c = variableData[e];
				result += "<tr>";
				result += "<td>" + c.getEquipment() + "</td>";
				result += "<td>" + c.getModel() + "</td>";
				result += "<td>" + c.getSerialNumber() + "</td>";
				result += "<td>" + c.getManufacturer() + "</td>";

				if (c.getDownloadLink() == '-') {
					result += "<td> - </td>";
				}
				else {
					result += "<td>" + '<a href="' + c.getDownloadLink() + '">' + c.getManualName() +"</a>" + "</td>";
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

