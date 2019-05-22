window.billListComponent = Vue.extend({
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
