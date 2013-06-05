// UI goes here
Protodex.UI = function (app, $el)
{
	this.app = app;
	this.$el = $el;
	
	this._bind();
	
	this.switchMode(0)
	
};

Protodex.UI.prototype = {
	MODES:		['splash', 'import', 'display'],
	app:		null,
	$el:		null,
	curMode:	null,
	
	_bind: function ()
	{
		this.$el
			.on('click', 'BUTTON', scopeC(this._clickCb, this))
			.on('submit', 'FORM', scopeC(this._submitCb, this));
			
	},
	
	_clickCb: function (e)
	{
		var $target = $(e.currentTarget);
		var act = $target.data('act');
		
		switch (act) {
		case 'importMode':
			this.switchMode(1);
			break;
		}
	},
	
	_submitCb: function (e)
	{
		var $target = $(e.currentTarget);
		var act = $target.data('act');
		
		e.preventDefault();
		
		switch (act) {
		case 'import':
			var csv = $target.find('[name=csv]').val();
			this.app.dataImport(csv);
			break;
		}
	},
	
	switchMode: function (idx)
	{
		// DOM
		for (var i=0; i<this.MODES.length; i++) {
			var k = this.MODES[i];
			this.$el.children('.' + k).toggle(i == idx);
		}
	}
};