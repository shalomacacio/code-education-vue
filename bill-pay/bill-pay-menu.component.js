window.billPayMenuComponent = Vue.extend({

	template:
		`
		<nav>
			<ul>
				<li v-for="o in menus">
					<!-- @click é a abreviação do evento v-on:click-->
					<a v-link="{name: o.routeName}">{{o.name}}</a>
				</li>
			</ul>
		</nav>
		`,
	data: function(){

		return {
			menus:
			[
				//{id:0, name:"Listar Conta", url:'/bills'},
				//{id:1, name:"Criar Contas" , url:'/bill/create'}
				{name:"Listar Conta", routeName:'bill-pay.list'},
				{name:"Criar Contas" ,routeName:'bill-pay.create'}
			]
		};
	},
});
