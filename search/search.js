var q = new ActiveXObject('Scripting.FileSystemObject');
    
var str = q.OpenTextFile('war_and_peace11_input.txt');
str = new String(str.ReadAll()); //строка

var subs = q.OpenTextFile('substr.txt');	 
subs = new String(subs.ReadAll());	//подстрока

var flag = 0; //Есть ли хоть одно вхождение
var count = 0;

function equal(str, subs, startSymbol) {
	for (j = 0; j < subs.length; j++) 
		if (str.charAt(startSymbol + j) != subs.charAt(j))
			return false;
	return true;
}

WScript.Echo("\n" + "BF")
 //Грубая сила
	var start = new Date().getTime();
    
	for (i = 0; i <= str.length - subs.length; i++) { 
		if (equal(str, subs, i)) { //Вхождение
            flag = 1;
            count++;
            if(count < 11)
			    WScript.StdOut.Write((i + 1) + ' ');
		}
	}
    var еnd = new Date().getTime();
    var realTime = еnd - start;
	if (flag == 1) {
        WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
        WScript.Echo("Number of occurrences: "+ count);
    } else {
        WScript.Echo('No substrs found!');
        WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Хэш просто сумма
WScript.Echo("\n" + "Sum");

    flag = 0;
    count = 0;
    var collision = 0;
    var h = 0; //Хэш части строки
    var hs = 0; //Хэш подстроки
    var firstSymbol = str.charCodeAt(0); //Первый символ части строки
    var lastSymbol = str.charCodeAt(subs.length - 1); //Последний символ

    for (var i = 0; i <= subs.length - 1; i++) { //Считаем хэш подстроки и первой части строки
        hs += subs.charCodeAt(i);
        h += str.charCodeAt(i);	
    } 
    start = new Date().getTime();
    for (i = 0; i <= str.length - subs.length; i++) { //Ищем дальше
        if (h == hs) {
            if (equal(str, subs, i)) { //Вхождение
                flag = 1;
                count++;
                if(count < 11)
                    WScript.StdOut.Write((i + 1) + ' ');
            } else {
                collision++;
            }
        }
        h -= firstSymbol; //Меняем хэш

        firstSymbol = str.charCodeAt(i + 1);
        lastSymbol = str.charCodeAt(i + subs.length);
        h += lastSymbol;
    }
    еnd = new Date().getTime();
    realTime = еnd - start;
        if (flag == 1) {
            WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
            WScript.Echo("Ammount of collision: " + collision);
            WScript.Echo("Number of occurrences: "+ count);
        } else {
            WScript.Echo('No substrs found!');
            WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
        }
    
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Хэш просто степень
 WScript.Echo("\n" + "Square");
 flag = 0;
 count = 0;
 collision = 0;
 h = 0; //Хэш части строки
 hs = 0; //Хэш подстроки
 var pow = 1;
 var firstSymbolinSquare = str.charCodeAt(0) * str.charCodeAt(0); //Первый символ части строки
 var lastSymbolinSquare = str.charCodeAt(subs.length - 1) * str.charCodeAt(subs.length - 1); //Последний символ

 for (var i = 0; i <= subs.length - 1; i++) { //Считаем хэш подстроки и первой части строки
	 hs += subs.charCodeAt(i) * subs.charCodeAt(i);
	 h += str.charCodeAt(i) * str.charCodeAt(i);	
 }
 
 start = new Date().getTime();

 for (i = 0; i <= str.length-subs.length; i++) { //Ищем дальше
    if (h == hs) {
        if (equal(str, subs, i)) { //Вхождение
            flag = 1;
            count++;
            if(count < 11)
                WScript.StdOut.Write((i + 1) + ' ');
        } else {
            collision++;
        }
    }
 h -= firstSymbolinSquare; //Меняем хэш
 firstSymbolinSquare = str.charCodeAt(i + 1) * str.charCodeAt(i + 1);
 lastSymbolinSquare = str.charCodeAt(i + subs.length) * str.charCodeAt(i + subs.length); 
 h += lastSymbolinSquare;
}

еnd = new Date().getTime();
realTime = еnd - start;
  if (flag == 1) {
      WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
      WScript.Echo("Ammount of collision: " + collision);
      WScript.Echo("Number of occurrences: "+ count);
    } else {
        WScript.Echo('No substrs found!');
        WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
    }



////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Rabin-Carp
WScript.echo("\n" + "Rabin-Carp");

function GetHash(string) {
    var hash = 0;
    for(var i = 0; i < string.length; i++)
        hash += string.charCodeAt(i) * (1 << (string.length - i));
    return hash;
}



var result = [];
var newStr = str.substr(0, subs.length);
var subsHash = GetHash(subs);
var strHash = GetHash(newStr);  
collision = 0;
count = 0;

var power = 1 << subs.length;



 
start = new Date().getTime();

for(var i = 0; i <= str.length - subs.length; i++) {
    if(subsHash == strHash) {
        if (equal(str, subs, i)) { //Вхождение
            flag = 1;
            count++;
            if(count < 11)
                WScript.StdOut.Write((i + 1) + ' ');
        } else {
            collision++;
        }
    }

    strHash -= str.charCodeAt(i) * power;    
    strHash = strHash * 2 + str.charCodeAt(i + subs.length) * 2;
}

еnd = new Date().getTime();
realTime = еnd - start;
  if (flag == 1) {
      WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
      WScript.Echo("Ammount of collision: " + collision);
      WScript.Echo("Number of occurrences: "+ count);
    } else {
        WScript.Echo('No substrs found!');
        WScript.Echo("\n" + 'I used '+ realTime +' milliseconds');
    }
