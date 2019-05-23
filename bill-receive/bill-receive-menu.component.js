window.billReceiveMenuComponent = Vue.extend({

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
				{name:"Listar Rececimento", routeName:'bill-receive.list'},
				{name:"Criar Recebimento" ,routeName:'bill-receive.create'}
			]
		};
	},
});
