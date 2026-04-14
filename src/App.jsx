
import { Routes,Route,Link } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import RecipeDetails from  './pages/RecipeDetails'
import Dishes from  './pages/Dishes'
import Navbar from './componants/Navbar'
import './App.css'


function App() {
 return<>
 <Navbar />
 <Routes>
  <Route path="/" element={<Home />}></Route>
  <Route path="/dishes" element={<Dishes />}></Route>
  <Route path="/search" element={<Search />}></Route>
   <Route path="/recipe/:id" element={<RecipeDetails />} />
 
  <Route path="/favorites" element={<Favorites />} />
 </Routes>
 </>
}

export default App
