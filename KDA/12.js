t='abaxabaz'
m=t.length
alph=new Array()
//Определяем алфавит строки t
for(i=0;i<m;i++)
alph[t.charAt(i)]=0
//В двумерном массиве del будем хранить таблицу переходов
del=new Array(m+1) //таблица переходов
for(j=0;j<=m;j++)
del[j]=new Array()
//Инициализируем таблицу переходов
for(i in alph)
    del[0][i]=0

//Форомируем таблицу переходов
for(j=0;j<t.length;j++){
    prev = del[j][t.charAt(j)]
    del[j][t.charAt(j)]=j+1 //от текущего преф в след.
    for(i in alph)
        del[j+1][i]=del[prev][i]
}
//Выводим таблицу переходов
for(j=0;j<=m;j++){
out=''
for(i in alph)
out+=del[j][i]+' ';
WScript.Echo(out)
}
