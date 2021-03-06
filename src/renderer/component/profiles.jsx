import React from 'react';

class Item extends React.Component {
    render() {
        const profile = this.props.profile;
        let className = this.props.selected ? "list-group-item selected" : "list-group-item";
        if (this.props.checked) {
            className = `${className} checked`;
        }

        return <li className={className} onClick={this.handleClick.bind(this)}>
            <strong>{profile.username}</strong>
            <p>{profile.path}</p>
        </li>;
    }

    handleClick(_event) {
        this.props.actions.profiles.selectMember(this.props.profile.path);
    }
}

class MeetupSelector extends React.Component {
    render() {
        let options = this.props.meetups.map((meetup) => {
            return <option key={meetup} value={meetup}>{meetup} 回</option>;
        });

        return <select className="form-control meetup-selector" value={this.props.selected} onChange={this.handleChange.bind(this)}>
            {options}
        </select>;
    }

    handleChange(event) {
        this.props.actions.profiles.selectMeetup(event.target.value);
    }
}

export default class Profiles extends React.Component {
    render() {
        const profiles = this.props.profiles;
        const items = profiles.profiles.filter((profile) => {
            return profile.meetup === profiles.selectedMeetup;
        }).map((profile) => {
            const selected = profile.path === profiles.selectedMember;
            const checked = profiles.checked.has(profile.path);
            return <Item key={profile.path} profile={profile} selected={selected} checked={checked} actions={this.props.actions} />;
        });

        return <div className="pane pane-sm sidebar note-list">
            <nav className="nav-group">
                <ul className="list-group">
                    <li className="list-group-header">
                        <MeetupSelector meetups={profiles.meetups} selected={profiles.selectedMeetup} actions={this.props.actions} />
                        <button className="btn btn-default" onClick={this.handleReload.bind(this)}>reload</button>
                    </li>
                    {items}
                </ul>
            </nav>
        </div>;
    }

    handleReload(_event) {
        this.props.actions.profiles.fetch();
    }
}