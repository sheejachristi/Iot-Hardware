import React from 'react'
import { injectIntl } from 'react-intl'
import Page from './Page'

const Logout = ({ intl }) => {
    return (
        <Page pageTitle={intl.formatMessage({ id: 'home' })}>
                {intl.formatMessage({ id: 'home' })}
        </Page>
    )
}
export default injectIntl(Logout)
