 window.billReceiveComponent = Vue.extend({
 	
	components: {
		'menu-component': billReceiveMenuComponent
	},
	

	template:
		`
		<h1>{{title}} </h1>
		
		<h3 :class="{'cinza': status == 'Nenhuma conta cadastrada'}"> {{ status }} </h3>
		
		<menu-component></menu-component>
		<router-view></router-view>
		`,

	data: function(){
		
		return {
			title: "Contas a receber",
		};
	},

	computed: {
		status: function(){
			var bills = this.$root.$children[0].billsReceive;
			
			if(bills.length<=0){
				return " Nenhuma conta cadastrada"
			}
			var count= 0;
			for (var i in bills){
				if(!bills[i].received){
					count++;
				}
			}
			return !count?"Nenhuma conta a receber" : "Existem "+ count+" contas a receber"
		}
	}
});
