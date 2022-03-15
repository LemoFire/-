import { createStore } from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

const state = {
  currentRoomId: null,
  rooms: {},
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;
