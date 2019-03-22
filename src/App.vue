<template>
  <div>
  <div><div class="menu"><div class="menu-item-main-page"><router-link to="/">Budgets</router-link></div></div>
    <div class="content">
      <router-view />
    </div>
  </div>
  </div>
</template>

<script>

</script>
<style>
  body {
    background: #F0EFE9;
    height: 100vh;
}

.budget-list table {
    border-collapse: collapse;
    width: 100%; 
 }
.budget-list td,th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 10px;
}

.content {
    background: #fff;
    box-shadow: 0 3px 15px rgba(0, 0, 0, .1);
    margin: 100px auto;
    margin-top: 0px;
    padding: 80px;
    position: relative;
    width: 60%;
}

.menu {
    flex-direction: row;
    -webkit-flex-direction: row-reverse; 
    flex-direction: row-reverse;
    -ms-box-orient: horizontal;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;

    background: #d9d6cd;
    box-shadow: 0 3px 15px rgba(0, 0, 0, .1);
    margin: 100px auto;
    margin-bottom: 0px;
    padding: 80px;
    padding-top:30px;
    padding-bottom:30px;  
    position: relative;
    width: 60%;
}

.menu-item-main-page{
    /* text-align: center; */
}

.material-icons-delete{
    color:blue;
}

.material-icons-delete-forever{
    color:red;
}

.budget-info td,th {
    border: 0px solid #dddddd;
    text-align: left;
    padding: 10px;
}

.budget-info{
    margin-bottom: 50px
}

.add-transaction table{

}

.add-transaction td,th {
    border: 0px solid #dddddd;
    text-align: left;
    padding: 10px;
}

.add-transaction-label{
    font-weight: 900;
}

.add-budget-label{
    font-weight: 900;
}
.alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}
.budgetLimit{
  display: none;
}
  </style>