import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchAdminLogin, getCookie } from '../../redux/features/authSlice';
import styles from '../../styles/admin/Admin.module.css';

export default function login() {
    const dispatch = useDispatch();
    const { token, role } = useSelector(state => state.auth);
    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    if (token !== '' && role === 'ADMIN') {
        router.push('/admin');
    } else {
        return (
            <>
                <form className={styles.formLogin}>
                    <label htmlFor="login">Логин</label>
                    <input type="text" id='login' onChange={e => setLogin(e.target.value)} />
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                    <button onClick={async (e) => {
                        e.preventDefault();
                        const response = await dispatch(fetchAdminLogin({ login, password }))
                        if (response.payload.token) return router.push('/admin');
                        if (response.payload.statusCode === 400) return alert('Неправильный пароль или логин');
                    }}>Войти</button>
                </form>
            </>
        )
    }
}