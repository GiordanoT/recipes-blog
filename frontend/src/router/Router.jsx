import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from '../App';

function Router() {
    return(<BrowserRouter>
        <Routes>
            <Route path={''} element={<App />} />
            <Route path={'*'} element={<div>404 Not Found!</div>} />
        </Routes>
    </BrowserRouter>);
}

export default Router;
