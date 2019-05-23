window.billReceiveCreateComponent = Vue.extend({
	template:
		`
			<!-- @submit é a abreviação de v-on:submit-->
			<form name="form" @submit.prevent="submit" :form-type="formType">
				<label>Vencimento</label>
				<input type="text" v-model="bill.date_due">
				<br/><br/>
				<label>Nome</label>
				<input type="text"v-model="bill.name">
				<br/><br/>
				<label>Valor</label>
				<input type="text" v-model="bill.value">
				<br/><br/>
				<label>Recebido?</label>
				<input type="checkbox" v-model="bill.received">
				<input type="submit" value="Enviar">
			</form>
		`,
	data: function(){
		return {
			formType:"insert",
			//limpar os dados form
			bill:{date_due:'', name:'', value: 0, received:0}
		};
	},

	created: function(){
		if(this.$route.name == 'bill-receive.update'){
			this.formType = 'update';
			this.getBill(this.$route.params.index)
		}
	},

	methods: {

		submit: function(){
			if(this.formType =="insert"){
				this.$root.$children[0].billsReceive.push(this.bill);
			}
			this.bill={date_due:'', name:'', value: 0, received:0};
			//this.router component implicito
			this.$router.go({name: 'bill-receive.list'});
		},

		getBill: function(index){
			this.bill = this.$root.$children[0].billsReceive[index];

		}
	},

	events:{
		'new-bill' : function(bill){
			this.bill = bill;
		},
	}
	
});