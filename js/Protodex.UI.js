// UI goes here
Protodex.UI = function (app, $el)
{
	this.app = app;
	this.$el = $el;
	
	this._bind();	
};

Protodex.UI.prototype = {
	MODES:		['splash', 'import', 'picker', 'display'],
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
		case 'fieldPicker':
			var d = $target.serializeArray();
			var fields = [];
			for (var i=0; i<d.length; i++) {
				fields.push(d[i].name);
			}

			this.app.dataTrim(fields);
			break;
		}
	},
	
	fieldPicker: function (fields)
	{
		var $form = this.$el.find('FORM.fieldPicker');
		var $ul = $form.find('ul');
		var str = '';

		for (var i=0; i< fields.length; i++) {
			str += '<li><input type="checkbox" name="' + fields[i] + '">' + fields[i] + '</li>';
		}
		
		$ul.html(str);
	},
	
	display: function (dataObj)
	{
		var data = dataObj.data;
		var fields = dataObj.getFields();
		var str = '';
		var $thead = this.$el.find('.display TABLE THEAD');
		var $tbody = this.$el.find('.display TABLE TBODY');

		// print out header
		for (var i=0, l=data.length; i<l; i++) {
			str += '<tr>';
			for (var j=0; j<fields.length; j++) {
				str += '<th><a href="#">' + fields[j] + '</a></th>';
			}
			str += '</tr>';
		}
		
		$thead.html(str);
		
		var str = '';
		// print out body
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