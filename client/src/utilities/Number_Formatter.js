const currency_Formatter = new Intl.NumberFormat(undefined,{currency : "USD",style:"currency"})

export function FormatCurrency(number){
	return currency_Formatter.format(number);
}