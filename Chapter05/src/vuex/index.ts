import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {
  CurrencyConversion,
  TipCalculation
} from '../interfaces'

type HistoryEntry = CurrencyConversion | TipCalculation

const store = createStore({
  plugins: [createPersistedState()],
  state() {
    return {
      history: []
    }
  },
  mutations: {
    addToHistory(state: { history: HistoryEntry[] }, entry: HistoryEntry) {
      state.history.push(entry)
    },
    removeHistoryEntry(state: { history: HistoryEntry[] }, index: number) {
      state.history.splice(index, 1)
    },
  }
})

export default store
