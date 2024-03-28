import { List } from '@mui/material'
import AppListItem from './AppListItem'

export default function AppList(props) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            {props.items.map((i) => (
                <AppListItem {...i} />
            ))}

        </List>
    )
}