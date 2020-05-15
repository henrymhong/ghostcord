import React, { useContext, useState, useEffect } from "react";
import NavBarComponent from "../navBar/navBar";
import {
    Tabs,
    AppBar,
    Tab,
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { GlobalContext } from "../state/State";
import { firestore } from "../config/fire";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        </div>
        
    );
}

const FriendsComponent = ({ history }) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [tab, setTab] = useState(0);
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const [users, setUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        firestore
            .collection("users")
            .get()
            .then((res) => {
                setUsers(res.docs.map((doc) => doc.data()));
                setSearchedUsers(res.docs.map((doc) => doc.data()));
            });
    }, []);

    // const loadUsers = (search) => {
    //     firestore
    //         .collection("users")
    //         .get()
    //         .then((res) => {
    //             setUsers(res.docs.map((doc) => doc.data()));
    //         });
    // };

    const onTextChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
        onType(e.target.value);
    };

    const onType = (search) => {
        console.log("SEARCH QUEREY", search);
        setSearchedUsers(
            search === "" || undefined
                ? users
                : users.filter((el) =>
                      el.name !== undefined
                          ? el.name.toLowerCase().includes(search)
                          : null
                  )
        );
    };

    return (
        <div>
            {console.log(searchedUsers)}
            <NavBarComponent style={{position: "sticky"}} history={history} />
            <div style = {{paddingTop: "3%",position:"static"}}>
					
				</div>
            <div style={{ height: "auto", width: "auto" }}>
                <AppBar position="static">
                    <Tabs
                        value={tab}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    >
                        <Tab label="Users" />
                        <Tab label="Friends" />
                    </Tabs>
                </AppBar>
                <TabPanel value={tab} index={0}>
                    <TextField
                        fullWidth
                        onChange={(e) => {
                            onTextChange(e);
                        }}
                        label="Search for users..."
                        value={search}
                    ></TextField>
                    <List>
                        {searchedUsers.map((users, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={
                                                state.home.loadedAvatars[
                                                    users.email
                                                ]
                                            }
                                        ></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={users.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            // onClick={}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    Item Two
                </TabPanel>
            </div>
        </div>
    );
};

export default FriendsComponent;
