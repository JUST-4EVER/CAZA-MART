import Navbar from '../components/Navbar'
import Article from '../components/Article'
import Section from '../components/Section'
import Products from '../components/Products'

const Home = () => {
  return (
	<div className='mt-20 p-3'>
		<Navbar/>
		<Article/>
		<Section/>
		<Products/>
	</div>
  )
}

export default Home