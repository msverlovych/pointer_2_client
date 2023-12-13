import { createBrowserRouter } from "react-router-dom"
import HomeLayout from "../Layouts/home-layout"
import { HomePage, PostPage, NotFoundPage } from "../pages"
import { ERoutes } from '../types/component-types'

export const router = createBrowserRouter([
  {
    path: ERoutes.HOME,
    element: <HomeLayout />,
    children: [
      {
        path: ERoutes.HOME,
        element: <HomePage />,
      },
      {
        path: ERoutes.POST_PAGE,
        element: <PostPage />,
      },
      {
        path: ERoutes.UNKNOWN_PATH,
        element: <NotFoundPage />
      }
    ],
  },
])

