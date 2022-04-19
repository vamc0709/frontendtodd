<template>
  <div>
    <LoginForm v-if="token == null" />

    <div class="todo-list" v-if="todos.length > 0">
       <div>
    <input type="text" id="task" placeholder="Todo..." v-model="todo" />

      <button @click="addTodo(todo)" class="btn add">ADD</button>

    </div>

    </div>
      <TodoItem v-for="todoItem in todos" :key="todoItem.id" :item="todoItem" />
    </div>
  
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '@/components/LoginForm.vue'
import TodoItem from '@/components/Todo.vue'
export default {
  name: 'IndexPage',
  components: {
    LoginForm,
    TodoItem,
  },

  computed: {
    ...mapState(['token', 'todos']),
    // this.$store.state.token
  },

  data() {
        return {
            todo: '',
        }
    },

    methods: {

     async addTodo(todo) {
          await  this.$store.dispatch('addTodo', todo);
          await  this.$store.dispatch('getAllTodos');
        },
    }
}
</script>

<style scoped>



</style>

