import Layout from '../components/layout/Index'
import Home from '../components/pages/Home/Index'
import Rooms from '../components/pages/Rooms/Index'
import About from '../components/pages/About/Index'
import Blog from '../components/pages/Blog/Index'
import Contact from '../components/pages/Contact/Index'
import Restaurants from '../components/pages/Restaurants/Index'
import Login from '../components/pages/Login/Index'
import Register from '../components/pages/Register/Index'





const routes=[
    {
        path: "/",
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/rooms",
                element:<Rooms/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/blog",
                element:<Blog/>
            },
            {
                path:"/restaurants",
                element:<Restaurants/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
        ]
    }
]

export default routes