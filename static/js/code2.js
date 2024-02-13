document.getElementById("store_inputs").addEventListener("submit",function(e){
    e.preventDefault();
} )
function submit_form(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
    }
    };
    let storeform = document.getElementById("store_inputs");
    let r1 = storeform['R1'];
    let r2 = storeform['R2'];
    let vin = storeform['Vin'];
    let vout = storeform['Vout'];
    xhttp.open("POST","/insertdata", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("resistor1="+r1.value+"&resistor2="+r2.value+"&vin="+vin.value+"&vout="+vout.value);
   
	refresh();
}

function del(id){
    let value= document.getElementsByClassName("delbut");
    console.log(value);
    console.log("hii",id);
    let name="ruban"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
		refresh();
    }
    };
    xhttp.open("POST","/deletedata", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+id+"&name="+name);
}
	
function refresh(){
	
	var xhttp = new XMLHttpRequest();
	var datatable=document.getElementById("datatable")
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data=this .response
		let a=JSON.parse(data);
		var dataHTMLformat='<thead><tr><th> S.No </th><th> R1 </th><th> R2 </th><th> Vin </th><th> Vout </th><th> Delete </th></tr></thead>'
		a.forEach(function(item){
			
			dataHTMLformat+='<tr><td class="d"></td><td class="d">'+item['R1']+'</td><td class="d">'+item['R2']+'</td><td class="d">'+item['Vin']+' </td><td class="d">'+item['Vout']+'</td><td class="d"><input class ="delbut"type="submit" onclick="del(this.id)"value="Delete" id='+item["Id"]+ '></td></tr>'
		
		});
		datatable.innerHTML=dataHTMLformat;
    }
    };
	xhttp.open("GET","/refresh", true);
		
    xhttp.send();
	
}