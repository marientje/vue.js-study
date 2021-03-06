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
    todoTitle: '<span style="color:blue;">TODO List</span>',
    message: 'Have a nice day!'
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
  },
  // 算出プロパティ
  computed: {
    reversedMessage: function() {
      return this.message.split('').reverse().join('')
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

var taxApp = new Vue({
  el: '#tax_app',
  data: {
    basePrice: 100
  },
  computed: {
    taxIncludedPrice: {
      get: function() {
        return parseInt(this.basePrice * 1.10)
      },
      set: function(taxIncludedPrice) {
        this.basePrice = Math.ceil(taxIncludedPrice / 1.10)
      }
    }
  },
  // 監視プロパティ
  watch: {
    basePrice: {
      handler: function(newValue, oldValue) {
        console.log('new: %s, old: %s', newValue, oldValue)
      },
      // 初期読み込み時にも監視プロパティを呼び出す
      immediate: true
      // ネストされたオブジェクトも監視する場合は設定
      // deep: true
    }
  }
})

var qiitaSearch = new Vue({
  el: '#qiita_search',
  data: {
    items: null,
    keyword: '',
    message: ''
  },
  watch: {
    keyword: function(newKeyword, oldKeyword) {
      // console.log(newKeyword)
      this.message = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }

  },
  created: function() {
    // this.keyword = 'Javascript'
    // this.getAnswer()
    // 1000ミリ秒内に同じイベントが発生する場合は処理を実行しない
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  methods: {
    getAnswer: function() {
      if(this.keyword === '') {
        this.items = null
        this.message = ''
        return
      }

      this.message = 'Loading...'
      var vm = this
      var params = { page: 1, per_page: 20, query: this.keyword }
      axios.get('https://qiita.com/api/v2/items', { params })
        .then(function(response){
          console.log(response)
          vm.items = response.data
        })
        .catch(function(error) {
          vm.message = 'Error!' + error
        })
        .finally(function(){
          vm.message = ''
        })
    }
  }
})
