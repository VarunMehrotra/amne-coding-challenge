window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', (e) => {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
          let firstLine = reader.result.split('\n')[0]
          let secondLine = reader.result.split('\n')[1]
          console.log(firstLine)
          console.log(secondLine)
					fileDisplayArea.innerText = reader.result;
				}

				reader.readAsText(file);
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}
