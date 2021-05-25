var s = WScript.StdIn.ReadLine();
var h = 0;
var alph = new Array();
var count = 0;
var result = 0;

for(var i = 0; i < s.length; i++) {
    if(!isNaN(alph[s.charCodeAt(i)])){
        alph[s.charCodeAt(i)]++;  
    }
    else {
        alph[s.charCodeAt(i)] = 1;    
    }
}

for(var i = 0; i < alph.length; i++) {
    if(!isNaN(alph[i])) {
        result = alph[i]/s.length;
        WScript.Echo(String.fromCharCode(i) + ": ", result.toFixed(10));
        count++;
    }
}

if(result == 1){
    WScript.Echo('entropy', 0);
    WScript.Quit();
}

if(count > 0)
    for (var i = 0; i < alph.length; i++)
       if ((!isNaN(alph[i])))
       
           h += (alph[i] / s.length) * (Math.log(alph[i]/s.length) / Math.log(count));
WScript.Echo('entropy', -h)


