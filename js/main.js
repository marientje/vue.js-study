// global filter
Vue.filter('numberFormat', function(value) {
  // 整数部分を3桁毎に区切り文字を挿入した形式で文字列に変換
  return value.toLocaleString()
})
Vue.filter('readMore', function(text, max_length, suffix){
  if(text.length > max_length) {
    return text.substring(0, max_length) + suffix
  } else {
    return text
  }
})

var todoApp = new Vue({
  el: '#todo_app',
  data: {
    newItem: '',
    todos: [],
    todoTitle: '<span style="color:blue;">TODO List</span>'
  },
  methods: {
    addItem: function(e) {
      if(this.newItem == '') return

      var todo = {
        item: this.newItem,
        isDone: false
      }

      this.todos.push(todo)
      this.newItem = ''
    },
    deleteItem: function(index) {
      this.todos.splice(index, 1)
    }
  } 
})

var bitcoinApp = new Vue({
  el: '#bitcoin_app',
  data: {
    bpi: null,
    hasError: false,
    loading: true
  },
  mounted: function() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(function(response){
      // console.log(response.data.bpi)
      this.bpi = response.data.bpi
    }.bind(this))
    .catch(function(error){
      console.log(error)
      this.hasError = true
    }.bind(this))
    .finally(function(){
      this.loading = false
    }.bind(this))
  },
  // local filter
  filters: {
    currencyDecimal(value) {
      return value.toFixed(2)
    }
  }
})
