// http://pastebin.com/WAY6ZV7K from http://stackoverflow.com/questions/3955770/dynamically-include-javascript-and-wait

// Javascript loaded using Loader can arrive after DOMContentLoaded has occured.
// Remember if DOMContentLoaded has happened, so loaded JS knows if it's safe to execute.
document.addEventListener && document.addEventListener("DOMContentLoaded", function() {
	Loader.documentReady = true;
}, false);

/**
 * Load files in parallel.
 * Each call to 'script' adds a batch. Batches are loaded sequentially, while files in a batch are loaded in parallel.
 *
 * Public functions:
 * - script
 */
Loader = {
	batches: [],
	documentReady: false,
	isLoading: false,

	/**
	 * Add an array of script files that can be loaded in parallel (don't have dependencies amongst each other).
	 *
	 * @param files{Array}: an array of urls.
	 * @param options{object}: a map of options.
	 *			Required properties: none.
	 *			Optional properties:
	 *				- complete{Function}: function called after a batch of loads has completed
	 *				- timeout{Number}: set a timeout for load requests
	 *				- attributes{Object}: a bag of attribute names/values that should be applied to created script tags.
	 */
	script: function(files, options) {
		options = options || {};
		options.files = files;
		options.element = 'script';

		options.attributes = options.attributes || {};
		options.attributes.type = 'text/javascript';

		// add files to batches, start processing a batch if we currently aren't
		if (files.length) {
			this.batches.push(options);

			if (!this.isLoading) this.loadBatch(this.batches.shift());
		}
	},

	/**
	 * Start loading the next batch of files from the 'batches' array.
	 */
	loadBatch: function(options) {
		var dit = this;
		var head = document.getElementsByTagName('head')[0];
		var loading = [];
		this.isLoading = true;

		// Add each file in options.files to the head
		for (var i = 0; i < options.files.length; i++) {
			var js = document.createElement(options.element);
			js.src = options.files[i];

			for (var j in options.attributes)
			js[j] = options.attributes[j];

			new this.l(js, options.timeout || 10000, callback);
			loading.push(js);
			head.appendChild(js);
		}

		// callback used by 'l' after success or timeout

		function callback(elem) {
			// remove 'elem' from 'loading'
			for (var i = 0; i < loading.length; i++) {
				if (elem === loading[i]) {
					loading.splice(i, 1);
					//console.log( 'loaded %s', elem.src );
					break;
				}
			}

			// fire success callback, start next batch if available
			if (!loading.length) {
				if (typeof(options.complete) === 'function') window.setTimeout(function() {
					options.complete();
				}, 10);

				// if there are more batches, load the next one
				if (dit.batches.length) {
					window.setTimeout(function() {
						dit.loadBatch(dit.batches.shift());
					}, 10);
				} else dit.isLoading = false;
			}
		}
	},

	l: function(elem, timeout, callback) {
		elem.onreadystatechange = readyStateChange;
		elem.onerror = elem.onload = completed;

		var t = setTimeout(completed, timeout);

		// Triggered by load/error/readystate. This = the DOMElement.

		function completed() {
			clearTimeout(t);
			elem.onreadystatechange = elem.onload = elem.onerror = null;
			callback(elem);
		};

		function readyStateChange() {
			if (elem.readyState == "loaded" || elem.readyState == "complete") elem.onload();
		};

		return this;
	}
}
