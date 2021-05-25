var q = new ActiveXObject('Scripting.FileSystemObject');
    
var str = q.OpenTextFile('war_and_peace11_input.txt');
str = new String(str.ReadAll()); 

var subs = q.OpenTextFile('substr.txt');	 
subs = new String(subs.ReadAll());

var flag = 0; 
var count = 0;

function equal(str, subs, startSymbol) {
	for (j = 0; j < subs.length; j++) 
		if (str.charAt(startSymbol + j) != subs.charAt(j))
			return false;
	return true;
}

WScript.Echo("\n" + "BF")
	for (i = 0; i <= str.length - subs.length; i++) { 
		if (equal(str, subs, i)) { 
            flag = 1;
            count++;
            if(count < 11)
			    WScript.StdOut.Write((i + 1) + ' ');
		}
	}
	if (flag == 1) {
        WScript.Echo("\nNumber of occurrences: " + count);
    } else {
        WScript.Echo('No substrs found!');
    }
