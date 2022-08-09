import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home-view.vue'
import boardListView from '../views/board-list-view.vue'
import boardView from '../views/board-view.vue'
import taskDetails from '../views/task-details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/board',
      name: 'board-list',
      component: boardListView
    },
    {
      path: '/board/:boardId',
      name: 'board-view',
      component: boardView,
      children: [
        {
          path: ':groupId/:taskId',
          name: 'task-details',
          component: taskDetails,

        }
      ]      
    },
  ]
})

export default router
