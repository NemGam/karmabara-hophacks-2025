import { Link, NavLink } from 'react-router-dom';
import { useProfile } from './hooks/useProfile';

function Navbar() {
    const item = 'h-16 text-xl flex items-center';
    const active = ({ isActive }: { isActive: boolean }) =>
        `${item} ${isActive ? 'font-bold' : ''}`;

    const { profile } = useProfile();

    return (
        <div className="navbar bg-base-200 shadow-sm h-16">
            <Link
                to="/"
                className="btn btn-ghost h-16 text-2xl mx-0 normal-case leading-none mr-auto">
                Karmabara
            </Link>
            <div className="flex-1 flex items-center gap-4">
                <ul className="menu menu-horizontal p-0 m-auto">
                    <li>
                        <NavLink to="/virtues" className={active}>
                            Virtues
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/knights" className={active}>
                            Steps of Wisdom
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/partnership" style={{ color: 'gray' }} className={active}>
                            Partnership
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/organizers" className={active} style={{ color: 'gray' }}>
                            Organizers
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to={`/profile/${profile?.user_id}`} className="h-16 text-xl flex items-center gap-3">
                            {`${profile?.first_name} ${profile?.last_name}`}
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                    <img src={`${profile?.pfp || "/logo.png"}`} alt="avatar" />
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
