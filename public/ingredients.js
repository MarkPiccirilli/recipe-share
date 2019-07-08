var appid = 'f4784748';
var appkey = '2e6e42714a49946a628cd94d888b9fcf';

var count = 0;

document.addEventListener('DOMContentLoaded', ingredientSearch);

function ingredientSearch() {
    document.getElementById('addIngredient').addEventListener('click', function(event) {
	var req = new XMLHttpRequest();
    var newIngredient = document.getElementById('newIngredient').value;
    
    //req.open('GET', 'https://api.nutritionix.com/v1_1/search/' + newIngredient + '?results=0:1&fields=item_name,nf_serving_size_qty,nf_serving_size_unit,nf_calories,nf_total_fat,nf_colesterol,nf_sodium,nf_total_carbohydrate,nf_sugars,nf_protein&appId=' + appid + '&appKey=' + appkey, true);
    req.open("GET", "http://localhost:3001/?newIngredient=" + newIngredient);
	req.addEventListener('load', function() {
	    if(req.status >= 200 && req.status < 400) {
            console.log("respond test 3");
            var response = JSON.parse(req.responseText);
            console.log(response);
            console.log(response.hits[0].fields.item_name);
            var nfacts = response.hits[0].fields;
            console.log(nfacts);

            var newRow = document.createElement('tr');
            
            var newCell = document.createElement('td');
            newCell.textContent = nfacts.item_name;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_serving_size_qty;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_serving_size_unit;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newInput = document.createElement('input');
            newInput.type = 'text';
            newCell.appendChild(newInput);
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_calories;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_total_fat;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_colesterol;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_sodium;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_total_carbohydrate;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_sugars;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            newCell.textContent = nfacts.nf_protein;
            newRow.appendChild(newCell);

            newCell = document.createElement('td');
            var newDeleteButton = document.createElement('button');
            newDeleteButton.textContent = 'delete';
            newDeleteButton.onclick = function() {
                var tableR = document.getElementById('ingredientTable');
                tableR.deleteRow(this);
            };
            newCell.appendChild(newDeleteButton);
            newRow.appendChild(newCell);


            document.getElementById('ingredientTable').appendChild(newRow);
	    }
	    else {
		    console.log("Error in network request: " + req.statusText);
	    }
    });
    
	req.send(null);
	event.preventDefault();
    });
}




