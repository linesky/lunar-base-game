var fs = require("fs"); 
var nt = require("net");
var atm_id=Array(1500);
var atm_value=Array(1500);
var atm_id_count=1;
var srv=nt.createServer();
srv.on("connection",Connection);

srv.listen(8080,function(){
	console.log("lunar base game simulates server")
});

function Connection(connection){
connection.on('data',onData);
connection.on('close',onClose);
connection.on('error',onError);
	function onData(data){
		var vv="";
		var n=0;
		var z=0;
		var t=0;
		var ref="";
		ref=connection.remoteAddress.toString();
		vv=data.toString();
		for (n=0;n<atm_id_count;n++){
			if(ref==atm_id[n]){
				z=1;
				t=atm_value[n];
				if(vv=="start\n")t=0;
				t=t+(Math.random()*3000-1500);
				atm_value[n]=t;
				connection.end("	="+t.toString());
				console.log(ref+t.toString());
			}
		}
		if(z==0){
			atm_id[atm_id_count]=ref
			atm_value[atm_id_count]=0.00;
			atm_id_count++;
			connection.end("	="+"0.00");
			console.log(ref+"  =0.00");
		}
		
		
	}
	function onClose(){
		connection.destroy();
	}
	function onError(data){
		console.log(data);
		connection.destroy();
	}



}
