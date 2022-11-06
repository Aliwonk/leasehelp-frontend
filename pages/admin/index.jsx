import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/admin/Admin.module.css'

export default function admin() {
    const router = useRouter();
    const { token, role } = useSelector(state => state.auth);
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        fetch('http://localhost:3000/user/all', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(users => {
                console.log(users);
                setUsers(users)
            })

    }, [token]);

    function TableValues(props) {
        const { data } = props;
        return data.map((value, index) => {
            return (
                <div key={index} className={styles.tableValues}>
                    <p className={styles.userId}>{value.id}</p>
                    <p>{value.lastName}</p>
                    <p>{value.firstName}</p>
                    <p>{value.phone}</p>
                    <p>{value.email}</p>
                    <p>{value.subscription ? 'подписан' : 'не подписан'}</p>
                </div>
            )
        });
    }

    if (token === '' || role !== 'ADMIN') {
        router.push('/admin/login')
    } else {
        return (
            <div className={styles.container}>
                <p>Пользователи</p>
                <div className={styles.table}>
                    <div className={styles.tableCaptions}>
                        <p className={styles.userId}>id</p>
                        <p>Фамилия</p>
                        <p>Имя</p>
                        <p>Телефон</p>
                        <p>Email</p>
                        <p>Подписка</p>
                    </div>
                    <div className={styles.tableColumn}>
                        <TableValues data={users} />
                    </div>
                </div>
            </div>
        )
    }
}