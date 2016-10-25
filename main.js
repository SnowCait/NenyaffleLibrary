function aggregate(log) {
	var exps = [];

	var lines = log.split("\n");
	lines.forEach(function(line) {

		var re = /^\[ *([\d]{1,2})時 (\d{1,2})分 (\d{1,2})秒\] 経験値が (\d+) 上がりました。$/;
		if (re.test(line))
		{
			var result = line.match(re);

			var hours = parseInt(result[1]);
			var minutes = parseInt(result[2]);
			var seconds = parseInt(result[3]);
			var exp = parseInt(result[4]);

			exps.push(new ExpEntity(exp, hours, minutes, seconds));
		}
	});

	return exps;
}

function calcurate() {
	var log = document.getElementById("input");
	var result = document.getElementById("output");

	var exps = aggregate(log.value);

	if (exps.length <= 0) {
		return;
	}

	var first = exps[0];
	var last = exps[exps.length - 1];

	var diff = (last.Hours * 60 * 60 + last.Minutes * 60 + last.Seconds) - (first.Hours * 60 * 60 + first.Minutes * 60 + first.Seconds);
	if (diff <= 0) { diff = 1; }

	var h = parseInt(diff / 60 / 60);
	var m = parseInt((diff - h * 60 * 60) / 60);
	var s = (diff - h * 60 * 60 - m * 60);

	var sum = 0;
	exps.forEach(function(expEntity) {
		sum += expEntity.Exp;
	});

	result.innerText = "Exp: " + sum.toLocaleString()
		+ " / " + ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2) + " = "
		+ parseInt(sum / diff * 60 * 60).toLocaleString() + "/h";
}

var ExpEntity = function(exp, hours, minutes, seconds) {
	this.Exp = exp;
	this.Hours = hours;
	this.Minutes = minutes;
	this.Seconds = seconds;
};
