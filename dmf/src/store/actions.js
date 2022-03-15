import * as miku from "../api/miku";
// export const getAllMessages = ({ commit }) => {
//   api.getAllMessages((messages) => {
//     commit("receiveAll", messages);
//   });
// };

// export const sendMessage = ({ commit }, payload) => {
//   api.createMessage(payload, (message) => {
//     commit("receiveMessage", message);
//   });
// };

// export const switchThread = ({ commit }, payload) => {
//   commit("switchThread", payload);
// };

export const getRoomInfo = async ({ commit }, roomId) => {
  uni.showLoading({
    title: "获取房间信息...",
  });
  try {
    const { data } = await miku.getRoomInfo(roomId);
    commit("updateRoom", { roomId, data });
    uni.hideLoading();
  } catch (error) {
    console.log(error);
    uni.hideLoading();
    uni.showToast({
      title: error,
      icon: "none",
      duration: 2000,
    });
  }
};
