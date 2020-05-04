var todoApp = new Vue({
  el: '#todo_app',
  data: {
    newItem: '',
    todos: []
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
