window.billReceiveListComponent = Vue.extend({
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
					<td>{{o.value | currency "R$ " 2}}</td>
					<td :class="{ 'verde': o.received, 'vermelho':!o.received}">
						{{o.received  | receivedLable}}
					</td>
					<td>
						<a v-link="{name: 'bill-receive.update', params: {index: index} }">Editar</a>
						<a href="#" @click="deleteBill(o)">Delete</a>
					</td>
				</tr>
			</tbody>
		</table>
		`,
	data: function(){
		return {
			bills: this.$root.$children[0].billsReceive
		};
	},

	methods: {

		deleteBill: function(bill){
			if(confirm('Deseja excluir')){
				this.$root.$children[0].billsReceive.$remove(bill);
			}
		},
	},

});
