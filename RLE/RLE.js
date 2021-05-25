var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("RLEstring.txt", 1);
var source = f.ReadAll();
f.close();

var escSym = "#";
var count = 1; //количество одинаковых символов
var number = "";
var encodedString = ""; //какие символы кодируем
var k = 0;
var h = 0;
var numberLength = 0; //длина числа

WScript.Echo("Source String: " + source) //исходная строка
WScript.Echo();

//------------------ Escape Encoding ------------------
var esEn = "";                                    
for (var i = 0; i <= source.length; i++) {        
  if (source.charAt(i) == source.charAt(i+1)) {
    count++;
    if (count > 254) {   
      esEn += escSym + String.fromCharCode(count) + source.charAt(i);
      count = 1;
      encodedString += source.charAt(i);
    }
  } else if (source.charAt(i) == escSym || count >= 4) {   
		esEn += escSym + String.fromCharCode(count) + source.charAt(i);
		count = 1;
		encodedString += source.charAt(i);
  } else {
    while (count != 0) {
      esEn += source.charAt(i);
      count--;
    }
    count++;
  }
}
WScript.Echo("Escape Encode: " + esEn);
WScript.Echo();

//------------------ Escape Decoding ------------------
var  esDc = "";
    for (var i = 0; i < esEn.length; i++) {
        if (esEn.charAt(i) == escSym){
            for (var j = 0; j < esEn.charCodeAt(i + 1); j++)
           		 esDc += esEn.charAt(i + 2);
            i += 2;
        }
        else
        esDc += esEn.charAt(i);
    }
    WScript.Echo("Escape Decode " + esDc);
    WScript.Echo();

//------------------- Jump Encoding -------------------
var jumpEn = "";
var backup = "";
var count = 0;
var countLong = 0;
	for (var i = 0; i < source.length; i++)
	{
		if (source.charCodeAt(i) == source.charCodeAt(i + 1))
		{
			count++;
			if (count == 127)
			{
				jumpEn += String.fromCharCode(count) + source.charAt(i);
				count = 0;
			}
			if (countLong != 0) 
			{
				jumpEn += String.fromCharCode(countLong + 128) + backup;
				countLong = 0;
				backup = "";
			}
		}
	else 
	{	
		if (count != 0)
		{
			jumpEn += String.fromCharCode(count + 1) + source.charAt(i);
			count = 0;
		}
		else {	
			countLong++;
			backup += source.charAt(i);
		}
	}
}
	if (countLong != 0)
	{
		jumpEn += String.fromCharCode(countLong + 128) + backup;
	}
	
WSH.echo("Jump Encode: " + jumpEn);
WScript.Echo();

//------------------- Jump Decoding -------------------

var jumpDec = "";
	for (var i = 0; i < jumpEn.length; i++)
	{
		if (jumpEn.charCodeAt(i) > 128)	
		{
			var number = jumpEn.charCodeAt(i)-128;
			for (var j = 0; j < number; j++)
			{
				jumpDec += jumpEn.charAt(i+1);
				i++;
			}
		}
		else 
		{
			var number = jumpEn.charCodeAt(i);
			for (var j = 0; j < number; j++)
				jumpDec += jumpEn.charAt(i+1);	
			i++;	
		}
	}

WSH.echo("Jump Decode: " + jumpDec);
