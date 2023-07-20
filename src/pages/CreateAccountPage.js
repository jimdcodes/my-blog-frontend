import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    return (
        <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)} />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login">Already have an account? Log in here</Link>
        </>        
    );
}

export default CreateAccountPage;