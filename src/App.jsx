
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage/HomePage'
import NewPost from './pages/newpost/NewPost'
import Posts from './pages/posts/Posts'
import Post from './pages/post/Post'
import Admin from './pages/admin/Admin'
import Edit from './pages/edit/Edit'
import Navbar from './components/navbar/Navbar'

function App() {


  return (
    <BrowserRouter basename="/devblog">
     <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/newpost' element={<NewPost/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path="/post/:id" element={<Post />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
