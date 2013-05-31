// Protodex.Data constructor
Protodex.Data = function(text) 
{
	if (text)
		this.csvImport(text);
	else
		this.data = [];
};

// Protodex.Data methods
Protodex.Data.prototype = {
	data:		null,

	/*!\brief	converts CSV text to an array of objects
	 * \param	text		CSV text
	 * \return	array of objects
	 */
	csvImport: function(text)
	{
		this.data = $.csv.toObjects(text);
	},

	/*!\brief	returns an array of available fields in the CSV file
	 * \return	array of field names
	 */
	getFields: function()
	{
		for (var i=0, l=data.length; i<l; i++) {
			// write me!
		}
	},

	/*!\brief	trims the data to just the specified fields
	 * \param	data		array of objects
	 */
	trim: function(fields)
	{
		// write me!
	},

	/*!\brief	case-insensitive, in-place sorting of data
	 * \param	data		array of objects
	 * \param	sort		sort field
	 * \param	dir		sort direction (default ascending)
	 */
	sort: function(sort, dir)
	{
		// write me!
		// NOTE: see JS Array.sort() documentation
	}
};