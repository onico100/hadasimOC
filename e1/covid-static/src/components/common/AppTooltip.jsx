import Tooltip from '@mui/material/Tooltip'

const AppTooltip = (props) => {
    const { children, title } = props

    return (
        <Tooltip title={title} placement='top'>
            {children}
        </Tooltip>
    )
}

export default AppTooltip