var str = WScript.StdIn.ReadLine();
var subs = WScript.StdIn.ReadLine();
var alph = new Array();

//Определяем алфавит строки t
for(var i = 0; i < subs.length; i++)
    alph[subs.charAt(i)] = 0;

//В двумерном массиве del будем хранить таблицу переходов
del = new Array(subs.length + 1);
for(var j = 0; j <= subs.length; j++)
    del[j] = new Array();

//Инициализируем таблицу переходов
for(i in alph)
    del[0][i] = 0;

//Форомируем таблицу переходов
for(var j = 0; j < subs.length; j++) {
    prev = del[j][subs.charAt(j)]; 
    del[j][subs.charAt(j)] = j + 1;

    for(i in alph)
        del[j + 1][i] = del[prev][i] 
}

//Выводим таблицу переходов
for(var j = 0; j <= subs.length; j++){
    out = '';
    for(i in alph)
        out += del[j][i] + ' ';
    WScript.Echo(out)
}

var result = [];
var state = 0;

for(i = 0; i < str.length; i++) {
    if (!del[state][str.charAt(i)])
        del[state][str.charAt(i)] = 0;
    state = del[state][str.charAt(i)];

    if(state == subs.length)    
        result.push(i - subs.length + 1);
}

if (result.length == 0) 
    WScript.Echo("Not found");
else 
    WScript.Echo(result);
