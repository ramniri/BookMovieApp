import React, { useState } from "react";
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function TabPanel(props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired
};



const Header = (props) => {

    const [value, setValue] = useState(0);
    const [username, setUserName] = useState("");
    const [reqUserName, setReqUserName] = useState("dispNone");
    const [password, setPassword] = useState("");
    const [reqPassword, setReqPassword] = useState("dispNone");
    const [reqFirstName, setReqFirstName] = useState("dispNone");
    const [reqLastName, setReqLastName] = useState("dispNone");
    const [reqEmail, setReqEmail] = useState("dispNone");
    const [reqRegPassword, setReqRegPassword] = useState("dispNone");
    const [reqContactNo, setReqContactNo] = useState("dispNone");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [message, setMessage] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    let loggedIn = window.sessionStorage.getItem("access-token");
    function openModal() {
        setIsOpen(true);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function closeModal() {
        setIsOpen(false);
    }

    async function registerHandler() {
        firstName === "" ? setReqFirstName("dispBlock") : setReqFirstName("dispNone");
        lastName === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
        email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
        regPassword === "" ? setReqRegPassword("dispBlock") : setReqRegPassword("dispNone");
        contactNo === "" ? setReqContactNo("dispBlock") : setReqContactNo("dispNone");

        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            regPassword === "" ||
            contactNo === ""
        ) {
            return;
        }

        let data = JSON.stringify({
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            mobile_number: contactNo,
            password: regPassword
        });
        try {
            const rawResponse = await fetch(props.baseUrl + "signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        "Cache-Control": "no-cache",
                    }, body: data,
                });

            const result = await rawResponse.json();

            if (rawResponse.ok) {
                const message = "Registration Successful. Please Login!";
                setMessage(message);
            }
        } catch (e) {

        }

    }

    async function loginHandler() {
        username === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
        password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
        if (username === "" || password === "") {
            return;
        }

        try {
            const rawResponse = await fetch(props.baseUrl + "auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Accept": "application/json;charset=UTF-8",
                    Authorization: "Basic " + window.btoa(`${username}:${password}`),
                },
            });
            const result = await rawResponse.json();
            if (rawResponse.ok) {
                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                loggedIn = window.sessionStorage.getItem("access-token");
                closeModal();

            }
        } catch (error) {

        }
    }

    function logoutHandler() {
        window.sessionStorage.removeItem("access-token");
    }

    return (
        <div>
            <header className="app-header">
                <img src={logo} className="app-logo" alt="Movies App Logo" />
                {loggedIn === null ?
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={openModal}>
                            Login
                        </Button>
                    </div>
                    :
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={logoutHandler}>
                            Logout
                        </Button>
                    </div>
                }
                {props.showBookShowButton === "true" && (loggedIn === null)
                    ? <div className="bookshow-button">
                        <Button variant="contained" color="primary" onClick={openModal}>
                            Book Show
                        </Button>
                    </div>
                    : ""
                }

                {props.showBookShowButton === "true" && (loggedIn !== null)
                    ? <div className="bookshow-button">
                        <Link to={"/bookshow/" + props.id}>
                            <Button variant="contained" color="primary">
                                Book Show
                            </Button>
                        </Link>
                    </div>
                    : ""
                }

            </header>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                contentLabel="Login"
                onRequestClose={closeModal}
                style={customStyles}
            >
                <Tabs className="tabs" value={value} onChange={handleChange}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                {value === 0 &&
                    <TabPanel>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                            <FormHelperText className={reqUserName}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FormHelperText className={reqPassword}>
                                <span className="red">{username !== null && password === null ? "Please Enter Your Password" : "required"}</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={loginHandler}>LOGIN</Button>
                    </TabPanel>
                }

                {value === 1 &&
                    <TabPanel>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <FormHelperText className={reqFirstName}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <FormHelperText className={reqLastName}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <FormHelperText className={reqEmail}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                            <FormHelperText className={reqRegPassword}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                            <FormHelperText className={reqContactNo}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />

                        <FormControl>
                            <span className="successText">
                                {message}
                            </span>
                        </FormControl>

                        <br /><br />
                        <Button variant="contained" color="primary" onClick={registerHandler}>REGISTER</Button>
                    </TabPanel>
                }
            </Modal>
        </div>
    );
};

export default Header;