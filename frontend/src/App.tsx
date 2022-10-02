import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { HomePage } from './pages/HomePage';
import { HouseRentals } from './pages/HouseRentals';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
					<Route path='/homes' element={<HouseRentals />} />
				</Routes>

		</BrowserRouter>
	);
}

export default App;
