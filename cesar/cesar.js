var FSO = new ActiveXObject("Scripting.FileSystemObject");
var input = FSO.OpenTextFile("input.txt").ReadAll();
outputFile = FSO.CreateTextFile("output.txt");
var tableFile = FSO.OpenTextFile("global_frequency_table.txt");
var str = tableFile.ReadLine();

var alphabet = "";
var globalTable = [];

while (str != ".") {
    var symbFrequencyPair = str.split(' ');
    alphabet += symbFrequencyPair[0];   
    globalTable[symbFrequencyPair[0]] = symbFrequencyPair[1];
    str = tableFile.ReadLine();
} 

WSH.Echo("Enter shift:");
var userShift = Number(WScript.StdIn.ReadLine()) % alphabet.length;
 
////////////////////////////////////////////////////////////////////////////////////////////////
//Encode
if (userShift < 0) {
    userShift %= alphabet.length;
    userShift += alphabet.length;
} else
    userShift %= alphabet.length;

WSH.Echo("real shift:", userShift);

for (var i = 0; i < input.length; i++) {
    var symbol = input.charAt(i);
    if (alphabet.indexOf(symbol) != -1)
        outputFile.Write(alphabet.charAt(
            (alphabet.indexOf(symbol) + userShift) % alphabet.length));
    else
        outputFile.Write(symbol);
}
///////////////////////////////////////////////////////////////////////////////////////////////

var strToDecode = FSO.OpenTextFile("output.txt").ReadAll();

 ////////////////////////////////////////////////////////////////////////////////////
 //вычисление shift раскодирования строки
var localFrequencyTable = [];
 
   for (var i = 0; i < alphabet.length; i++) {         
       localFrequencyTable[alphabet.charAt(i)] = 0;
   }
 
   for (var i = 0; i < strToDecode.length; i++) {      
       var symbol = strToDecode.charAt(i);
       if (localFrequencyTable[symbol] != undefined) {
           localFrequencyTable[symbol]++;
       }
   }
 
   for (var i = 0; i < alphabet.length; i++) { 
       var symbol = alphabet.charAt(i);
       localFrequencyTable[symbol] /= strToDecode.length;
   }
    
   var min = Number.MAX_VALUE;
   var foundShift = 0;
   var difference = 0;
   var square = 0; 

   for (var shift = 0; shift < alphabet.length; shift++) { 
       square = 0;   
       for (var i = 1; i < alphabet.length; i++) {
           difference = globalTable[alphabet.charAt((i + shift) % alphabet.length)] - localFrequencyTable[alphabet.charAt(i)];
           square += difference * difference;
       }
       if (square <= min) {
           min = square;
           foundShift = shift;
       }
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////
   foundShift -= alphabet.length;
   WSH.Echo("Shift from decoding:", foundShift);

   outputFile.WriteLine("\n\n\n\n");   
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//decode    
if (foundShift < 0) {
        foundShift %= alphabet.length;
        foundShift += alphabet.length;
    } else 
        foundShift %= alphabet.length;
   
    for (var i = 0; i < strToDecode.length; i++) {
        var symbol = strToDecode.charAt(i);
        if (alphabet.indexOf(symbol) != -1)
            outputFile.Write(alphabet.charAt(
                (alphabet.indexOf(symbol) + foundShift) % alphabet.length));
        else
            outputFile.Write(symbol);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
