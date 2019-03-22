<template>
  <div>
    <div class="alert" v-bind:class="{ budgetLimit: budgetLimit }">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      You have reached the limit!
    </div>
    <div class="budget-info">
      <table>
        <tr>
          <td>Name:</td>
          <td>{{currentBudget.name}}</td>
        </tr>
        <tr>
          <td>Remaining budget:</td>
          <td>{{this.remainingBudget}}</td>
        </tr>
        <tr>
          <td>Maximum transaction amount:</td>
          <td>{{this.maxTransaxtion}}</td>
        </tr>
        <tr>
          <td>Minimum transaction amount:</td>
          <td>{{this.minTransaction}}</td>
        </tr>
        <tr>
          <td>Average transaction amount:</td>
          <td>{{this.avaregeTransaction}}</td>
        </tr>
      </table>
    </div>
    <router-view/>
    <div class="add-budget">
      <div class=".add-budget-labell"><Add budget:</div>
      <table>
        <tr>
          <td>
            Name of budget:
            <input placeholder="Please input the name budget" v-model="transaction">
          </td>
          <td>
            Amount:
            <input placeholder="Please input the amount" v-model="amount">
          </td>
          <td>
            Currency:
            <select v-model="currency">
              <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
            </select>
          </td>
          <td>
            <button type="primary" @click="addTransactionMethod()">Add budget</button>
          </td>
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
        <tr v-for="(transaction,i) in transactions" :key="i">
          <td>{{transaction.name}}</td>
          <td>{{transaction.currency}}</td>
          <td>{{transaction.amount}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Bugget",
  data() {
    return {
      budgetLimit: true,
      transaction: "",
      wrong: false,
      amount: 0,
      currency: "USD",
      errorMessage: "",
      options: [
        { text: "USD", value: "USD" },
        { text: "EUR", value: "EUR" },
        { text: "GBP", value: "GBP" },
        { text: "RUB", value: "RUB" },
        { text: "UAH", value: "UAH" }
      ],
      list: [],
      coefficient: 1
    };
  },
  computed: {
    transactions() {
      return this.$store.getters.getTransactionsByBudgetId(
        this.$route.params.i
      );
    },
    currentBudget() {
      return this.$store.getters.getBudgetById(this.$route.params.i)[0];
    },
    maxTransaxtion() {
      let maxTransaxtion = 0,
        budgetMaxTransaction;
      budgetMaxTransaction = Math.max.apply(
        Math,
        this.transactions.map(function(o) {
          return o.amount;
        })
      );
      if (budgetMaxTransaction < maxTransaxtion) {
        return maxTransaxtion;
      } else {
        return budgetMaxTransaction;
      }
    },
    minTransaction() {
      let minTransaxtion = 0,
        budgetMinTransaction;
      budgetMinTransaction = Math.min.apply(
        Math,
        this.transactions.map(function(o) {
          return o.amount;
        })
      );
      if (!isFinite(budgetMinTransaction)) {
        return minTransaxtion;
      } else {
        return budgetMinTransaction;
      }
    },
    avaregeTransaction() {
      let numberTransactions = 0,
        SumTransactions = 0,
        currencyBudget;
      currencyBudget = this.currentBudget.currency;
      numberTransactions = this.transactions.length;
      this.transactions.forEach(function(arrayItem) {
        SumTransactions =
          parseInt(SumTransactions) + parseInt(arrayItem.amount);
      });
      if (SumTransactions >= 1 || numberTransactions >= 1) {
        return (SumTransactions / numberTransactions).toFixed(2);
      } else {
        return 0;
      }
    },
    remainingBudget() {
      let currencyConverter = (currencyBudget, currencyTransaction) => {
        let url;
        if (currencyBudget != "UAN" || currencyTransaction != "UAN") {
          url = "https://api.exchangeratesapi.io/latest?base=" + currencyBudget;
          axios
            .get(url)
            .then(response => {
              this.list = response.data.rates;
              this.coefficient = this.list["GBP"];
            })
            .catch(error => {
              this.repos = error.response.statusText;
            });
        } else {
          this.coefficient = 1; // uan not exist in api list
          console.log("uan not exist in api list");
        }
        return this.coefficient;
      };
      setTimeout(currencyConverter, 30000);
      let sumTransactions = 0,
        balance = 0,
        currencyB;
      currencyB = this.currentBudget.currency;
      this.transactions.forEach(function(arrayItem) {
        if (currencyB != arrayItem.currency) {
          sumTransactions =
            parseInt(sumTransactions) +
            currencyConverter(currencyB, arrayItem.currency) *
              parseInt(arrayItem.amount);
        } else {
          sumTransactions =
            parseInt(sumTransactions) + parseInt(arrayItem.amount);
        }
      });
      balance = parseInt(this.currentBudget.amount) - sumTransactions;
      if (balance < 0) {
        this.budgetLimit = false;
      }
      return (parseInt(this.currentBudget.amount) - sumTransactions).toFixed(2);
    }
  },
  methods: {
    ...mapActions([
      "addTransaction",
      "deleteTrabsaction",
      "changeTransactionState"
    ]),
    addTransactionMethod() {
      let myId = Math.max.apply(
        Math,
        this.transactions.map(function(o) {
          return o.uuid;
        })
      );
      myId = ++myId;
      if (myId < 0) {
        myId = 1;
      }
      const transaction = {
        id: 1,
        name: this.transaction,
        amount: this.amount,
        currency: this.currency,
        uuid: myId,
        budgetId: this.$route.params.i
      };

      this.addTransaction({ transaction });
      this.transaction = "";
      this.amount = 0;
      this.currency = "USD";
    },

    removeTransaction(item) {
      this.deleteTransaction({ transaction: item });
    },

    completeTransaction(item) {
      this.changeTransactionState({ transaction: item });
    }
  }
};
</script>
<style>
</style>