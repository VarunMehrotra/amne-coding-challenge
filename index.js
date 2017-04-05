window.onload = () => {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

    const stringToNumber = (array) => {
      let result = []
      array.forEach(function(string) {
        result.push(parseInt(string))
      })
      return result
    }

		const calculateSubrangeNumber = (windowOfHomeSalePrice) => {
      subrangeNumber = 0
      for (var i = 0; i < windowOfHomeSalePrice.length; i++) {
        if (windowOfHomeSalePrice[i] < windowOfHomeSalePrice[i + 1]) {
          subrangeNumber += 1;
        } else if (windowOfHomeSalePrice[i] > windowOfHomeSalePrice[i + 1]) {
          subrangeNumber -= 1;
        }
      }

      if (windowOfHomeSalePrice.every(function(element, index, array) {
        if (array[index + 1] === undefined) {
          return element;
        } else {
          return element < array[index + 1];
        }
      })) {
        subrangeNumber += 1;
      }
      return subrangeNumber;
    }

    const splitArrayIntoFixedWindows = (arrayOfHomeSalePrice, windowSize, numberOfWindows) => {
      let arrayOfWindows = [];
      for (var i = 0; i < numberOfWindows; i++) {
        arrayOfWindows.push(arrayOfHomeSalePrice.slice(i, i + windowSize))
      }
      return arrayOfWindows;
    }

		fileInput.addEventListener('change', (e) => {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onloadend = (e) => {
          
          fileDisplayArea.innerHTML = ''
          let firstLine = e.target.result.split('\n')[0]
          let secondLine = e.target.result.split('\n')[1]

          firstLineArray = stringToNumber(firstLine.split(' '))
          secondLineArray = stringToNumber(secondLine.split(' '))

          daysOfAverageHomeSalePrice = firstLineArray[0];
          fixedWindowSize = firstLineArray[1];
          windowsNeedCompute = daysOfAverageHomeSalePrice - fixedWindowSize + 1;

          fixedWindowArrays = splitArrayIntoFixedWindows(secondLineArray, fixedWindowSize, windowsNeedCompute)
          amountOfFixedWindowArrays = fixedWindowArrays.length

          if (daysOfAverageHomeSalePrice <= 200000 && fixedWindowSize <= daysOfAverageHomeSalePrice) {
            fixedWindowArrays.forEach(function (value, index) {
                fileDisplayArea.innerHTML += '<div>' + calculateSubrangeNumber(value) + '</div'
            })
        } else if (daysOfAverageHomeSalePrice < 1 || fixedWindowSize < 1) {
            fileDisplayArea.innerText = "Canot have negitive days of average home sale price or window size!";
        } else {
            fileDisplayArea.innerText = "Too many days!";
          }

				}

				reader.readAsText(file);
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}
