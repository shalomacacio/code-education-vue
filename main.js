var router = new VueRouter();

router.map({
	'/bills': {
		name:'bill.list',
		component:billListComponent
	},

	'/bill/create': {
		name:'bill.create',
		component:billCreateComponent
	},
	//redirecionar para bills caso não exista a rota
	'*':{
		component:billListComponent
	}
});

router.start({
	components:{
		'app-component': appComponent
	}
}, '#app');

//redirecionar para bills caso não exista a rota
router.redirect({
	'*':'/bills'
});


/*Vue.component('app-component', appComponent);

var app = new Vue({
	//definir elemento html -no caso body
	el:"#app",
});
*/