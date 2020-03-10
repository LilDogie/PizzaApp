function UpdateSubtotals() {

	var sizeLabel = document.getElementById("sizes").selectedOptions[0].label.split(" ")[0];
	var pizzaDescription = sizeLabel == "Choose" ? "" : sizeLabel + " ";
	var sizeCost = parseInt(document.getElementById("sizes").value);

	document.getElementById("sizePrice").innerHTML = sizeCost > 0 ? "$" + sizeCost : "";
	
	//Calculate toppings cost and add toppings to description
	var toppings = document.getElementsByName("toppings"); 
	var toppingsCost = 0;
	for(var i = 0; i < toppings.length; i++) 
	{  
		if(toppings[i].checked)  {
			var toppingLabel = toppings[i].labels[0].innerText;
			pizzaDescription = pizzaDescription + toppingLabel + " ";
			toppingsCost = toppingsCost + parseInt(document.getElementById("topping" + (i + 1)).value);
		}
	}  
	
	var pizzaCost = sizeCost + toppingsCost;
	
	document.getElementById("toppingsSubtotal").innerHTML = "$" + toppingsCost;
	document.getElementById("pizzaTotal").innerHTML = "$" + pizzaCost;
	document.getElementById("pizzaDescription").innerHTML = pizzaDescription;

}

function AddPizzaToOrder() {

	var pizzaDescription = document.getElementById("pizzaDescription").innerHTML;
	var pizzaCost = document.getElementById("pizzaTotal").innerHTML;
	if (document.getElementById("sizes").value == 0) {
		alert("You must choose a pizza size.");
	} else {
		var i = 1;
		var orderTotal = 0;
		var maxLine = 0; //Find the last line number with a description on it, in order to know which line to update and to limit to max 5 pizzas displayed per order
		while (i <= 5) {
			var desc = document.getElementById("pizza" + i + "Desc").innerHTML;
			if (desc > "") {
				maxLine = i;
				var costString = document.getElementById("pizza" + i + "Cost").textContent
				var cost = parseInt(costString.replace(/[$,]+/g,""));
				orderTotal = orderTotal + cost;
			}
			i++;
		}
		if (maxLine == 5) {
			alert("You cannot order another pizza. There is a maximum of 5 pizzas to an order.");
		} else {
			var newLine = maxLine + 1;
			document.getElementById("pizza" + newLine + "Desc").textContent = pizzaDescription;
			document.getElementById("pizza" + newLine + "Cost").textContent = pizzaCost;
			orderTotal = orderTotal + parseInt(pizzaCost.replace(/[$,]+/g,""));
		}
		document.getElementById("orderTotal").textContent = "$" + orderTotal;				
	}				

}