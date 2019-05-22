window.billCreateComponent = Vue.extend({
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