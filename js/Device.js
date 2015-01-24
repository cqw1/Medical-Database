var Device = function(equipmentIn, modelIn, snIn, manufacturerIn, dlIn) {
	this.equipment = equipmentIn;
	this.model = modelIn;
	this.sn = snIn;
	this.manufacturer = manufacturerIn;
	this.dl = dlIn;
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

Device.prototype.getDownloadLink = function () {
	return this.dl;
}