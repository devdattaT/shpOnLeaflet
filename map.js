	var shpfile, m ;
    
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
		var selFile = files[0];
        handleFile(selFile);
    }

	
	function handleFile(file){
	var reader = new FileReader();
        reader.onload = function(e) {
            shpfile = new L.Shapefile(e.target.result,{isArrayBufer:true});
			shpfile.on("data:loaded", function (e){
				m.fitBounds(shpfile.getBounds());
			});
            shpfile.addTo(m);            
        };

        reader.onerror = function(e) {
            console.log(e);
        };
        reader.readAsArrayBuffer(file);
	
	}

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
	function init(){
	
		m = L.map('map').setView([40, -80], 4);
		
		var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			});

		OpenStreetMap_BlackAndWhite.addTo(m);
		
		m.on('layeradd', function (e){
			//console.dir(e);
		});

		
		//set up stuff
		
		var dropbox = document.getElementById("map");
        dropbox.addEventListener("dragenter", dragenter, false);
        dropbox.addEventListener("dragover", dragover, false);
        dropbox.addEventListener("drop", drop, false);
        dropbox.addEventListener("dragleave", function() {
            m.scrollWheelZoom.enable();
        }, false);

        function dragenter(e) {
            e.stopPropagation();
            e.preventDefault();
            m.scrollWheelZoom.disable();
        }

        function dragover(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function drop(e) {
            e.stopPropagation();
            e.preventDefault();
            m.scrollWheelZoom.enable();
            var dt = e.dataTransfer;
            var files = dt.files;

            var i = 0;
            var len = files.length;
            if (!len) {
                return
            }
            while (i < len) {
                handleFile(files[i]);
                i++;
            }
        }
	
	}