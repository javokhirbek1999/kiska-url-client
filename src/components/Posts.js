import React from "react";
import { makeStyles, Card, CardContent, CardMedia, Grid, Typography, Container, Link } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Posts = (props) => {
    const {posts} = props;
    const classes = useStyles();
    
    if (!posts || posts.length == 0) return <p>Cannot find any things bruh</p>

    return <h1>Posts</h1>;
}

export default Posts;