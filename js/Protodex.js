// FIXME: use jQuery scoping function instead?
scopeC = function(cb, scope)
{
	return function() { return cb.apply(scope, arguments) };
}

// create namespace
var Protodex = {}

Protodex.App = function ($el)
{
	// create UI
	this.ui = new Protodex.UI(this, $el);
	
	// create Data
	this.data = new Protodex.Data(this);

	// initialize	
	this.ui.switchMode(0)
};


Protodex.App.prototype = {
	data: 		null,
	ui:		null,
	d:		null,
	
	dataImport: function (csv)
	{
		this.data.importCsv(csv);
		
		var fields = this.data.getFields();

		// hi lushi
		console.log('SORTDATA LNAME', this.data.sortData("lname"));

		this.ui.fieldPicker(fields);
		this.ui.switchMode(2);
	}
};