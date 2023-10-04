// utility links

const SYMBOLS_LINK = 'https://currency-converter-api-5c3y.onrender.com/list';

// access to dom symbols section

const domSymbols = document.getElementById('symbols');

// get positions

const baseSelect = document.getElementById('baseSelect');
const dependSelect = document.getElementById('dependSelect');

// option template

const optionCode = `<option value="{%code%}">{%code%}</option>`;
const optionCodeSelected = `<option value="{%code%}" selected>{%code%}</option>`;

// get symbols

async function getCurrencySymbols() {
	
	// currency flag HTML code

	let flagTemplate = 
	`<div class="symbol" id="{%code%}">
		<div class="currency-flag currency-flag-{%flag-code%} currency-flag-sm"></div>
		<p>{%code%}</p>
	</div>`;
	
	const symbols = await fetch(SYMBOLS_LINK);
	const jsonData = await symbols.json();
	const data = jsonData.symbols;
	let newFlagTemplate = '';
	let baseAllOptions = '';
	let dependAllOptions = '';
	for(const symbol in data) {
		// base select
		if(data[symbol].code == 'USD') {
			baseAllOptions += optionCodeSelected.replace(/{%code%}/g, data[symbol].code);
		}else{
			baseAllOptions += optionCode.replace(/{%code%}/g, data[symbol].code);
		}
		
		// depend select
		if(data[symbol].code == 'EUR') {
			dependAllOptions += optionCodeSelected.replace(/{%code%}/g, data[symbol].code);
		}else{
			dependAllOptions += optionCode.replace(/{%code%}/g, data[symbol].code);
		}
		
		let code = flagTemplate.replace(/{%code%}/g, data[symbol].code);
		code = code.replace(/{%flag-code%}/g, data[symbol].code.toLowerCase());
		newFlagTemplate += code;
	}
	
	domSymbols.innerHTML = newFlagTemplate;
	baseSelect.innerHTML = baseAllOptions;
	dependSelect.innerHTML = dependAllOptions;
}

getCurrencySymbols();