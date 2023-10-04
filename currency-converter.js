// declare variables
let base = '';
let depend = '';

const accessToBase = document.getElementById('baseSelect');
const accessToDepend = document.getElementById('dependSelect');

// get base and depend currencies

setTimeout(function() {
	base = accessToBase.value;
	depend = accessToDepend.value;
	changeFlag(base, depend, "both");
}, 1000);

// change Flag

function changeFlag(base, depend, major) {
	// to lower case
	
	base = base.toLowerCase();
	depend = depend.toLowerCase();
	
	// flag template
	
	const baseFlagTemplate = `<div class="currency-flag currency-flag-${base} currency-flag-xl"></div>`;
	const dependFlagTemplate = `<div class="currency-flag currency-flag-${depend} currency-flag-xl"></div>`;
	
	// set templates
	
	document.getElementById('base-flag').innerHTML = baseFlagTemplate;
	document.getElementById('depend-flag').innerHTML = dependFlagTemplate;

	if(major === "base") {
		currencyConvert(document.getElementById('baseValue').value > 0? document.getElementById('baseValue').value : 1, 0);
	}else if(major === "depend") {
		currencyConvert(0, document.getElementById('dependValue').value > 0? document.getElementById('dependValue').value : 1);
	}
}

// flags on changes

accessToBase.onchange = function() {
	changeFlag(accessToBase.value, accessToDepend.value, "base");
	// currencyConvert(document.getElementById('baseValue').value, 0);
};

accessToDepend.onchange = function() {
	changeFlag(accessToBase.value, accessToDepend.value, "depend");
	// currencyConvert(0, document.getElementById('dependValue').value);
};

// values on change

document.getElementById('baseValue').onkeyup = function() {
	const baseValue = document.getElementById('baseValue').value;
	if(baseValue != '') {
		console.log(baseValue);
		currencyConvert(baseValue, 0);
	}else {
		document.getElementById('dependValue').value = '';
	}
}

document.getElementById('dependValue').onkeyup = function() {
	const dependValue = document.getElementById('dependValue').value;
	if(dependValue != '') {
		currencyConvert(0, dependValue);
	}else {
		document.getElementById('baseValue').value = '';
	}
}

// currency convert function

function currencyConvert(base, depend) {
	const baseSelect = document.getElementById('baseSelect').value;
	const dependSelect = document.getElementById('dependSelect').value;
	
	if(base != 0) {
		const dependChange = document.getElementById('dependValue');
		currencyConvertLink(baseSelect, dependSelect, base).then(result => {
			dependChange.value = Number(result.result) * Number(document.getElementById('baseValue').value);
		});
	}else if(depend != 0) {
		const baseChange = document.getElementById('baseValue');
		currencyConvertLink(baseSelect, dependSelect, depend).then(result => {
			baseChange.value = (1 / result.result) * document.getElementById('dependValue').value;
		});
	}
	
	
	//const dependValue = document.getElementById('dependValue');
	//console.log(baseSelect, dependSelect, baseValue.value);
}

// currency convert link

function currencyConvertLink(base, depend, amount) {
	// fetch data
	return fetch("https://currency-converter-api-5c3y.onrender.com/convert?from=" + base + "&to=" + depend + "&amount=" + amount).then(response => response.json());
}