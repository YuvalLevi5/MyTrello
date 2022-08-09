// import { storageService } from './async-storage-service.js'

// const STORAGE_KEY = 'boardDB'
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_BOARD_UPDATED , SOCKET_EVENT_UPDATE_BOARD} from './socket.service'


import Axios from "axios"
const axios = Axios.create({ withCredentials: true })

export const boardService = {
  query,
  getById,
  getEmptyBoard,
  save,
  remove,
  // getTask,
  getEmptyTask,
  getEmptyGroup,
  _makeId,
  saveTask,
  getFilename,
  getEmptyBoard,
  saveFromSocket,
}

async function query() {
  // return storageService.query(STORAGE_KEY)
  try {
    return await httpService.get('board')
  } catch (err) {
    throw err
  }
}

async function getById(boardId) {
  // return storageService.get(STORAGE_KEY, boardId)
  try {
    return await httpService.get(`board/${boardId}`)
  } catch (err) {
    throw err
  }
}


async function remove(boardId) {
  // return storageService.remove(STORAGE_KEY, boardId)
  try {
    return await httpService.delete(`board/${boardId}`)
  } catch (err) {
    throw err
  }
}

async function save(board) {
  // if (board._id) {
  //   return storageService.put(STORAGE_KEY, board)
  // } else {
  //   return storageService.post(STORAGE_KEY, board)
  // }
  try {
    if (board._id) {
      const savedBoard = await httpService.put(`board/${board._id}`, board)
      // socketService.emit(SOCKET_EVENT_BOARD_UPDATED, savedBoard)
      socketService.emit(SOCKET_EVENT_UPDATE_BOARD, savedBoard)
      
      return savedBoard
    } else {
      return await httpService.post(`board`, board)
    }
  } catch (err) {
    throw err
  }
}
async function saveFromSocket(board) {
  // if (board._id) {
  //   return storageService.put(STORAGE_KEY, board)
  // } else {
  //   return storageService.post(STORAGE_KEY, board)
  // }
  try {
    if (board._id) {
      const savedBoard = await httpService.put(`board/${board._id}`, board)
      // socketService.emit(SOCKET_EVENT_BOARD_UPDATED, savedBoard)      
      return savedBoard
    } else {
      return await httpService.post(`board`, board)
    }
  } catch (err) {
    throw err
  }
}

function getEmptyTask() {
  return {
    title: '',
    description: '',
    attachments: [],
    checklists: [],
    members: [],
    style: {
      bgImg: '',
      bgColor: '',
      // isCover: true,
      isShadow: true
    },
  }
}

function getEmptyGroup() {
  return {
    title: '',
    tasks: [],
    style: {},
  }
}

function getEmptyBoard() {
  return {
    title: "",
    imgUrl: '',
    isStarred: false,
    archivedAt: '',
    createdAt: Date.now() - 100000,
    labelsOpen: false,
    style: {
      bgCover: '',
      bgColor: '#f2d600',

    },
    createdBy: {},
    labels: [
      {
        "id": "l101",
        "title": "",
        "color": "#f2d600"
      },
      {
        "id": "l102",
        "title": "",
        "color": "#ff9f1a"
      },
      {
        "id": "l103",
        "title": "",
        "color": "#eb5a46"
      },
      {
        "id": "l104",
        "title": "",
        "color": "#e377e0"
      },
      {
        "id": "l105",
        "title": "",
        "color": "#0079bf"
      },
      {
        "id": "l106",
        "title": "",
        "color": "#51e898"
      }
    ],
    members:  [
      {
        "_id": "u101",
        "fullname": "Amit Ohana",
        "imgUrl": ""
      },
      {
        "_id": "u102",
        "fullname": "Inbar Tzvik",
        "imgUrl": ""
      },
      {
        "_id": "u103",
        "fullname": "Yuval Vaknin",
        "imgUrl": ""
      }
    ],
    groups: [
      { id: _makeId(), title: "To do", tasks: [] },
      {
        id: _makeId(),
        title: "Doing",
        tasks: [],
      },
      {
        id: _makeId(),
        title: "Done",
        tasks: [],
      },
    ],
    activities: {
      
    }
  };
}


function _makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function saveTask(boardId, groupId, task, activity) {
  const board = getById(boardId)
  const group = board.groups.find((group) => group._id === groupId)
  const taskIdx = group.tasks.findIndex((currTask) => currTask._id === task._id)
  group.tasks[taskIdx] = task
}


// NOT IN USE
// function getTask({ boardId, groupId, taskId }) {
//   return query().then((boards) => {
//     return boards
//       .find((board) => board._id === boardId)
//       .groups.find((group) => groupId === group.id)
//       .tasks.find((task) => task.id === taskId)
//   })
// }

function getFilename(url) {
  const urlSplit = url.split('?');
  if (urlSplit.length > 1) {
    urlSplit.pop();
    url = urlSplit[0];
  } else url = urlSplit.pop();
  const filename = url.split('/').pop();
  return filename;
}


async function uploadImg(file) {
  // Defining our variables
  const UPLOAD_PRESET = 'ifat-unsigned' // Insert yours
  const CLOUD_NAME = 'ifats-cloud' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData();
  // Building the request body
  FORM_DATA.append('file', file)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  console.log('uploadImg -> FORM_DATA', FORM_DATA)
  // Sending a post method request to Cloudniarys' API
  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data;
  } catch (err) {
    console.error('ERROR!', err)
  }
}