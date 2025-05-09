import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
    const nav = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        socket.emit('newUser', { userName, socketID: socket.id });
        nav('/chat');
    };
    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home_header'>Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
            <input type='text' minLength={3} name="username" value={userName} id="username" className='username__input' onChange={(e) => setUserName(e.target.value)} />
            <button className='home__cta'>Sign In</button>
        </form>
    )
}

export default Home;