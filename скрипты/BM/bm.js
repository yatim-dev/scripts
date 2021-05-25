var str = WScript.StdIn.ReadLine();

var subs = WScript.StdIn.ReadLine();

var result = [];
var entry = [];
for (var i = 0; i < subs.length; i++) {
    entry[subs.charAt(i)] = i + 1;
}

function equal1(str, subs) {
	for (var j = 0; j < subs.length; j++) 
		if (str.charAt(j) != subs.charAt(j))
			return false;
	return true;
}

function equal(str) {
	for (var j = 0; j < str.length - 1; j++) 
		if (str.charAt(j) != str.charAt(j + 1))
            return false;
	return true;
}

var j = 0;
if(equal(str) && equal1(str, subs)) {
    while (j < str.length) {
        result.push(j + 1);
        if(j < str.length - subs.length)
             j += 1;
        else 
            break;
    }
    WScript.Echo(result);
    WScript.Quit();
}


for (var i = subs.length - 1; i < str.length; i++) {
    for (var j = 0;  str.charAt(i - j) == subs.charAt((subs.length - 1) - j); j++) { 
        if (j == subs.length - 1) {
            result.push(1 + i - (subs.length - 1));
            break;
        }
    }
    
    if (!entry[str.charAt(i - j)])
        i += subs.length - 1;
    else
        i += Math.max(1, subs.length - 1 - entry[str.charAt(i - j)] - j); 
}

if (result.length == 0)
    WScript.StdOut.WriteLine("No occurrences");
else
    WScript.StdOut.WriteLine(result);