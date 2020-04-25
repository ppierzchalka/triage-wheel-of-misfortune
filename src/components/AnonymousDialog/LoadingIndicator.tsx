import { CircularProgress } from '@material-ui/core'
import React from 'react'

export const LoadingIndicator = () => {
    return (
        <div className={'anonymous-dialog__loading'}>
            <CircularProgress />
        </div>
    )
}
