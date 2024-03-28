import { ListItem, ListItemText } from '@mui/material'

const AppListItem = (props) => {
    return (
        <ListItem>
            <ListItemText primary={props.primary} secondary={props.secondary} />
        </ListItem>
    )
}

export default AppListItem