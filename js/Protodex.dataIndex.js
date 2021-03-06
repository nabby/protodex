if (!Protodex) var Protodex = {};

Protodex.dataIndex = {
	_NAME: 'Protodex.dataIndex',

	appendIndex: function(id) //adds Id to Protodex.dataIndex
	{
		var ind = Protodex.dataIndex.loadIndex() || []; //sets Protodex.dataIndex to empty array if it doesn't exist yet
		ind.push(id);
		localStorage.setItem(Protodex.dataIndex._NAME, JSON.stringify(ind));
	},

	loadIndex: function() //retrieves Protodex.dataIndex and decodes it into an array
	{
		var indexJ = localStorage.getItem(Protodex.dataIndex._NAME);
		return JSON.parse(indexJ);
	},

	checkInIndex: function(id) //checks if an Id already exists in Protodex.dataIndex
	{
		var ind = Protodex.dataIndex.loadIndex();
		if (ind) {
			for (var i = 0; i < ind.length; i++) {
				if (ind[i] === id) {
					return true;
				}
			}
		}
		return false;
	},

	deleteFromIndex: function(id) //removes Id from Protodex.dataIndex when record is deleted
	{
		var ind = Protodex.dataIndex.loadIndex();
		for (var i = 0; i < ind.length; i++) {
			if (ind[i] == id) {
				ind.splice(i, 1);
				break;
			}
		}
		localStorage.setItem(Protodex.dataIndex._NAME, JSON.stringify(ind));
	}
}