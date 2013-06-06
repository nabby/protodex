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

		this.ui.fieldPicker(fields);
		this.ui.switchMode(2);
	},
	
	dataTrim: function (fields)
	{
		this.data.trim(fields);
		
		this.ui.display(this.data);
		
		this.ui.switchMode(3);
	},

    dataSort: function (sort, dir)
    {
        this.data.sortData(sort, dir);

        this.ui.display(this.data);
    }
};