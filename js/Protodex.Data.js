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
		this.data = $.csv.toObjects(text);
	},

	/*!\brief	returns an array of available fields in the CSV file
	 * \return	array of field names
	 */
	getFields: function()
	{   var fields = []
        for(var f in this.data[0]) fields.push(f);
        return fields;
	},

	/*!\brief	trims the data to just the specified fields
	 * \param	fieldsToKeep		array of fields to keep
	 */
	trim: function(fieldsToKeep)
	{   var fields = this.getFields();
        var fieldsToDelete = fields.filter(function (f) {   //diff btwn all fields and fields to keep are fields to delete
                return fieldsToKeep.indexOf(f) == -1;
            });
        for(var i=0, l=this.data.length; i<l; i++) {
            for(var j=0, m=fieldsToDelete.length; j<m; j++)  {
                delete this.data[i][fieldsToDelete[j]];
            }
        }
	},

	/*!\brief	case-insensitive, in-place sorting of data
	 * \param	sort		sort field (string)
	 * \param	dir		sort direction
	 *					'ASC': ascending (default)
	 *					'DSC': descending
	 */
	sortData: function(sort, dir)               //method name changed to sortData to avoid collision with sort
	{   var order = dir === 'DSC' ? -1 : 1;    //flip order if dir is DSC
        var by = function (sort) {
            return function (o, p) {
                var a, b;
                if (typeof o === 'object' && typeof p === 'object' && o && p) {
                    a = o[sort];
                    b = p[sort];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return (a < b ? -1 : 1) * order;
                    }
                    return (typeof a < typeof b ? -1 : 1) * order;
                } else {
                    throw {
                        name: 'Error',
                        message: 'Expected an object when sorting by ' + sort
                    };
                }
            };
        };

        return this.data.sort(by(sort));
	}
};
