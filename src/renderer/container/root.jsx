import React from 'react';

import Profiles from '../component/profiles';
import Profile from '../component/profile';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        // 起動時にmeetupsのrepoを取得する
        // NOTE: 開発中に再起動するたびfetchするのはあれなので、
        // 落ち着くまで一旦comment outしておく
        //this.props.actions.profiles.fetch();
        this.props.actions.profiles.get();
    }

    render() {
        return <div id="root" className="window">
            <div className="window-content">
                <div className="pane-group">
                    <Profiles profiles={this.props.profiles} actions={this.props.actions} />
                    <Profile profile={this.props.profiles.profile} icon={this.props.profiles.icon} />
                </div>
            </div>
        </div>;
    }
}