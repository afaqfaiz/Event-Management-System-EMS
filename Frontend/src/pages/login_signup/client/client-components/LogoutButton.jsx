import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/clientlogin');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
