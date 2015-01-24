
console.log("hello world");


var marioData = [
	{name: "Mario", type: "Protagonist"},
	{name: "Luigi", type: "Protagonist"},
	{name: "Toad", type: "Protagonist"},
	{name: "Wario", type: "Antagonist"}];


var dbName = "mario";
var marioSearchEngine = new fullproof.BooleanEngine();

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
	var synchro = fullproof.make_synchro_point(callback, marioData.length-1);
	for (var i = 0; i < marioData.length; ++i) {
		var text = marioData[i].name + " " + marioData[i].type;
		injector.inject(text, i, synchro);
	}
}

function engineReady(state) {
}

marioSearchEngine.open([index1, index2], fullproof.make_callback(engineReady, true), fullproof.make_callback(engineReady, false));


function search() {

	var value = document.getElementById("typehere").value;
	console.log("document.getElementById(typehere): " + value);

	marioSearchEngine.lookup(value, function(resultset) {
		if (resultset && resultset.getSize()) {
			var rsize = resultset.getSize();
			result = "<h1>Found " + rsize + " character" + (rsize>1?"s":"") + " matching your request.";
			result += "<table><tr><th>Name</th><th>Role</th></tr>";
			resultset.forEach(function (e) {
				var c = marioData[e];
				result += "<tr><td style='font-weight: bold;'>" + c.name + "</td>";
				result += "<td>" + c.type + "</td></tr>";
			});
			result += "</table>";
		} else {
			result = "<h2>No result found</h2>";
		}
		document.getElementById("results").innerHTML = result;
		//$("#results").html(result);
	});
	
}

//document.getElementById("search").click(search);
//document.getElementById("typehere").change(search);

