// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


Array.prototype.removeElement = function(element) {
	var idx = this.indexOf(element);
	
	if (idx <= (- 1)) {
		return;
	}
	
	return this.remove(idx);
};