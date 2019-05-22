 window.appComponent = Vue.extend({

	components: {
		'menu-component': menuComponent,
		'bill-list-component': billListComponent,
		'bill-create-component': billCreateComponent
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
			activedView: 1, 
		};
	},

	computed: {
		status: function(){
			var count= 0;

			//console.log(this.$refs.billListComponent.bils.length);
			var billListComponent = this.$refs.billListComponent;
			if(billListComponent.bills.length <= 0 ){
				return " Nenhuma conta cadastrada"
			}

			for (var i in billListComponent.bills){
				if(!billListComponent.bills[i].done){
					count++;
				}
			}
			return !count?"Nenhuma conta a pagar" : "Existem "+ count+" contas a serem pagas"
		}
	},

	methods:{},
	// listener 
	events:{
		'change-activedview' : function(activedView){
			this.activedView = activedView;
		},
		'change-formtype' : function(formType){
			this.$broadcast('change-formtype',formType);
		},
		'change-bill' : function(bill){
			this.$broadcast('change-bill', bill);
		},
		'new-bill' : function(bill){
			this.$broadcast('new-bill', bill);
		}
	}
});
