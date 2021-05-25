	var a = new ActiveXObject("Scripting.FileSystemObject");
	var f = a.OpenTextFile(WSH.Arguments(0)); 
	var m = new Array(); 
	var link; 

	while (!f.AtEndOfStream) { 
		var t = f.ReadLine();
		m = m.concat(t.split(' '));
	}

	var ip = 0; //Регистр IP
	while (true) { //Цикл процессора
		switch (m[ip]) { //Попытка найти знакомую процесору команду
			case 'input': 
				m[m[ip+1]] = WScript.StdIn.ReadLine();
				if ((m[m[ip+1]] % 1 != 0) || (m[m[ip+1]] < 0)) {
					WScript.Echo("Incorrect value");
					WScript.Quit();
				}
				if (WSH.Arguments(0) == ".\\faktorial.txt" || WSH.Arguments(0) == "faktorial.txt" ) {
					if (m[m[ip+1]] > 169) {
						WScript.Echo("It is very long for me");
						WScript.Quit();
					}
				}
				m[m[ip+1]] = parseInt(m[m[ip+1]]);
				ip++;
				break;
			case 'output': //Вывод
				WScript.Echo(m[m[ip+1]]);
				ip++;
				break;
			case 'plus': //Сложение
				m[m[ip+3]] = parseInt(m[m[ip+1]])+parseInt(m[m[ip+2]]);
				ip += 3;
				break;
			case 'minus': //Вычитание
				m[m[ip+3]] = parseInt(m[m[ip+1]])-parseInt(m[m[ip+2]]);
				ip += 3;
				break;
			case 'multiply': //Умножение
				m[m[ip+3]] = parseInt(m[m[ip+1]])*parseInt(m[m[ip+2]]);
				ip += 3;
				break;
			case 'divide': //Деление
				m[m[ip+3]] = parseInt(m[m[ip+1]])/parseInt(m[m[ip+2]]);
				ip += 3;
				break;
			case 'goto': //Безусловный переход на метку с определенным ID
				link = m[ip+1];
				ip = 0;
				while ((m[ip+1] != "link") || (m[ip+2] != link)) {
					ip++;
				}
				ip += 2;
				break;
			case 'quit': //Выход из программы
				WScript.Quit();
				break;
			case 'equal': //Условный переход при x=y
				if (m[m[ip+1]] == m[m[ip+2]]) {
					link = m[ip+3];
					ip = 0;
					while ((m[ip+1] != "link") || (m[ip+2] != link)) {
						ip++;
					}
					ip += 2;
				} else {
					ip += 3;
				}
				break;
			case 'less': //Условный переход при x<y
				if (m[m[ip+1]] < m[m[ip+2]]) {
					link = m[ip+3];
					ip = 0;
					while ((m[ip+1] != "link") || (m[ip+2] != link)) {
						ip++;
					}
					ip += 2;
				} else {
					ip += 3;
				}
				break;
			}	
		if (ip - m.length > 0) {	//Увеличение IP
			ip = 0;
		} else {
			ip++;
		} 
	}