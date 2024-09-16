import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./store/userFetchSlice";
import { RootState, AppDispatch } from "./store/store";
import { setNameFilter, setUsernameFilter, setEmailFilter, setPhoneFilter, resetFilters} from './store/userFilterSlice';
import './users_handling.css';

export default function DisplayUsers() {
    const dispatch: AppDispatch = useDispatch();

    /*fetching state */
    const { users, loading, error } = useSelector((state: RootState) => state.users);
    /*filtering state*/
    const { name, username, email, phone } = useSelector((state: RootState) => state.userFilter);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleResetFilters = () => {
        dispatch(resetFilters()); 
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase()) &&
        user.username.toLowerCase().includes(username.toLowerCase()) &&
        user.email.toLowerCase().includes(email.toLowerCase()) &&
        user.phone.toLowerCase().includes(phone.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-table-container">
            <h1>User List</h1>
            <button className="reset-button" onClick={handleResetFilters}>RESET</button>
            <div className="user-table">
                <div className="user-table-row user-table-header">
                    <div className="user-table-cell">Name</div>
                    <div className="user-table-cell">Username</div>
                    <div className="user-table-cell">Email</div>
                    <div className="user-table-cell">Phone</div>
                </div>
                <div className="user-table-row user-filter-row">
                    <div className="user-table-cell">
                        <input
                            type="text"
                            placeholder="Filter by Name"
                            value={name}
                            onChange={event => dispatch(setNameFilter(event.target.value))}
                        />
                    </div>
                    <div className="user-table-cell">
                        <input
                            type="text"
                            placeholder="Filter by Username"
                            value={username}
                            onChange={event => dispatch(setUsernameFilter(event.target.value))}
                        />
                    </div>
                    <div className="user-table-cell">
                        <input
                            type="text"
                            placeholder="Filter by Email"
                            value={email}
                            onChange={event => dispatch(setEmailFilter(event.target.value))}
                        />
                    </div>
                    <div className="user-table-cell">
                        <input
                            type="text"
                            placeholder="Filter by Phone"
                            value={phone}
                            onChange={event => dispatch(setPhoneFilter(event.target.value))}
                        />
                    </div>
                </div>

                {filteredUsers.map(user => (
                    <div className="user-table-row" key={user.id}>
                        <div className="user-table-cell">{user.name}</div>
                        <div className="user-table-cell">{user.username}</div>
                        <div className="user-table-cell">{user.email}</div>
                        <div className="user-table-cell">{user.phone}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}