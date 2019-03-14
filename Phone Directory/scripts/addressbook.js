window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var backBtn = document.getElementById('Back');
	var quickAddFormDiv = document.querySelector('.quickaddForm');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');
	// fullname = document.getElementsByid('fullname');
	//document.getElementById("printName").innerHTML = " "+fullname;

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
	});

	backBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	// Array to Store
	var addressBook = [];

	
	function jsonStructure(fullname,phone){
		this.fullname = fullname;
		this.phone = phone;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='';
		if(isNull){
			// format the input into a valid JSON structure
			var obj = new jsonStructure(fullname.value,phone.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			showAddressBook();
			clearForm();
		}
	}

	function removeEntry(e){
		// Removeing entry from the addressbook one by one
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Looping the array addressBook and inserting into the page
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}