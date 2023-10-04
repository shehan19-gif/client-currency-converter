// get table head and table body

const thead = document.querySelector('.dot-head');
const tbody = document.querySelector('.dot-body');

// table head template

const headHTML = 
`<tr>
	<th>
		<div class="currency-flag currency-flag-{%code-flag%} currency-flag-l"></div>
		<p class="latest-code">{%code%}</p>
		<p class="latest-code-value">1.000000</p>
	</th>
</tr>`;

const bodyHTML = 
`
<tr>
	<td>
		<div class="flag-container">
			<div class="currency-flag currency-flag-{%code-flag%} currency-flag-sm"></div>
		</div>
		<p class="latest-code">{%code%}</p>
		<p class="latest-code-value">{%code_value%}</p>
	</td>
</tr>`;

setTimeout(function() {
	clickedButton();
	latestRates();
}, 1000);
/*window.document.body.onload= function() {
	clickedButton();
};*/

// access to currency-list clicked item

function clickedButton() {
	const symbolBtn = document.querySelectorAll('.symbol');

	symbolBtn.forEach(function(btn) {
		btn.onclick = function() {
			const currencyId = btn.id;
			latestRates(currencyId);
			console.log(currencyId);
		}
	})
	
}

function latestRates(id = 'USD') {
	console.log(id);
	// get rates
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://currency-converter-api-5c3y.onrender.com/latest/' + id, true);
	xhr.onload = function() {
		if(this.status == 200 && this.readyState == 4) {
			const jsonData = JSON.parse(this.responseText);

			console.log(jsonData);
			
			// table head set
			let convertedTableHead = headHTML.replace(/{%code%}/g, id);
			convertedTableHead = convertedTableHead.replace(/{%code-flag%}/g, id.toLowerCase());
			thead.innerHTML = convertedTableHead;
			
			// table body set
			let tableBodyDataGather = '';
			
			for(let rate in jsonData.rates) {
				let tableBodyData = bodyHTML.replace(/{%code%}/g, rate);
				tableBodyData = tableBodyData.replace(/{%code-flag%}/g, rate.slice(3).toLowerCase());
				tableBodyData = tableBodyData.replace(/{%code_value%}/g, jsonData.rates[rate]);
				tableBodyDataGather += tableBodyData;
				// console.log(jsonData.rates[rate]);
			}
			
			tbody.innerHTML = tableBodyDataGather;
		}
	};
	xhr.send();
}