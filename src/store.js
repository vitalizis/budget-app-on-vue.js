import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('vue_state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  const loadTransactions = () => {
    try {
      const serializedState = localStorage.getItem('vue_state_transactions');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('vue_state', serializedState);
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
  }

  const saveStateTransaction = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('vue_state_transactions', serializedState);
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
  }

export default new Vuex.Store({
    state: {
        budgets: loadState() || [],
        transactions: loadTransactions() || [],

    },
    mutations: {
        addBudget(state, budget) {
            state.budgets.push(budget);
            saveState(state.budgets);
        },

        deleteBudget(state, budget) {
            state.budgets = state.budgets.filter((val) => val !== budget);
            saveState(state.budgets);
        },
        changeBudgetState(state, budget) {
            state.budgets.map((val)=> {
                if (val.name === budget.name ) {
                    const aux = !val.completed;
                    val.completed = aux;
                }
                return val;
            } )
            saveState(state.budgets);
        },
        //transactions
        addTransaction(state, transaction) {
            state.transactions.push(transaction);
            saveStateTransaction(state.transactions);
        },

        deleteTransaction(state, transaction) {
            state.transactions = state.transactions.filter((val) => val !== transaction);
            saveStateTransactionState(state.transactions);
        },
        changeTransactionState(state, transaction) {
            state.transactions.map((val)=> {
                if (val.name === transaction.name ) {
                    const aux = !val.completed;
                    val.completed = aux;
                }
                return val;
            } )
            saveStateTransaction(state.transactions);
        },
    },
    actions: {
        addBudget({commit}, {budget}) {
            commit('addBudget', budget)
        },
        deleteBudget({commit}, {budget}) {
            commit('deleteBudget', budget)

        },
        changeBudgetState({commit}, {budget}){
            commit('changeBudgetState', budget)
        },
        //transactions
        addTransaction({commit}, {transaction}) {
            commit('addTransaction', transaction)
        },
        deleteTransaction({commit}, {transaction}) {
            commit('deleteTransaction', transaction)

        },
        changeTransactionState({commit}, {transaction}){
            commit('changeTransactionState', transaction)
        }
    },
    getters: {
        getBudgets(state) {
            return state.budgets;
        },
        getTransactionsByBudgetId: state => id => {
            return state.transactions.filter(item => item.budgetId == id);
          },
        getBudgetById: state => id =>{
            return state.budgets.filter(item => item.uuid == id);
        }
    },
    
})
