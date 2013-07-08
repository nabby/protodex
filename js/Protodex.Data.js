// Protodex.Data constructor
Protodex.Data = function(app, text)
{
	this.app = app;

	if (text)
		this.importCsv(text);
	else
		this.data = [];
};

// Protodex.Data methods
Protodex.Data.prototype = {
	app:		null,
	data:		null,

	/*!\brief	imports CSV text into data
	 * \param	text		CSV text
	 */
	importCsv: function(text)
	{
		var data = $.csv.toObjects(text);
        this.data = [];
        for(var i=0, l=data.length; i<l; i++) {
            var record = new Protodex.Record(data[i]);
            this.data.push(record);
            dataIndex.appendIndex(record.id);
        }

	},

	/*!\brief	returns an array of available fields in the CSV file
	 * \return	array of field names
	 */
	getFields: function()
	{
        var fields = [];
        var fieldsLength = 0;
        var recordInd; //index of record with most fields
        for (var i=0, l=this.data.length; i<l; i++){
            var length = Object.keys(this.data[i].data).length
            if (length > fieldsLength) {
                fieldsLength = length;
                recordInd = i;
            }
        }

        for(var f in this.data[recordInd].data) fields.push(f);
        return fields;
	},

	/*!\brief	trims the data to just the specified fields
	 * \param	fieldsToKeep		array of fields to keep
	 */
	trim: function(fieldsToKeep)
	{
        var fields = this.getFields();
        var fieldsToDelete = fields.filter(function (f) {   // diff btwn all fields and fields to keep are fields to delete
                return fieldsToKeep.indexOf(f) == -1;
            });

        for (var i=0, l=this.data.length; i<l; i++){
            this.data[i].trim(fieldsToDelete);
        }

	},

	/*!\brief	case-insensitive, in-place sorting of data
	 * \param	sort		sort field (string)
	 * \param	dir		sort direction
	 *					'ASC': ascending (default)
	 *					'DSC': descending
	 */

    _sortDataCB: function(sort, dir)     // callback function for sort method
    {
        var order = dir == 'DSC' ? -1 : 1;
        return function (o, p) {
            var a, b;
            if (o && p) {
                a = o.data[sort] ? o.data[sort].toLowerCase() : "";
                b = p.data[sort] ? p.data[sort].toLowerCase() : "";
                if (a === b) {
                    return 0;
                } else {
                    return (a < b ? -1 : 1) * order;
                }
            }
        };
    },

    sortData: function(sort, dir) //NEED TO FIND BUG
	{
        return this.data.sort(this._sortDataCB(sort, dir));
	},

    loadData: function()
    {
        this.data = [];
        var index = dataIndex.loadIndex();
        if (index) {
            for (var i = 0, l = index.length; i<l; i++) {
                var record = new Protodex.Record();
                record.load(index[i]);
                this.data.push(record);
            }
        }
    },

    save: function(id, data)
    {
        var record = new Protodex.Record();
        record.update(id, data);
        this.loadData();
    },

    remove: function(id)
    {
        var record = new Protodex.Record();
        if (dataIndex.checkInIndex(id)) {
            record.remove(id);
            dataIndex.deleteFromIndex(id);
        } else {
            throw new Error("Record not found.");
        }
        this.loadData();
    },

    clear: function()
    {
        localStorage.clear();
        this.data = null;
    }
};
