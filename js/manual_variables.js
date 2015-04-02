
var Device = function(equipmentIn, modelIn, snIn, manufacturerIn, manualIn, dlIn, manualOperationIn, OperationUrlIn) {
	this.equipment = equipmentIn;
	this.model = modelIn;
	this.sn = snIn;
	this.manufacturer = manufacturerIn;
	this.manual = manualIn;
	this.dl = dlIn;
	this.operationUrlIn = OperationUrlIn;
	this.manualOperationIn = manualOperationIn;
};


Device.prototype.getEquipment = function () {
	return this.equipment;
}

Device.prototype.getModel = function () {
	return this.model;
}

Device.prototype.getSerialNumber = function () {
	return this.sn;
}

Device.prototype.getManufacturer = function () {
	return this.manufacturer;
}

Device.prototype.getManualName = function() {
	return this.manual;
}

Device.prototype.getDownloadLink = function () {
	return this.dl;
}

Device.prototype.getOperationDownloadLink = function(){
	return this.operationUrlIn;
}

Device.prototype.getOperationManualName = function(){
	return this.manualOperationIn;
}

//something

var A = new Device('Infant Incubator', 'Medikraft', '-', 'Marula.udyagindia.pvt.ltd', "Cardio Care 2000 Service Manual", "http://s000.tinyupload.com/?file_id=89680257728123638230", "CardioCare2000_Operation_Maual","http://s000.tinyupload.com/index.php?file_id=31703328844889277472");
var B = new Device("Infant Warmer", "ISIS mediprama", "40161274", "Incubator-surveillance-intelligence-systeme", "-", "-", "-","-");
var C = new Device("Suction Machine", "GIMA", "3021", "Gima Italy", "-", "-", "-","-");


var variableData = [A, B, C];

for (var i = 0; i < variableData.length; i++) {
	console.log(variableData[i].getEquipment());
}
