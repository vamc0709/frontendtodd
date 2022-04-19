const state = () => ({
    token: null,
    user_id: null,
    username: null,
  
    todos: [],
  })
  
  const getters = {}
  
  const mutations = {
    setUser(state, data) {
      state.token = data.token
      state.user_id = data.id
      state.username = data.username
    },
  
    setList(state, data) {
      state.todos = data
    },
  
    createTodo(state, data) {
      state.todos.unshift(data)
    },
  
    updateTodo(state, data) {
      const index = state.todos.findIndex(todo => todo.id === data.id)
      state.todos[index].title = data.title
      state.todos[index].is_completed = data.is_completed
    }
  }
  
  const actions = {
    async login({ commit }, data) {
      const res = await this.$axios.post('user/login', data)
      commit('setUser', res.data)
      this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
    },
  
    async getAllTodos({ commit, state }) {
      const res = await this.$axios.get('todo')
      commit('setList', res.data)
    },
  
    async createTodo({ commit, state }, data) {
      const res = await this.$axios.post('todo', data)
      commit('createTodo', res.data)
    },
    async deleteTodo({ commit }, data) {
      await this.$axios.delete('todo/' + data)
    },
    async addTodo({ commit }, data) {
      await this.$axios.post('todo', {
        title: data,
      })
    },
    async update({ commit }, data) {
      await this.$axios
        .put(
          'todo/' + data.id,
          { is_completed: data.is_completedd, title: data.title },
          {
            headers: {
              Authorization: 'Bearer ' + this.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res)
          console.log('called')
          commit("updateTodo", data)
        })
    },
  }
  
  export default {
    state,
    getters,
    mutations,
    actions,
  }
  