import React from "react";
import { AppBar, makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";


const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

function Header() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position='static'
                color='white'
                elevation={0}
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant='h6' color='inherit' noWrap>
                        KiskaURL
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;