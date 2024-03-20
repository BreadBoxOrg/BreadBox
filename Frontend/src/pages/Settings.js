import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import NavbarLayout from "../components/SideBar";
import './Settings.css';
import ProfilePic from "../images/placeholder.jpg";
import { Link } from 'react-router-dom';
import NotificationOptions from '../components/NotificationOptions.jsx';
import ProfileInfoBox from '../components/ProfileInfoBox.jsx';
import { userInfo } from '../components/mock_data/mockData.js';
//import { userlinkedAccounts } from '../components/mock_data/mockData.js';
import LinkComponent from '../components/LinkComponent.jsx';
import AccountList from '../components/LinkedAccountsList.jsx';
import AccountDataCSV from '../components/ExportAccountsCSV.jsx';
import TransactionDataCSV from '../components/ExportTranscationsCSV.jsx';
import ProfilePicChange from '../components/ProfilePic.jsx';

const Settings = () =>{

    const [selectedNotificationWhen, setNotificationWhen] = useState('');

    const NotiWhenOptions = [
        { value: 'low-funds', label: 'Low Funds'},
        { value: 'deposited-funds', label: 'Deposited Funds'},
    ];

    const [selectedNotificationBy, setNotificationBy] = useState('');

    const NotificationBy = [
        { value: 'email', label: 'Email'},
        { value: 'phone-number', label: 'Phone Number'},
    ];

    const [inputValue, setInputValue] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        let message = "";
        if (selectedNotificationBy === 'email') {
            // Simulate email submission
            message = `Email Submitted: ${inputValue}`;
        } else if (selectedNotificationBy === 'phone-number') {
            // Simulate phone number submission
            message = `Phone Number Submitted: ${inputValue}`;
        }
        setPopupMessage(message);
        setPopupOpen(true);
    };

    const handleNotificationByChange = (selectedOption) => {
        setNotificationBy(selectedOption.value);
    };

    const handleNotificationWhenChange = (selectedOption) => {
        setNotificationWhen(selectedOption.value);
    };

    /*const [accounts, setAccounts] = useState([]);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
    
    useEffect(() => {
        setAccounts(userlinkedAccounts);
    }, []);

    
    const handleRemoveAccount = (removeIndex) => {
        setConfirmDeleteIndex(removeIndex);
    };

    const handleConfirmDelete = () => {
        const updatedAccounts = accounts.filter((_, i) => i !== confirmDeleteIndex);
        setAccounts(updatedAccounts);
        setConfirmDeleteIndex(null);
    }
    const handleCancelDelete = () => {
        setConfirmDeleteIndex(null);
    }
    */

    const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName') || userInfo.find(item => item.firstName)?.firstName);
    const [lastName, setLastName] = useState(sessionStorage.getItem('lastName') || userInfo.find(item => item.lastName)?.lastName);
    const [email, setEmail] = useState(sessionStorage.getItem('email') || userInfo.find(item => item.email)?.email);
    const [profilePic, setProfilePic] = useState(sessionStorage.getItem('profilePic') || ProfilePic);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

     const handleSaveProfile = () => {
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('profilePic', profilePic);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        // Reset the form fields to the current sessionStorage values
        setFirstName(sessionStorage.getItem('firstName') || '');
        setLastName(sessionStorage.getItem('lastName') || '');
        setEmail(sessionStorage.getItem('email') || '');
        setProfilePic(sessionStorage.getItem('profilePic') || '');
        setIsEditing(false);
    };

     // Retrieve profile pic from sessionStorage

    const handleProfilePicChange = (newProfilePic) => {
        setProfilePic(newProfilePic); // Update profile pic in state
    };

    return(<>
            <body className="settings">
                <NavbarLayout />
                <div className="SettingsHeader"><h1>Settings</h1></div>
                <div className='button-layout'>
                    <Link to="/">
                        <button className="log-out-button">Log Out</button>
                    </Link>
                </div>
                <div className="settingslayout">
                    <div className="left-column">
                        <div className="account">
                            <h2>
                                Account
                                {isEditing ? (
                                    <>
                                        <button className='account-edit-save' onClick={handleSaveProfile}>Save</button>
                                        <button className='account-edit-cancel' onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                    ) : (
                                    <button className='account-edit-profile' onClick={handleEditProfile}>Edit Profile</button>
                                    )}
                            </h2>
                            {/*<img className="settings-profilePic" src={ProfilePic} alt='placeholder'></img>*/}
                            <ProfilePicChange profilePic={profilePic} onProfilePicChange={handleProfilePicChange} isEditing={isEditing}/>
                            <div className='profile-firstName'>
                                <span>First Name</span>
                                <ProfileInfoBox text={firstName} isEditable={isEditing}  onChangeText={setFirstName}/>
                            </div>
                            <div className='profile-lastName'>
                                <span>Last Name</span>
                                <ProfileInfoBox text={lastName} isEditable={isEditing}  onChangeText={setLastName}/>
                            </div>
                            <div className='profile-email'>
                                <span>Email</span>
                                <ProfileInfoBox text={email} isEditable={isEditing}  onChangeText={setEmail}/>
                            </div>    
                        </div>
                        <div className="linkedaccounts" >
                            <span className='linked-accounts-header'>Linked Accounts</span>
                                {/* <button className='plaid-button'>
                                    <img alt="Plaid Logo" src={PlaidLogo}></img>
                                    Link Your Account With Plaid
                                </button> */}
                            <LinkComponent/>
                            {/*
                            <ul className='linkedBankAccounts'>
                                {accounts.map((bank, index) => (
                                <li key={index}>
                                    <span className='bank-account-details'>
                                        {bank.name} - {bank.lastFourDigits}
                                    </span>
                                    <ClearIcon className='remove-bank' 
                                    onClick={() => handleRemoveAccount(index)} />
                                </li>
                                ))}
                                <Popup open={confirmDeleteIndex !== null} onClose={handleCancelDelete}>
                                    <div className='delete-account-pop-up'>
                                        <p>Are you sure you want to delete this account?</p>
                                        <button className='pop-up-button-yes' onClick={handleConfirmDelete}>Yes</button>
                                        <button className='pop-up-button-no' onClick={handleCancelDelete}>No</button>
                                    </div>
                                </Popup>
                            </ul>
                            */}
                            <AccountList />
                        </div>
                    </div>
                    <div className="right-column" >
                        <div className="general"  >
                            <h2>General</h2>
                                <ul>
                                    {/*<li>Option 1</li>
                                    <li>Option 2</li>
                                    <li>Option 3</li>*/}
                                    <li><AccountDataCSV /><TransactionDataCSV /></li>
                                </ul>
                            <div className="notifications">
                                <h2>Notifications</h2>
                                <span>Notify Me When...</span>
                                <div className='notification-selection-options'>
                                    <NotificationOptions 
                                        value={selectedNotificationWhen}
                                        onChange={handleNotificationWhenChange}
                                        options={NotiWhenOptions}
                                        />
                                    <NotificationOptions 
                                        value={selectedNotificationBy}
                                        onChange={handleNotificationByChange}
                                        options={NotificationBy}
                                    />
                                </div>
                                <div>
                                    {(selectedNotificationBy !== '' && selectedNotificationWhen !== '') && (
                                        <div className='input-email-phone-container'>
                                            <input className='input-email-phone'
                                                type={selectedNotificationBy === 'email' ? 'email' : 'tel'}
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                placeholder={
                                                    selectedNotificationBy === 'email'
                                                    ? 'Enter Email'
                                                    : 'Enter Phone Number'
                                                }
                                            />
                                            <button className='submit-email-phone' onClick={handleSubmit}>Submit</button>
                                        </div>
                                    )}
                                    <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
                                        {popupMessage}
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </>);
}

export default Settings;