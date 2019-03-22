<template>
<div>
        <div class="budget-info"></div>
        <router-view/>
         <div class="add-budget">
          <div class=".add-budget-labell"><Add budget: </div>
            <table>
                <tr>
                  <td>
                      Name of budget: 
                      <input placeholder="Please input the name budget"
                              v-model="budget"></td>
                  <td>Amount: <input placeholder="Please input the amount"
                    v-model="amount" ></td>
                  <td>Currency: <select v-model="currency">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select></td>
                  <td><button type="primary"
                       @click="addBudgetMethod()">Add budget</button></td>
                </tr>
                </table>
        </div>
        <div class="budget-list">
                <table>
                        <tr>
                          <th>Name</th>
                          <th>Сurrency</th>
                          <th>Amount</th>
                        </tr>
                        <tr v-for="(budget,i) in budgets" :key="i" @click="goTodetail(budget.uuid)">
                          <td>{{budget.name}}</td>
                          <td> {{budget.currency}}</td>
                          <td>{{budget.amount}}</td>
                        </tr>
                      </table>
        </div></div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Budgets',
        data() {
            return {
                budget: '',
                wrong: false,
                amount: 0,
                currency:'USD',
                errorMessage: '',
                    options: [
      { text: 'USD', value: 'USD' },
      { text: 'EUR', value: 'EUR' },
      { text: 'GBP', value: 'GBP' },
      { text: 'RUB', value: 'RUB' },
      { text: 'UAH', value: 'UAH' }
    ]
            }
        },
        computed: {
            ...mapGetters({
                'budgets': 'getBudgets'
            }),

        },
        methods: {
            ...mapActions(['addBudget', 'deleteBudget', 'changeBudgetState']),
            addBudgetMethod() {
                const uuidv1 = require('uuid/v1');
                let myId = Math.max.apply(Math, this.budgets.map(function(o) { return o.uuid; }));
                myId = ++myId;
                if(myId<0){
                    myId=1;
                }
                    const budget = {
                        id: 1,
                        name: this.budget,
                        amount: this.amount,
                        currency: this.currency,
                        uuid: myId,
                    };

                    this.addBudget({budget});
                    this.budget = '';
                    this.amount = 0;
                    this.currency = 'USD',
                    this.wrong = false;
            },

            removeBudget(item) {
                this.deleteBudget({budget: item})
            },

            completeBudget(item) {
                this.changeBudgetState({budget: item})
            },
  goTodetail(i) {
    this.$router.push({name:'budget',params:{i:i}})
  }

        }
    }
</script>
<style>

</style>