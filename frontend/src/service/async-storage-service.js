export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || _createBoards()
  return Promise.resolve(entities)
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  )
}

function post(entityType, newEntity) {
  newEntity = JSON.parse(JSON.stringify(newEntity))
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    newEntities = newEntities.map((entity) => ({ ...entity, _id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
  })
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// labels cls {
// 1 - #f2d600,
// 2 - #ff9f1a,
// 3 - #eb5a46,
// 4 - #e377e0,
// 5 - #0079bf,
// 6 - #51e898,
// }

function _createBoards() {
  // const boards = [
  //   {
  //     _id: 'b101',
  //     title: 'sprint 7',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  //     isStarred: true,
  //     archivedAt: 1589983468418,
  //     createdAt: 1589983468418,
  //     createdBy: {
  //       _id: 'u101',
  //       fullname: 'Abi Abambi',
  //       imgUrl: 'http://some-img',
  //     },
  //     style: { backgroundColor: 'rgb(0, 121, 191)' },
  //     labels: [
  //       {
  //         id: 'l101',
  //         title: 'Done',
  //         color: '#f2d600',
  //       },
  //       {
  //         id: 'l102',
  //         title: '',
  //         color: '#ff9f1a',
  //       },
  //       {
  //         id: 'l103',
  //         title: 'Progress',
  //         color: '#eb5a46',
  //       },
  //       {
  //         id: 'l104',
  //         title: '',
  //         color: '#e377e0',
  //       },
  //       {
  //         id: 'l105',
  //         title: '',
  //         color: '#0079bf',
  //       },
  //       {
  //         id: 'l106',
  //         title: '',
  //         color: '#51e898',
  //       },
  //     ],
  //     members: [
  //       {
  //         _id: 'u101',
  //         fullname: 'Amit Sharafi',
  //         imgUrl: '../assets/imgs/amit-profile.jpg',
  //       },
  //       {
  //         _id: 'u102',
  //         fullname: 'Ynon Chayun',
  //         imgUrl: '',
  //       },
  //       {
  //         _id: 'u103',
  //         fullname: 'Yuval Levi',
  //         imgUrl: '',
  //       },
  //     ],
  //     groups: [
  //       {
  //         id: 'g101',
  //         title: 'Group 1',
  //         archivedAt: 1589983468418,
  //         tasks: [
  //           {
  //             id: 'c101',
  //             title: 'Replace logo',
  //             members: [
  //               {
  //                 _id: 'u101',
  //                 fullname: 'Tal Tarablus',
  //                 imgUrl: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
  //               },
  //               {
  //                 _id: 'u102',
  //                 fullname: 'Ynon Chayun',
  //                 imgUrl: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg',
  //               },
  //             ],
  //           },
  //           {
  //             id: 'c102',
  //             title: 'Add Samples',
  //             members: [
  //               {
  //                 _id: 'u101',
  //                 fullname: 'Tal Tarablus',
  //                 imgUrl: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
  //               },
  //               {
  //                 _id: 'u102',
  //                 fullname: 'Ynon Chayun',
  //                 imgUrl: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
  //               },
  //             ],
  //           },
  //         ],
  //         style: {},
  //       },
  //       {
  //         id: 'g102',
  //         title: 'Group 2',
  //         tasks: [
  //           {
  //             id: 'c103',
  //             title: 'Do that',
  //             archivedAt: 1589983468418,
  //             members: [
  //               {
  //                 _id: 'u102',
  //                 fullname: 'Ynon Chayun',
  //                 imgUrl: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
  //               },
  //             ],
  //           },
  //           {
  //             id: 'c104',
  //             title: 'Help me',
  //             status: 'in-progress',
  //             description: 'description',
  //             comments: [
  //               {
  //                 id: 'ZdPnm',
  //                 txt: 'also @yaronb please CR this',
  //                 createdAt: 1590999817436.0,
  //                 byMember: {
  //                   _id: 'u101',
  //                   fullname: 'Tal Tarablus',
  //                   imgUrl:
  //                     'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
  //                 },
  //               },
  //             ],
  //             checklists: [
  //               {
  //                 id: 'YEhmF',
  //                 title: 'Checklist',
  //                 todos: [
  //                   {
  //                     id: '212jX',
  //                     title: 'To Do 1',
  //                     isDone: false,
  //                   },
  //                 ],
  //               },
  //             ],
  //             members: [
  //               {
  //                 _id: 'u101',
  //                 fullname: 'Tal Tarablus',
  //                 imgUrl: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
  //               },
  //               {
  //                 _id: 'u102',
  //                 fullname: 'Ynon Chayun',
  //               },
  //             ],
  //             labelIds: ['l101', 'l102'],
  //             createdAt: 1590999730348,
  //             dueDate: 16156215211,
  //             byMember: {
  //               _id: 'u101',
  //               username: 'Tal',
  //               fullname: 'Tal Tarablus',
  //               imgUrl:
  //                 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
  //             },
  //             style: {
  //               bgImg: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg',
  //               isCover: true,
  //               isShadow: true
  //             },
  //           },
  //         ],
  //         style: {},
  //       },
  //     ],
  //     activities: [
  //       {
  //         id: 'a101',
  //         txt: 'Changed Color',
  //         createdAt: 154514,
  //         byMember: {
  //           _id: 'u101',
  //           fullname: 'Abi Abambi',
  //           imgUrl: '../assets/imgs/amit-profile.jpg',
  //         },
  //         task: {
  //           id: 'c101',
  //           title: 'Replace Logo',
  //         },
  //       },
  //     ],
  //     // for monday
  //     cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  //   },

  //   {
  //     _id: 'b102',
  //     title: 'sprint 4',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1658276557505-a63c03fd332a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  //     isStarred: true,
  //     style: { backgroundColor: 'rgb(0, 121, 191)' },
  //   },
  //   {
  //     _id: 'b103',
  //     title: 'sprint 1',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1657089342023-13325d7bfe10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  //     isStarred: true,
  //     style: { backgroundColor: 'rgb(0, 121, 191)' },
  //   },
  //   {
  //     _id: 'b104',
  //     title: 'sprint 2',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=975&q=80',
  //     isStarred: false,
  //     style: { backgroundColor: 'rgb(0, 121, 191)' },
  //   },
  //   {
  //     _id: 'b105',
  //     title: 'sprint 4',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1656366631858-6d5ba6f5a58c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  //     isStarred: true,
  //     style: { backgroundColor: 'rgb(0, 121, 191)' },
  //   },
  //   {
  //     _id: 'b106',
  //     title: 'sprint 4',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1519010470956-6d877008eaa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
  //     isStarred: false,
  //     style: { backgroundColor: 'rgb(0, 121, 191)' },
  //   },
  // ]
  const boards = [
    {
        "_id": "b101",
        "title": "sprint 1",
        // "imgUrl": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "isStarred": true,
        "archivedAt": 1589983468418,
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgColor": "black",
            "bgCover": ""
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#f2d600"
            },
            {
                "id": "l102",
                "title": "",
                "color": "#ff9f1a"
            },
            {
                "id": "l103",
                "title": "Progress",
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
        "members": [
            {
                "_id": "u101",
                "fullname": "Amit Sharafi",
                "imgUrl": "../assets/imgs/amit-profile.jpg"
            },
            {
                "_id": "u102",
                "fullname": "Ynon Chayun",
                "imgUrl": ""
            },
            {
                "_id": "u103",
                "fullname": "Yuval Levi",
                "imgUrl": ""
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c102",
                        "title": "Add Sample ",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                        "members": [
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun"
                            }
                        ],
                        "labelIds": [
                            "l101",
                            "l102"
                        ],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgImg": "",
                            "isCover": true,
                            "isShadow": true
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "../assets/imgs/amit-profile.jpg"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ]
    },
    {
        "_id": "b102",
        "title": "sprint 2",
        "imgUrl": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "isStarred": true,
        "archivedAt": 1589983468418,
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgColor": "rgb(0, 121, 191)",
            "bgCover": ""
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#f2d600"
            },
            {
                "id": "l102",
                "title": "",
                "color": "#ff9f1a"
            },
            {
                "id": "l103",
                "title": "Progress",
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
        "members": [
            {
                "_id": "u101",
                "fullname": "Amit Sharafi",
                "imgUrl": "../assets/imgs/amit-profile.jpg"
            },
            {
                "_id": "u102",
                "fullname": "Ynon Chayun",
                "imgUrl": ""
            },
            {
                "_id": "u103",
                "fullname": "Yuval Levi",
                "imgUrl": ""
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c102",
                        "title": "Add Sample ",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                        "members": [
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun"
                            }
                        ],
                        "labelIds": [
                            "l101",
                            "l102"
                        ],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgImg": "https: //i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg",
                            "isCover": true,
                            "isShadow": true
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "../assets/imgs/amit-profile.jpg"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ]
    },
    {
        "_id": "b103",
        "title": "sprint 3",
        "imgUrl": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "isStarred": true,
        "archivedAt": 1589983468418,
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgColor": "rgb(0, 121, 191)",
            "bgCover": ""
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#f2d600"
            },
            {
                "id": "l102",
                "title": "",
                "color": "#ff9f1a"
            },
            {
                "id": "l103",
                "title": "Progress",
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
        "members": [
            {
                "_id": "u101",
                "fullname": "Amit Sharafi",
                "imgUrl": "../assets/imgs/amit-profile.jpg"
            },
            {
                "_id": "u102",
                "fullname": "Ynon Chayun",
                "imgUrl": ""
            },
            {
                "_id": "u103",
                "fullname": "Yuval Levi",
                "imgUrl": ""
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c102",
                        "title": "Add Sample ",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                        "members": [
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun"
                            }
                        ],
                        "labelIds": [
                            "l101",
                            "l102"
                        ],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgImg": "https: //i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg",
                            "isCover": true,
                            "isShadow": true
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "../assets/imgs/amit-profile.jpg"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ]
    },
    {
        "_id": "b104",
        "title": "sprint 4",
        "imgUrl": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "isStarred": true,
        "archivedAt": 1589983468418,
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgColor": "rgb(0, 121, 191)",
            "bgCover": ""
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#f2d600"
            },
            {
                "id": "l102",
                "title": "",
                "color": "#ff9f1a"
            },
            {
                "id": "l103",
                "title": "Progress",
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
        "members": [
            {
                "_id": "u101",
                "fullname": "Amit Sharafi",
                "imgUrl": "../assets/imgs/amit-profile.jpg"
            },
            {
                "_id": "u102",
                "fullname": "Ynon Chayun",
                "imgUrl": ""
            },
            {
                "_id": "u103",
                "fullname": "Yuval Levi",
                "imgUrl": ""
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c102",
                        "title": "Add Sample ",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                        "members": [
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            }
                        ]
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "https: //post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Ynon Chayun"
                            }
                        ],
                        "labelIds": [
                            "l101",
                            "l102"
                        ],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http: //res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgImg": "https: //i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg",
                            "isCover": true,
                            "isShadow": true
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "../assets/imgs/amit-profile.jpg"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ]
    }
]

  localStorage.setItem('boardDB', JSON.stringify(boards))
  return boards
}
