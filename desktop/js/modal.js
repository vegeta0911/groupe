function readTable(infoGroupe) {
	$("#activeTable tbody").empty();
	$("#inactiveTable tbody").empty();
	
	//console.log(infoGroupe.etat)
	var html = "";
	var html1 = "";
	for (i = 0; i < infoGroupe.length; i++) {
		if (infoGroupe[i][3] == 1) {
			if (infoGroupe[i][0] == 0) {
				//console.log(infoGroupe[i][9]);
				if(infoGroupe[i][9] == 1){
					html += '<tr class="line1" data-l1key="#'+infoGroupe[i][7]+'#">';
				}
				else
				{
                    html += '<tr class="line1" data-l1key="#'+infoGroupe[i][7]+'#" style="display:none;">';
				}				
				html += '<td>';
				html += ' '+ infoGroupe[i][8] +' ';
				html += '</td><td>';
				html += '<button  name= '+ infoGroupe[i][8] + ' data-id=' + infoGroupe[i][7] +  ' data-action="on" class="btn btn-success form-control actionGroup" value=' + infoGroupe[i][1] +'>' + infoGroupe[i][4] +'</button>';
				html += '</td><td>';
                html += '<button   data-id=' + infoGroupe[i][7] +' data-action="off" class="btn btn-danger form-control actionGroup" name='+ infoGroupe[i][8] +' value=' + infoGroupe[i][2] +'>' + infoGroupe[i][5] +'</button>';
                html += '</td><td>';
				html += ' '+ infoGroupe[i][6]+' ';
				html += '</td>';
				html += '</tr>';
			} 
			else 
			{ 
				if(infoGroupe[i][9] == 1){
					html1 += "<tr class='line2'>";
				}
				else
				{
					html1 += "<tr class='line2' style='display:none;'>";
				}
				html1 += " style='display:none;'><td> " + infoGroupe[i][8] + "</td><td><button  data-id='" + infoGroupe[i][7] +  "' data-action='on' name=" + infoGroupe[i][8] + " class='btn btn-success form-control actionGroup' value='" + infoGroupe[i][1] +  "'> " + infoGroupe[i][4] +   " </button></td><td><button  data-id='" + infoGroupe[i][7] +  "' data-action='off' class='btn btn-danger form-control actionGroup' name=" + infoGroupe[i][8] + " value='" + infoGroupe[i][2] +  "'> " + infoGroupe[i][5] +   "</button></td><td> " + infoGroupe[i][6] +"</td></tr>";
			}

		} 
		else 
		{
			if (infoGroupe[i][0] == 0) {
				if(infoGroupe[i][9] == 1){
					html += '<tr class="line1" data-l1key="#'+infoGroupe[i][7]+'#">';
				}
				else
				{
                    html += '<tr class="line1" data-l1key="#'+infoGroupe[i][7]+'#" style="display:none;">';
				}		
				html += "<td> " + infoGroupe[i][8] + "</td><td> " + infoGroupe[i][6] +"</td></tr>";
			} 
			else 
			{
				if(infoGroupe[i][9] == 1){
					html1 += "<tr class='line2'>";
				}
				else
				{
					html1 += "<tr class='line2' style='display:none;'>";
				}
				html1 += "<td> " + infoGroupe[i][8] + "</td><td> " + infoGroupe[i][6] +"</td></tr>";
			}			
		}
	}
	$("#activeTable tbody").append(html1);
	$("#inactiveTable tbody").append(html);	
	$('.actionGroup').on('click', function () {
		console.log('tutu');
		$.ajax({// fonction permettant de faire de l'ajax
			type: "POST", // methode de transmission des données au fichier php
			url: "plugins/groupe/core/ajax/groupe.ajax.php", // url du fichier php
			global:false,
			data: {
				action: "execCmdEq",
				id: $(this).value(),
				cmdId: $(this).attr('data-id')
			},
			dataType: 'json',
			error: function(request, status, error) {
				//handleAjaxError(request, status, error);
			},
			success: function(data) { // si l'appel a bien fonctionné
				if (data.state != 'ok') {
					$('#div_alert').showAlert({message:  data.result,level: 'danger'});
					return;
				}
                
				readTable(data.result);

			}
		});	 				
	});
}

