import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router';
import './styles/app.scss'
import Header from "./components/Header.jsx";
import MainPage from "./pages/MainPage.jsx";
import Footer from "./components/Footer.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import {useAuthStore} from "./store/authStore.js";
import {useEffect} from "react";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PropTypes from "prop-types";

const Layout = ({children}) => {
    return (
        <div className="layout">
            <Header/>
            <main className="main-content">
                {children}
                <ScrollToTop/>
            </main>
            <Footer/>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

function App() {

    const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

    useEffect(() => {
        checkAuthStatus();
    }, [])

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                    <Route path="/search" element={
                        <ProtectedRoute>
                            <SearchPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/result" element={
                        <ProtectedRoute>
                            <ResultPage/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </Layout>
        </Router>
    )
}

export default App
