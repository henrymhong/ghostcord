import grey from '@material-ui/core/colors/grey'

const white = grey[50];

const styles = theme => ({
    root: {
        flexGrow: 1,

    },
    title: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#2d3436',
        fontSize: '55px',
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#184a46',
        color: white,
    },
    a: {
        textDecoration: 'none',
        color: white,
    },
});
export default styles;