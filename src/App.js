import './App.css'
import { useRoutes } from 'react-router-dom'
import { RouteConfig } from 'src/router/index'

function App() {
  return useRoutes(RouteConfig)
}

export default App
