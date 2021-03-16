import { createStore, Commit } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    authenticated: false,
    rows: [
      {
        title: 'On-hold',
        cards: []
    },
    {
        title: 'In progress',
        cards: []
    },
    {
        title: 'Needs rewiev',
        cards: []
    },
    {
        title: 'Approved',
        cards: []
    }
    ]
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_AUTH: (state: { authenticated: boolean}, auth: boolean) => state.authenticated = auth,
    SET_ROWS: (state: { rows: Array<any>}, newArray: Array<any>) => state.rows = newArray
  },
  actions: {
    setAuth: ({commit}: {commit: Commit}, auth: boolean) => commit('SET_AUTH', auth),
    setRows: ({commit}: {commit: Commit}, rows: Array<any>) => commit('SET_ROWS', rows)
  },
  modules: {
  }
})
