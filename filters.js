Vue.filter('doneLable', function(value){
	if(value == 0){
		return "NÃO PAGA"
	}else{
		return "PAGA"
	}
});

Vue.filter('receivedLable', function(value){
	if(value == 0){
		return "NÃO RECEBIDO"
	}else{
		return "RECEBIDO"
	}
});

