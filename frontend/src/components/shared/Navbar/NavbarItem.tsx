import { props } from "./navItem.interface";
import { Link } from 'react-router-dom'

export const NavbarItem = ({title, to, styles}: props) => {
    return (
        <Link className={styles} to={to}>{title}</Link>
    );
}