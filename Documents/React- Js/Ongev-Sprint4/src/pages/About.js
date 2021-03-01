import React from 'react'
import { injectIntl } from 'react-intl'
import Page from './Page'

const About = ({ intl }) => {
    return (
        <Page pageTitle={intl.formatMessage({ id: 'about' })}>
            <div>
                {intl.formatMessage({ id: 'about' })} <br />
            </div>
        </Page>
    )
}
export default injectIntl(About)
