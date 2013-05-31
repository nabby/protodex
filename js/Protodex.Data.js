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
	{
		for (var i=0, l=data.length; i<l; i++) {
			// write me!
		}
	},

	/*!\brief	trims the data to just the specified fields
	 * \param	fields		array of fields to keep
	 */
	trim: function(fields)
	{
		// write me!
	},

	/*!\brief	case-insensitive, in-place sorting of data
	 * \param	sort		sort field (string)
	 * \param	dir		sort direction
	 *					'ASC': ascending (default)
	 *					'DSC': descending
	 */
	sort: function(sort, dir)
	{
		// write me!
		// NOTE: see JS Array.sort() documentation
	}
};
