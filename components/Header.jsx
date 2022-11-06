import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/components/Header.module.css'
import IconUser from '../assets/icons/user-circle.svg';
import IconTelegram from '../assets/icons/telegram.svg';
import IconWhatsUpp from '../assets/icons/whatsapp.svg';
import { changeToken } from '../redux/features/authSlice';

export default function Header() {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const [urlBtnLogin, setUrlBtnLogin] = useState('');

    function getCookie(name) {
        const variable = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return variable ? decodeURIComponent(variable[1]) : undefined;
    }

    useEffect(() => {

        token === '' || undefined
            ? setUrlBtnLogin('/auth/login')
            : setUrlBtnLogin('/profile');

    }, [token])

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>LeaseHelp</Link>
            </div>
            <div className={styles.itemContacts}>
                <a>
                    <Image src={IconTelegram} width={30} height={30} alt='Иконка телеграм' />
                </a>
                <a>
                    <Image src={IconWhatsUpp} width={30} height={30} alt='Иконка ватсап' />
                </a>
            </div>
            <div className={styles.btnLogin}>
                <Image src={IconUser} width={24} height={24} alt='Иконка пользователя' />
                <Link href={urlBtnLogin}>Личный кабинет</Link>
            </div>

        </div>
    )
};