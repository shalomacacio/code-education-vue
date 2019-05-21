Vue.filter('doneLable', function(value){
	if(value == 0){
		return "NÃO PAGA"
	}else{
		return "PAGA"
	}
});

var billCreateComponent = Vue.extend({
	template:
		`
			<!-- @submit é a abreviação de v-on:submit-->
			<form name="form" @submit.prevent="submit" :form-type="formType">
				<label>Vencimento</label>
				<input type="text" v-model="bill.date_due">
				<br/><br/>
				<label>Nome</label>
				<select v-model="bill.name">
					<!-- :value é a abreviação de v-bind:value-->
					<!-- value deixa de ser apnena propriedad do DOM e passa a ser uma propriedade de ligação-->
					<option v-for="o in names" :value="o">{{o}}</option>
				</select>
				<br/><br/>
				<label>Valor</label>
				<input type="text" v-model="bill.value">
				<br/><br/>
				<label>Paga?</label>
				<input type="checkbox" v-model="bill.done">


				<input type="submit" value="Enviar">

			</form>
		`,
	data: function(){
		return {
			formType:"insert",
			names: [
			'Luz',
			'agua',
			'telefone',
			'supermercado',
			'cartao',
			'emprestimo',
			'gasolina'
			],
			//limpar os dados form
			bill:{date_due:'', name:'', value: 0, done:0}

		};
	},

	methods: {

		submit: function(){

			if(this.formType =="insert"){
				this.$dispatch('new-bill', this.bill );
			}
			this.$dispatch('change-activedview', 0)
		}
	},

	events:{
		'change-formtype' : function(formType){
			this.formType = formType;
		},
		'new-bill' : function(bill){
			this.bill = bill;
		},
	}
	
});

var billListComponent = Vue.extend({
	template:
		`
		<style>
			.verde{color: green;
			}
			.vermelho{color: red;
			}
			.cinza{color: grey;
			}
		</style>
		<table border="1">
			<tr>
				<th>#</th>
				<th>Vencimento</th>
				<th>Nome</th>
				<th>Valor</th>
				<th>Paga</th>
				<th>Ações</th>
			</tr>
			<tbody>
				<tr v-for="(index,o) in bills">
					<td>{{index +1 | pluralize 'item'}}</td>
					<td>{{o.date_due }}</td>
					<td>{{o.name | uppercase  }}</td>
					<td>{{o.value | currency "R$ " 4}}</td>
					<td :class="{ 'verde': o.done, 'vermelho':!o.done}">
						{{o.done  | doneLable}}
					</td>
					<td>
						<a href="#" @click="loadBill(o)">Editar</a>
						<a href="#" @click="deleteBill(o)">Delete</a>
					</td>
				</tr>
			</tbody>
		</table>
		`,
	data: function(){

		return {
			bills:
			[
				{date_due:'20/02/2012', name:'Luz', value: '25.99', done:0},
				{date_due:'20/02/2012', name:'agua', value: '79.99', done:0},
				{date_due:'20/02/2012', name:'telefone', value: '55.99', done:0},
				{date_due:'20/02/2012', name:'supermercado', value: '250.99', done:0},
				{date_due:'20/02/2012', name:'cartao', value: '625.99', done:1},
				{date_due:'20/02/2012', name:'emprestimo', value: '235.99', done:0},
				{date_due:'20/02/2012', name:'gasolina', value: '245.99', done:0}
			], 
		};
	},

	methods: {

		loadBill: function(bill){
			this.$dispatch('change-bill', bill);
			this.$dispatch('change-activedview', 1);
			this.$dispatch('change-formtype', "update");
		},

		deleteBill: function(bill){
			if(confirm('Deseja excluir')){
				this.bills.$remove(bill);
			}
		},
	},

	events:{
		'new-bill':function(bill){
			this.bills.push(bill);
		}
	}
});

var menuComponent = Vue.extend({

	template:
		`
		<nav>
			<ul>
				<li v-for="o in menus">
					<!-- @click é a abreviação do evento v-on:click-->
					<a href="#" @click.prevent="showView(o.id)">{{o.name}}</a>
				</li>
			</ul>
		</nav>
		`,
	data: function(){

		return {
			menus:
			[
				{id:0, name:"Listar Conta"},
				{id:1, name:"Criar Contas"}
			]
		};
	},

	methods:{
		showView: function(id){
			this.$dispatch('change-activedview', id);
			//outra forma abaixo 
			//this.$root.$children[0].activedView = id
			if(id == 1){
				this.$dispatch('change-formtype', "insert");
			}
		},
	},
});


var appComponent = Vue.extend({

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

		<!-- bill-list-->
		<div v-show="activedView == 0">
		<bill-list-component v-ref:bill-list-component ><bill-list-component>
		</div>
		<!-- end bill-list-->
		<div v-show="activedView == 1">
		<bill-create-component :bill.sync="bill" ></bill-create-component>
		</div>
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
	// especie de listener 
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

Vue.component('app-component', appComponent);
var app = new Vue({
	//definir elemento html -no caso body
	el:"#app",
});


