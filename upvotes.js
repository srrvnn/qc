var fs = require('fs');

fs.readFile('upvotes.in', 'utf8', function(err, data) {

	if (err) throw err;
	upvotesGraph(data);
});

function upvotesGraph(input) {

	var input_lines = input.split('\n');

	for (var k = 0; k < input_lines.length; k = k+2) { // delete - added for testing

	var no_of_days = Number(input_lines[k+0].split(' ')[0]); // remove k - added for testing
	var window_size = Number(input_lines[k+0].split(' ')[1]);
	var upvotes = input_lines[k+1].split(' ');

	for (var j = 0, l = upvotes.length; j < l - window_size + 1; j++) {

		var no_of_increasing_subranges = 0;
		var no_of_decreasing_subranges = 0;

		var strech_increasing = null;
		var strech_length = 1;

		// console.log(upvotes.slice(j, j + window_size));

		for (var i = j + 1; i < j + window_size; i++) {

			// console.log('----');
			// console.log('Checking: ', upvotes[i-1], ' -> ', upvotes[i]);

			if (upvotes[i] > upvotes[i-1]) {

				if (strech_increasing == null || strech_increasing == true) {

					strech_length++;

				} else {

					no_of_decreasing_subranges += subrangesInStrech(strech_length);
					strech_length = 2;
				}

				strech_increasing = true;
				no_of_increasing_subranges++;

			} else if (upvotes[i] < upvotes[i-1]) {

				if (strech_increasing == null || strech_increasing == false) {

					strech_length++;

				} else {

					no_of_increasing_subranges += subrangesInStrech(strech_length);
					strech_length = 2;
				}

				strech_increasing = false;
				no_of_decreasing_subranges++;

			} else {

				strech_length++;

				no_of_increasing_subranges++;
				no_of_decreasing_subranges++;
			}

			// console.log('Inreasing : ', no_of_increasing_subranges);
			// console.log('Decreasing : ', no_of_decreasing_subranges);
		}

		var metric = no_of_increasing_subranges - no_of_decreasing_subranges
			+ (strech_increasing ? subrangesInStrech(strech_length)
				: -subrangesInStrech(strech_length));

		if (strech_increasing == null)  {

			metric += subrangesInStrech(strech_length);
		}

		console.log(metric);
	}

	console.log('-----');

} // delete - added for testing

}

function subrangesInStrech(strech_length) {

	if (!strech_length) return 0;

	return strech_length > 2 ? ((strech_length - 1) * (strech_length - 2) / 2) : 0;
}