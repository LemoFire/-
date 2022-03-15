import Request from "./request";

const request = new Request();

/**
 * @description: 获取房间信息
 * @param {roomId}
 * @return {*}
 */
export const getRoomInfo = (roomId) => {
  const url = "https://api.live.bilibili.com/room/v1/Room/get_info";
  const data = {
    id: roomId,
  };
  return request.get(url, data);
};
export const getDanmakuHistory = (roomId) => {
  const url = "https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory";
  const data = {
    roomid: roomId,
  };
  return request.get(url, data);
};
export const getTopList = (roomId, ruid, page) => {
  const url = "https://api.live.bilibili.com/guard/topList";
  const data = {
    roomid: roomId,
    ruid,
    page,
  };
  return request.get(url, data);
};

/**
大家对你都很好，那也挺好的吧，唯一难过的是，我不在你的世界里。
 */


