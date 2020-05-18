/**
 * Copyright 2019
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { OPSessionChecker } from "openstack-uicore-foundation/lib/components";

class AuthorizedRoute extends React.Component {

    render() {
        let { component: Component, isLoggedUser, doLogin, backUrl, purchaseSummit, ...rest } = this.props;
        return (
            <Route {...rest} render={props => {
                let { location } = this.props;
                let currentBackUrl = backUrl == null ? location.pathname : backUrl;

                if (location.search != null) {
                    currentBackUrl += location.search
                }
                if (location.hash != null) {
                    currentBackUrl += location.hash
                }

                if (isLoggedUser) {
                    return (
                        <React.Fragment>
                            <OPSessionChecker clientId={window.OAUTH2_CLIENT_ID} idpBaseUrl={window.IDP_BASE_URL} />
                            <Component purchaseSummit={purchaseSummit} {...props} />
                        </React.Fragment>
                    );
                } else {
                    doLogin()
                }
            }}
            />
        )
    }
}

export default AuthorizedRoute;