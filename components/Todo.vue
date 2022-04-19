<template>
<div>


  <div class="todo-item">

    <input v-model="todoText" v-if="isUpdating" type="text">
    <p v-else>{{ item.title }}</p>
    <div class="btns" v-if="item.user_id == $store.state.user_id">
      <b-button v-if="!isUpdating" pill size="sm" @click="updateTodo" variant="warning">Update</b-button>
       <!-- <span><button @click="deleteTodo(task.id)" class="btn">Delete</button></span> -->
      <b-button v-if="!isUpdating" @click="deleteTodo(item.id)" class="btn" pill size="sm" variant="danger">Delete</b-button>
      <b-button v-else pill size="sm" @click="submitTodo" variant="success">Submit</b-button>
    </div>
    </div>
    </div>

</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
        return {
            todo: '',
            todoText: '',
            isUpdating: false,
        }
    },
    methods: {
      updateTodo() {
        this.isUpdating = true;
        this.todoText = this.item.title;
      },

      async submitTodo() {
        this.isUpdating = false;
        await this.$store.dispatch('update', {
          id: this.item.id,
          title: this.todoText,
          is_completed: this.item.is_completed,
        });
      },

     async addTodo(todo) {
          await  this.$store.dispatch('addTodo', todo);
          await  this.$store.dispatch('getMyTodos');
        },
     async deleteTodo(id) {
          await  this.$store.dispatch('deleteTodo', id);
          await  this.$store.dispatch('getAllTodos')
        },
      async update(id) {
         await   this.$store.dispatch('update', id);
          await   this.$store.dispatch('getMyTodos')


        },
    }

}
</script>

<style>
.todo-item {
  display: flex;
  padding: 8px 16px;
  background-color: rgb(249, 249, 249);
  border: 1px solid grey;
  border-radius: 12px;
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;
}
</style>