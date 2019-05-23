window.dashboardComponent = Vue.extend({
	template:
		`
		<h1>Saldo: <span>{{totalReceive - totalPay | currency "R$ " 2}}<span></h1>
		<h3>Receitas: {{totalReceive | currency "R$ " 2}}<h3>
		<h3>Despesas: {{totalPay | currency "R$ " 2}}<h3>

		<table name="pays-tab" border="1">
			<tr>
				<th>#</th>
				<th>Vencimento</th>
				<th>Nome</th>
				<th>Valor</th>
			</tr>
			<tbody>
				<tr v-for="(index,o) in pays">
					<td>{{index +1 | pluralize 'item'}}</td>
					<td>{{o.date_due }}</td>
					<td>{{o.name | uppercase  }}</td>
					<td>{{o.value | currency "R$ " 2}}</td>
				</tr>
				<tr>
					<td colspan=3>Total</td>
					<td>{{totalPay}}</td>
				</tr>
			</tbody>
		</table>
		<br/>
		<table name="receive-tab" border="1">
			<tr>
				<th>#</th>
				<th>Vencimento</th>
				<th>Nome</th>
				<th>Valor</th>
				
			</tr>
			<tbody>
				<tr v-for="(index,o) in receives">
					<td>{{index +1 | pluralize 'item'}}</td>
					<td>{{o.date_due }}</td>
					<td>{{o.name | uppercase  }}</td>
					<td>{{o.value | currency "R$ " 2}}</td>
				</tr>
				<tr>
					<td colspan=3>Total</td>
					<td>{{totalReceive}}</td>
				</tr>
			</tbody>
		</table>
		`,
	data: function(){
		return {
			pays: this.$root.$children[0].billsPay,
			receives: this.$root.$children[0].billsReceive
		};
	},

	computed:{
		totalPay: function(){
			var pays = this.$root.$children[0].billsPay;	
			var sum = 0;

			pays.forEach( e => {
				sum += Number(e.value)
			} );
			return sum
			
		},

		totalReceive: function(){
			var pays = this.$root.$children[0].billsReceive;	
			var sum = 0;

			pays.forEach( e => {
				sum += Number(e.value)
			} );
			return sum
		},

	},


/*
for (var i in bills){
				if(!bills[i].done){
					count++;
				}
			}
*/

	methods: {

		deleteBill: function(bill){
			if(confirm('Deseja excluir')){
				this.$root.$children[0].billsReceive.$remove(bill);
			}
		},
	},

});
