Protodex.Record = function(obj)
{
	if (obj) this._create(obj);
};

Protodex.Record.prototype = {
	_SEQUENCE: 'sequence',
	id: null,
	data: null,

	_hash: function (seq) //hashes sequence to create record Id
	{
		var s = Math.floor(157951.665025874041 * Math.pow(2, 32));
		var x = (seq+1) * s;
		var h = x >> (32-30);
		return h.toString();
	},

	_incrSeq: function() //increments sequence by 1 and saves in localStorage
	{
		var currSeq = localStorage.getItem(this._SEQUENCE);
		var newSeq = currSeq ? (Number(currSeq) + 1) : 0;
		localStorage.setItem(this._SEQUENCE, newSeq);
		return newSeq;
	},

	_setId: function()
	{
		this.id = this._hash(this._incrSeq());
	},

	_populate: function(obj) //populate record object //NEED TO MODIFY TO ACCOMMODATE BOTH CREATE AND UPDATE
	{
		this.data = obj;
	},

	_write: function() //writes record to localStorage
	{
		localStorage.setItem(this.id, JSON.stringify(this.data));
	},

	_create: function(obj)
	{
		this._setId();
		this._populate(obj);
		this._write();
	},

	_reset: function()
	{
		this.id = null;	//resets id and data
		this.data = null;
	},

	load: function(id) //retrieves record from localStorage based on id
	{
		if (this.id == null && this.data == null) {
			this.id = id;
			this.data = JSON.parse(localStorage.getItem(id));
		}

	},

	update: function(id, obj_new)
	{
		this.id = id;
		if (this.id) {
			this._populate(obj_new);
			this._write();
		}
	},

	remove: function(id) //removes record from localStorage. If record not loaded first, must pass in id.
	{
		if (id) {
			localStorage.removeItem(id);
		} else if(this.id) {
			localStorage.removeItem(this.id);
		}

		this._reset();
	},

	trim: function(fieldsToDelete)
	{
    	for(var i=0, l=fieldsToDelete.length; i<l; i++)  {
        	delete this.data[fieldsToDelete[i]];
        }
        this._write();
	}
}