if (!Protodex) var Protodex = {};

// Protodex.Data constructor
Protodex.Data = function(app, text)
{
	this.app = app;

	if (text)
		this.importCsv(text);
	else
		this.data = [];

    this.index = Protodex.dataIndex;
};

// Protodex.Data methods
Protodex.Data.prototype = {
    index:      null,
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
            this.index.appendIndex(record.id);
        }

	},

	/*!\brief	returns an array of available fields in the CSV file
	 * \return	array of field names
	 */
	getFields: function()
	{
        var ind = this._findRecordWithAllFields();
        var fields = [];
        for(var f in this.data[ind].data) fields.push(f);
        return fields;
	},

    _findRecordWithAllFields: function()
    {
        var fieldsNum = 0, ind;
        for (var i=0, l=this.data.length; i<l; i++) {
            var length = Object.keys(this.data[i].data).length
            if (length > fieldsNum) {
                fieldsNum = length;
                ind = i;
            }
        }

        return ind;
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

    sortData: function(sort, dir)
    {
        return this.data.sort(this._sortDataCB(sort, dir));
    },

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

    /*!\brief   loads an array of record objects with localStorage data to this.data
     */
    loadData: function()
    {
        this.data = [];
        var index = this.index.loadIndex();
        if (index) {
            for (var i = 0, l = index.length; i<l; i++) {
                var record = new Protodex.Record();
                record.load(index[i]);
                this.data.push(record);
            }
        }
    },

    /*!\brief   creates, updates, or removes records upon save
     * \param   idData      id and data(object)
     *                      key: id
     *                      value: data(object)
     */
    save: function(idData)
    {
        for (var id in idData) {
            var data = idData[id];
            var dataLen = Object.keys(data).length;

            if (id[0] == "a") {   // if ID is a placeholder (i.e new line)
                if (dataLen) this._newRecord(data); //create new record if there's data
            } else {                        // existing data
                id = id.toString();
                if (dataLen) {
                    this._update(id, data);
                } else {
                    this._remove(id);
                }
            }
        }

        this.loadData();
    },

    _newRecord: function(data)
    {
        var record = new Protodex.Record(data);
        this.index.appendIndex(record.id);
    },

    _update: function(id, data)
    {
        var record = new Protodex.Record();
        record.update(id, data);
    },

    _remove: function(id)
    {
        var record = new Protodex.Record();
        if (this.index.checkInIndex(id)) {
            record.remove(id);
            this.index.deleteFromIndex(id);
        } else {
            throw new Error("Record not found.");
        }
    },

    /*!\brief   clears localStorage
     */
    clear: function()
    {
        localStorage.clear();
        this.data = null;
    }
};
