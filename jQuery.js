var i = 0;

$(document).ready(function(){
    table = $('#studentList').DataTable();
} );

function addData(){
    newrow = "i_" + i++;
    var rollNumber = $('#rollNo').val();
    var stdName = $('#studentName').val();
    var birthDate = $('#birthdate').val();
    var stdanderd = $('#stdanderd').val();
	var action = `<button type="button" class="edit btn btn-success" edit-row-id=${newrow}>Edit</button>
				  <button type="button" class="delete btn btn-danger" delete-row-id=${newrow} data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>`
    
    if(validateAllField()){
		table1 = [rollNumber,stdName,birthDate,stdanderd,action];
		table.row.add(table1).draw();
        resetForm();
    }
}

function resetForm(){
	$('#namelocation1').text("");
	$('#namelocation2').text("");
	$('#namelocation3').text("");
	$('#namelocation4').text("");

	$('#rollNo').val("");
	$('#studentName').val("");
	$('#birthdate').val("");
	$('#stdanderd').val("");

	$("#add").text("Submit");
	$("#add").attr("onclick", "addData()");
};

$(document).ready(function(){
$("#listbody").on("click", ".edit", function(){
	editData = $(this).closest("tr");

    $("#rollNo").val(editData.find('td:eq(0)').text().trim());
    $("#studentName").val(editData.find('td:eq(1)').text().trim());
    $("#birthdate").val(editData.find('td:eq(2)').text().trim());
    $("#stdanderd").val(editData.find('td:eq(3)').text().trim());

    $("#add").text("Update");
    $("#add").attr("onclick", "updateData()");
	compareEditRow = $(this).attr("edit-row-id");
	});
});

function updateData(editRow){
	var updateNumber = $('#rollNo').val().trim();
	var updateName = $('#studentName').val().trim();
	var updateDate = $('#birthdate').val();
	var updateStd = $('#stdanderd').val();
	var updateAction = `<button type="button" class="edit btn btn-success" edit-row-id=${newrow}>Edit</button>
						<button type="button" class="delete btn btn-danger" delete-row-id=${newrow} data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>`
	let updateRow = $(editRow).find("td");

	updateTable	= [updateNumber,updateName,updateDate,updateStd,updateAction];

	if (updateNumber!="" && updateName!="" && updateDate!="" && updateStd!=""){
		table.row(editData).data(updateTable).draw();
		resetForm();
	}
}

$(document).ready(function(){
    $("#listbody").on("click", ".delete", function(){
        deleteRow = $(this).closest("tr");
		compareDeleteRow = $(this).attr("delete-row-id");
    });
});

function deleteData(){
	let rowDelete = deleteRow.attr("id");
	table.row(deleteRow).remove().draw();
    if (compareEditRow == compareDeleteRow) {
        resetForm();
    }
}

function validateField(errorID, inputID){
    let valid = $(`#${inputID}`).val().trim();
    if (valid == "") {
        $(`#${errorID}`).text("* Please enter your " + inputID);
        valid = false;
    }
    else{
        $(`#${errorID}`).text("");
        valid = true;
    }
    return valid;
}

function validateAllField(){
    var rnumber = validateField('namelocation1','rollNo');
    var sname = validateField('namelocation2','studentName');
    var bdate = validateField('namelocation3','birthdate');
    var stnd = validateField('namelocation4','stdanderd');
    var validAll = rnumber && sname && bdate && stnd;
    return validAll;
}