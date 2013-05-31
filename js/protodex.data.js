/*!\brief	converts CSV text to an array of objects
 * \param	text		CSV text
 * \return	array of objects
 */
protodex.csvToData = function(text)
{
	return $.csv.toObjects(text);
}

/*!\brief	returns an array of available fields in the CSV file
 * \param	data		array of objects
 * \return	array of field names
 */
protodex.dataFields = function(data)
{
}

/*!\brief	reduce the data to just the specified fields
 * \param	data		array of objects
 * \return	filtered data array
 */
protodex.filterData = function(data, fields)
{
}

/*!\brief	case-insensitive, in-place sorting of data
 * \param	data		array of objects
 * \param	sort		sort field
 * \param	dir		sort direction (default ascending)
 */
protodex.sortData = function(data, sort, dir)
{
	// NOTE: see JS Array.sort() documentation
}