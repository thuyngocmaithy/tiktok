import { HeaderOnly } from '../components/Layout';
import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';

//Không đăng nhập vẫn vào được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

//Không đăng nhập => chuyển login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
