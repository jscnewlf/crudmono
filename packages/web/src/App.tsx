// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import Register from './pages/Register';
import Login from './pages/Login';
import Me from './pages/Me';
import Feed from './pages/Feed';
import PostPage from './pages/PostPage';
import Layout from './components/Layout';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/me" element={<Me />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/feed/post/:idDoPost" element={<PostPage />} />
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
};

export default App;
