import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link className="image-link" to="/">Ho<Link to="/images/test/asd">m</Link>e</Link>                    
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                <li>
                    <Link to="/images">Images</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;