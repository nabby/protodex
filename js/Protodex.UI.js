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
    sortDir:    null,
    sortBy: 	null,

	_bind: function ()
	{
		this.$el
			.on('click', 'BUTTON', scopeC(this._clickCb, this))
            .on('click', 'A', scopeC(this._clickCb, this))
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

        case 'dataSort':
        	if(this.sortBy != $target.context.innerText) {
        		this.sortDir = 1;
        	} else {
        		this.sortDir = (this.sortDir + 1) % 2
        	}
            var dir = this.sortDir === 1 ? 'ASC' : 'DSC';
            this.app.dataSort($target.context.innerText, dir);
            this.sortBy = $target.context.innerText;
            break;

        case 'clear':
        	this.app.dataClear();
            break;

        case 'save':
            var $fields = this._getFields();
            var idData = {};
            var counter = 0
            this.$el.find('.display TABLE TBODY TR').each(function(){
                var $id = $(this).data('id');
                if ($id == null) {  // assign placeholder id if none exist (i.e. new record)
                    $id = "a" + counter;
                    counter++;
                }

                var $data = {};
                for (var i=0, l=$fields.length; i<l; i++){
                    var $text = $(this).context.children[i].innerText;
                    if ($text && $text.charCodeAt(0) != 10) $data[$fields[i]] = $text;
                }

                idData[$id] = $data;
            });

            this.app.dataSave(idData);
            break;

        case 'newRow':
            var $tbody = this.$el.find('.display TABLE TBODY');
            var $fields = this._getFields();

            var str = '<tr>';
            for (var i=0, l=$fields.length; i<l; i++) str += '<td contenteditable="true">&#10;</td>';
            str += '</tr>';

            $tbody.append(str);
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

    _getFields: function() //TODO: incorporate $el?
    {
        var $fields = []
        var $thNodes = this.$el.find('.display TABLE').find('th')

        for (var i=0, l=$thNodes.length; i<l; i++) {
            $fields.push($thNodes[i].innerText);
        };

        return $fields;
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

	display: function (protodexData)
	{
		var fields = protodexData.getFields();
		var str = '';
		var $thead = this.$el.find('.display TABLE THEAD');
		var $tbody = this.$el.find('.display TABLE TBODY');

		// print out header
        str += '<tr>';
        for (var j=0; j<fields.length; j++) {
            str += '<th><a href="#" data-act="dataSort">' + fields[j] + '</a></th>';
        }
        str += '</tr>';

		$thead.html(str);

		// print out data in body
        var data = protodexData.data;
        var str = '';

        for (var i=0; i<data.length; i++) {
            str += '<tr data-id=' + data[i].id + '>';

            for (var k=0; k<fields.length; k++) {
                var cell = data[i].data[fields[k]] || '&#10;';
                str += '<td contenteditable="true">' + cell + '</td>';
            }

            str += '</tr>';
        }

        $tbody.html(str);
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