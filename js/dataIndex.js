var dataIndex = {
	_NAME: 'dataIndex',

	appendIndex: function(id) //adds Id to dataIndex
	{
		var ind = dataIndex.loadIndex() || []; //sets dataIndex to empty array if it doesn't exist yet
		ind.push(id);
		localStorage.setItem(dataIndex._NAME, JSON.stringify(ind));
	},

	loadIndex: function() //retrieves dataIndex and decodes it into an array
	{
		var indexJ = localStorage.getItem(dataIndex._NAME);
		return JSON.parse(indexJ);
	},

	checkInIndex: function(id) //checks if an Id already exists in dataIndex
	{
		var ind = dataIndex.loadIndex();
		if (ind) {
			for (var i = 0; i < ind.length; i++) {
				if (ind[i] === id) {
					return true;
				}
			}
		}
		return false;
	},

	deleteFromIndex: function(id) //removes Id from dataIndex when record is deleted
	{
		var ind = dataIndex.loadIndex();
		for (var i = 0; i < ind.length; i++) {
			if (ind[i] == id) {
				ind.splice(i, 1);
				break;
			}
		}
		localStorage.setItem(dataIndex._NAME, JSON.stringify(ind));
	}
}