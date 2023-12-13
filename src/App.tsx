import { FC, ReactElement } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/AppRouter"
const App: FC = (): ReactElement => <RouterProvider router={router} />
export default App
