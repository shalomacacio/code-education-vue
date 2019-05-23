 window.billPayComponent = Vue.extend({

	components: {
		'menu-component': billPayMenuComponent,
	},

	template:
		`
		<h1>{{title}} </h1>
		<h3 :class="{'cinza': status == 'Nenhuma conta cadastrada'}"> {{ status }} </h3>

		<menu-component></menu-component>
		<router-view></router-view>
		
		`,
	//dados estáticos para a interpolação 

	data: function(){
		
		return {
			title: "Contas a Pagar",
		};
	},

	computed: {
		status: function(){
			var bills = this.$root.$children[0].billsPay;
			//console.log(this.$refs.billListComponent.bils.length);
			
			if(bills.length<=0){
				return " Nenhuma conta cadastrada"
			}
			var count= 0;
			for (var i in bills){
				if(!bills[i].done){
					count++;
				}
			}
			return !count?"Nenhuma conta a pagar" : "Existem "+ count+" contas a serem pagas"
		}
	}
});
