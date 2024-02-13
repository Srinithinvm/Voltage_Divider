document.getElementById("calc").addEventListener("click", function (event) {
                event.preventDefault();
            });


function change_Val(opt1){
    let unit=0;
	if(opt1=="mega"){
		unit=Math.pow(10,6);
	}
	else if(opt1=="kilo"){
		unit=Math.pow(10,3);
	}
	else if(opt1=="ohms"){
		unit=Math.pow(10,1);
	}
	return unit;

}


function calculate(){
    let x = document.forms["form"];
    console.log(x);
    console.log ("R1: " , x["r1"].value);
    console.log ("R2: " , x["r2"].value);
    console.log ("Vin: " , x["vin"].value);
    console.log ("Vout: " , x["vout"].value);
	console.log ("select1:", x["select1"].value);
    console.log ("select2:", x["select2"].value);
    let opt1= change_Val(x["select1"].value)
	let opt2= change_Val(x["select2"].value)
	console.log(opt1)
	console.log(opt2)
	message()
	
	}    
	
function message(){
	const r1=document.getElementById("r1").value;
	const r2=document.getElementById("r2").value;
	const vin=document.getElementById("vin").value;
	const vout=document.getElementById("vout").value;

	console.log(r1);
	console.log(r2);
	console.log(vin);
	console.log(vout);
	
	
	if((r1!="" && r2=="" && vin=="" && vout=="")|| (r1=="" && r2!="" && vin=="" && vout=="")||(r1=="" && r2=="" && vin!="" && vout=="")||(r1=="" && r2=="" && vin=="" && vout!="")){
		
		document.getElementById("para").innerHTML="**you should give two more inputs**" ;
		
	}
	else if ((r1!="" && r2!="" && vin=="" && vout=="" ) || (r1!="" && r2=="" && vin!="" && vout=="") || (r1!="" && r2=="" && vin=="" && vout!="") || (r1=="" && r2!="" && vin!="" && vout=="" )|| (r1=="" && r2!="" && vin=="" && vout!="" )||(r1=="" && r2=="" && vin!="" && vout!="" )){
		
		document.getElementById("para").innerHTML ="**you should give one more inputs**" ;
		
	}
	
	else if(r1!="" && r2!="" && vin!="" && vout!=""){
		document.getElementById("para").innerHTML ="**you should give three inputs**" ;
			
	}
	else if(r1=="" && r2=="" &&vin=="" &&vout==""){
		document.getElementById("para").innerHTML ="**please give the inputs**" ;
		
	}

	else{
		document.getElementById("para").innerHTML ="**Calculating...**";
		console.log("working.......");
		let x = document.forms["form"];
		let opt1= change_Val(x["select1"].value)
		let opt2= change_Val(x["select2"].value)
		let res=0;
		document.getElementById("R1").value = r1;
		document.getElementById("R2").value = r2;
		document.getElementById("Vin").value=vin;
		document.getElementById("Vout").value=vout;
		if(vout==""){
			res=((r2*opt2)/((r1*opt1)+(r2*opt2)))*vin;
			console.log(res);
			document.getElementById("vout").value =res.toFixed(2) ;
			document.getElementById("Vout").value=res.toFixed(2);
		}
		else if(vin==""){
			res=(vout/((r2*opt2)/((r1*opt1)+(r2*opt2))));
			console.log(res);
			document.getElementById("vin").value =res.toFixed(2) ;
			document.getElementById("Vin").value=res.toFixed(2);
		}
			
		else if(r1==""){
			res=((r2*opt2)*((vin/vout)-1));
			console.log(res/opt1);
			document.getElementById("r1").value =(res/opt1).toFixed(2) ;
			document.getElementById("R1").value=(res/opt1).toFixed(2);
		}
		else if(r2==""){
			res=(r1*opt1)*(vout/(vin-vout));
			console.log(res/opt2);
			document.getElementById("r2").value =(res/opt2).toFixed(2) ;
			document.getElementById("R2").value =(res/opt2).toFixed(2);
		}
		
		
			}
	
}
