import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Button} from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(2),
        width: 150,
        height: 150,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));


export default function Profile() {
    let location = useLocation();
    const [user, setUser] = useState(null);

    const classes = useStyles();

    const path = location.pathname.split('/');

    const username = path[path.length-1];
    
    useEffect(() => {
        axios.get(`https://kiska.herokuapp.com/api/user/all/profile/${username}`).then((res) => {
            setUser(res.data);
        })
    },[setUser, username])
    console.log(user);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        {user !== null ? user.user_name:""}
                    </Typography>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>Email:</span> <a href={user !== null ? "mailto:"+user.email:""}>{user !== null ? user.email: ""}</a></p>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>Joined:</span> <span style={{fontStyle: 'italic'}}>{user !== null ? user.get_date_joined.day + " " + user.get_date_joined.month + ", " + user.get_date_joined.year:""}</span></p>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>Last Updated:</span> <span style={{fontStyle: 'italic'}}> {
                            user !== null ?
                            user.get_date_updated.day + " " + user.get_date_updated.month + ", " + user.get_date_updated.year:""} </span></p>
            </div>
            { localStorage.getItem('username') === username ?
                <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                            component={NavLink}
                            to={"/change-password/"+localStorage.getItem('username')}
                            style={{marginLeft: 5, marginRight: 5}}>
                                Change Password
            </Button>:""
        }
        { localStorage.getItem('username') === username ?
            <Button
            href="#"
            color="primary"
            variant="outlined"
            className={classes.link}
            component={NavLink}
            to="/request-password-reset"
            style={{marginLeft: 5, marginRight: 5}}>
                                Reset Password
            </Button>:""
        }
        </Container>
    );
}