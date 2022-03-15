export default {
  updateRoom(state, { roomId, data }) {
    if (!state.rooms[roomId]) {
      console.log("暂无当前房间信息", data);
      creatRoom(state, roomId, data);
    } else {
      updateRoomInfo(state, roomId, data);
      console.log("更新了房间信息", state.rooms[roomId]);
    }
  },

  receiveMessage(state, message) {
    addMessage(state, message);
  },

  switchRoom(state, id) {
    setCurrentRoom(state, id);
  },
};

const creatRoom = (state, roomId, data) => {
  state.rooms = {
    ...state.rooms,
    [roomId]: {},
  };
  updateRoomInfo(state, roomId, data);
  console.log("创建了房间", state.rooms[roomId]);
};

const updateRoomInfo = (state, roomId, data) => {
  state.rooms[roomId] = {
    ...state.rooms[roomId],
    mid: data.uid,
    title: data.title,
    liveStatus: data.live_status,
    liveTime: data.live_time,
    attention: data.attention,
    messages: [],
  };
};

const addMessage = (state, message) => {};

const setCurrentRoom = (state, id) => {
  state.currentRoomId = id;
};

/**
我好像现在以什么姿态出现在你面前都不太好...
 */
