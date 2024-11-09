import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import {
  listUsersAction,
  getUserDetailAction,
  updateUserAction,
  deleteUserAction,
  addUserAction
} from '../../redux/Actions/AdminUsers';

const UserManager = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(state => state.userListReducer);
  const { user, loading: loadingDetail } = useSelector(state => state.userDetailReducer);
  const { success: updateSuccess, error: updateError } = useSelector(state => state.userUpdateReducer);
  const { success: deleteSuccess, error: deleteError } = useSelector(state => state.userDeleteReducer);
  const { success: addSuccess, error: addError } = useSelector(state => state.userAddReducer);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserIsAdmin, setEditUserIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  useEffect(() => {
    dispatch(listUsersAction());
  }, [dispatch, updateSuccess, deleteSuccess, addSuccess]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getUserDetailAction(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    if (user) {
      setEditUserName(user.name);
      setEditUserEmail(user.email);
      setEditUserIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleUpdateUser = () => {
    if (editUserName && editUserEmail) {
      dispatch(updateUserAction(selectedUserId, { name: editUserName, email: editUserEmail, isAdmin: editUserIsAdmin }));
      setSelectedUserId(null);
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserAction(id));
    }
  };

  const handleAddUser = () => {
    if (newUserName && newUserEmail && newUserPassword) {
      dispatch(addUserAction({ name: newUserName, email: newUserEmail, password: newUserPassword }));
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
    }
  };

  const toggleEditUser = (id) => {
    setSelectedUserId(selectedUserId === id ? null : id);
  };

  const toggleAdminStatus = () => {
    setEditUserIsAdmin(!editUserIsAdmin);
  };

  const closeModal = () => {
    setSelectedUserId(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 9);

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-retro font-semibold text-indigo-600 mb-4 text-center">Manage Users</h2>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold text-indigo-500 mb-4 text-center">Add New User</h3>
        {addError && <p className="text-red-500 text-center mb-2">{addError}</p>}
        <input
          type="text"
          placeholder="User Name"
          className="w-full p-3 mb-4 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="User Email"
          className="w-full p-3 mb-4 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="User Password"
          className="w-full p-3 mb-4 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
        />
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search for a user"
        className="w-full p-3 mb-6 bg-gray-800 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-300 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <div
              key={user._id}
              className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-lg text-indigo-400 font-semibold mb-2 text-center">{user.name}</h3>
              <p className="text-gray-300 mb-4">{user.email}</p>
              <p className="text-sm text-gray-400 mb-2">Admin: {user.isAdmin ? 'Yes' : 'No'}</p>

              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded mb-2 hover:bg-indigo-500 transition"
                onClick={() => toggleEditUser(user._id)}
              >
                {selectedUserId === user._id ? 'Close' : 'Edit'}
              </button>
              <button
                className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">No users found</p>
          )}
        </div>
      )}

      {selectedUserId && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
              onClick={closeModal}
            >
              <IoClose size={24} />
            </button>
            <h3 className="text-xl font-semibold text-indigo-500 mb-4 text-center">Edit User</h3>
            {updateError && <p className="text-red-500 text-center mb-2">{updateError}</p>}
            <input
              type="text"
              placeholder="User Name"
              className="w-full p-3 mb-4 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="User Email"
              className="w-full p-3 mb-4 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
            />
            <button
              className={`w-full py-2 rounded ${editUserIsAdmin ? 'bg-red-900' : 'bg-gray-600'} text-white mb-4 hover:opacity-90 transition`}
              onClick={toggleAdminStatus}
            >
              {editUserIsAdmin ? 'Revoke Admin' : 'Make Admin'}
            </button>
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
              onClick={handleUpdateUser}
            >
              Update User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
