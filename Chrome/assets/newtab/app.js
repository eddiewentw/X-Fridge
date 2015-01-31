Date.prototype.stringFormat = function () {
	var y = this.getFullYear();
	var m = this.getMonth() + 1;
	var d = this.getDate();
	return y + "-" + m + "-" + "d";
};
function INFO() {
	var self = this;
	self.UI = $('#info');
	self.name = self.UI.find('.name');
	self.date = self.UI.find('.date');
	return self;
}

INFO.prototype.updateName = function () {
	var self = this;
	var name = tool.read('username') || 'Stranger';
	self.name.text(name);
	return self;
};

INFO.prototype.updateDate = function () {
	var self = this;
	var now = new Date();
	self.date.text(now.getMonth() + 1 + "/" + now.getDate());
	return self;
};
function LIST() {
	var self = this;
	self.UI = $('#list');
	self.ADD = new LIST_ADD(self);
	return self;
}

LIST.prototype.updateName = function () {
	var self = this;
	return self;
};

LIST.prototype.updateDate = function () {
	var self = this;
	return self;
};

function LIST_ADD(parent) {
	var self = this;
	self.parent = parent;
	self.UI = self.parent.UI.find('#add');
	self.food_name = self.UI.find('.food_name');
	self.food_date = self.UI.find('.food_date');
	self.food_quantity = self.UI.find('.food_quantity');
	self.food_type = self.UI.find('.food_type');
	self.add_item = self.UI.find('.add_item');
	self.add_item.on('click', self, function (e) {
		var self = e.data;
		var item = {
			name: self.food_name.val(),
			buydate: new Date().stringFormat(),
			expire: self.food_date.val(),
			quantity: self.food_quantity.val(),
			type: self.food_type.val()
		};
		self.addItem(item);
	});
	return self;
}

LIST_ADD.prototype.addItem = function (item) {
	var self = this;
	tool.write('food', item);
	self.clearItem();

};
LIST_ADD.prototype.clearItem = function () {
	var self = this;
	self.food_name.val('');
	self.food_date.val('');
	self.food_type.val('');
	self.food_quantity.val('');
};
$(function () {
	start();

	function start() {

		askUserName();

		window.INFO = new INFO();
		window.LIST = new LIST();
		INFO.updateName().updateDate();
	}

	function askUserName() {
		
	}

});

window.username = [];
window.food = '';
window.food_arr = [];

window.tool = {
	read:function(key){
		if (!supportLocalStorage()) {
		    return false;
		}
		switch(key){
			case "username":
				username = localStorage["username"];
	        	return username;
			break;

			case "food":
				food = localStorage["food"];
				food_arr = JSON.parse(food);
	        	return food_arr;
			break;

			default:
				return true;
			break;
		}
	},
	write:function(key, value){
		if (!supportLocalStorage()) {
		    return false;
		}
		switch(key){
			case "username":
	        	localStorage["username"] = value;
	        	return true;
			break;

			case "food":
				food_arr.push(value);
	        	localStorage["food"] = JSON.stringify(food_arr);
	        	return true;
			break;

			default:
			break;
		}
	},
	remove:function(key, index){
		if (!supportLocalStorage()) {
		    return false;
		}
		switch(key){
			case "food":
				food_arr = splice(index, 1);
				food = JSON.stringify(food_arr);
				localStorage['food'] = food;
				return true;
			break;

		}
	}

}

function supportLocalStorage(){
	if(!localStorage){
		return false;
	}else{
		return true;
	}
}