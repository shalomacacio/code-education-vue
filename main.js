var router = new VueRouter();

var mainComponent = Vue.extend({
	components: {
		'bill-component': billComponent
	},
	template: '<bill-component></bill-component>',

	data: function(){
		return {
		billsPay:
			[
				{date_due:'20/02/2012', name:'Luz', value: '25.99', done:0},
				{date_due:'20/02/2012', name:'agua', value: '79.99', done:0},
				{date_due:'20/02/2012', name:'telefone', value: '55.99', done:0},
				{date_due:'20/02/2012', name:'supermercado', value: '250.99', done:0},
				{date_due:'20/02/2012', name:'cartao', value: '625.99', done:1},
				{date_due:'20/02/2012', name:'emprestimo', value: '235.99', done:0},
				{date_due:'20/02/2012', name:'gasolina', value: '245.99', done:0}
			], 

		billsReceive:
			[
				{date_due:'20/02/2012', name:'dev-site', value: '800.00', received:0},
				{date_due:'20/02/2012', name:'dev-sitema-contas', value: '8000.00', received:0},
				{date_due:'20/02/2012', name:'manutencao-site', value: '80.00', received:0},
				{date_due:'20/02/2012', name:'salario', value: '1800.00', received:0},
				{date_due:'20/02/2012', name:'freelance', value: '400.00', received:0},
				
			], 
		};
	}
});

router.map({

	'/':{
		name:'dashboard',
		component: dashboardComponent
	},

	'/bill-pays': {
		component: billPayComponent,
		subRoutes:{

			'/': {
				name:'bill-pay.list',
				component: billPayListComponent
			},

			'/create': {
				name:'bill-pay.create',
				component: billPayCreateComponent
			},

			'/:index/update': {
				name:'bill-pay.update',
				component: billPayCreateComponent
			}
		}
	},

	'/bill-receives': {
		component: billReceiveComponent,

		subRoutes: {
			'/': {
				name:'bill-receive.list',
				component: billReceiveListComponent
			},
			'/create': {
				name:'bill-receive.create',
				component: billReceiveCreateComponent
			},

			'/:index/update': {
				name:'bill-receive.update',
				component: billReceiveCreateComponent
			},
		}
	},
});

router.start({
	components: {
		'main-component': mainComponent
	}
}, '#app');


//redirecionar para bills caso não exista a rota
router.redirect({
	'*':'/bill-pays'
});

