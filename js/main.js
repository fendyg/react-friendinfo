/**
 * @jsx React.DOM
 */

var InputBox = React.createClass({
    render: function() {
        return (
            <input type="text"
            className="form-control"
            placeholder={this.props.placeHolderText}
            onChange={this.props.handleInputChange} />
        );
    }
});

var NameCards = React.createClass({
    checkExists: function(param, def) {
        if(param) return param;
        else return def;
    },
    render: function() {
        var Person = {};
        Person.title = this.checkExists(this.props.person.title, ' ');
        Person.email = this.checkExists(this.props.person.email, '-');
        Person.phone = this.checkExists(this.props.person.phone, '-');
        Person.location = this.checkExists(this.props.person.location, '-');
        Person.work = this.checkExists(this.props.person.work, '-');

        return (
            <div className="namecards-container col-xs-12 col-md-6">
                <div className="name-holder">
                    <div className="nickname">{'{'+this.props.person.nickname+'}'}</div>
                    <div className="fullname">{this.props.person.fullname}</div>
                    <div className="title">{Person.title}</div>
                </div>
                <div className="info-holder">
                    <div className="birthday">
                        <span className="glyphicon glyphicon-gift"></span>
                        <span className="header">Birthday</span>
                        <span className="value">{this.props.person.birthday}</span>
                    </div>
                    <div className="email">
                        <span className="glyphicon glyphicon-envelope"></span>
                        <span className="header">Email</span>
                        <span className="value">
                            <a href={'mailto:'+Person.email}>{Person.email}</a>
                        </span>
                    </div>
                    <div className="phone">
                        <span className="glyphicon glyphicon-phone"></span>
                        <span className="header">Phone</span>
                        <span className="value">{Person.phone}</span>
                    </div>
                    <div className="location">
                        <span className="glyphicon glyphicon-globe"></span>
                        <span className="header">Location</span>
                        <span className="value">{Person.location}</span>
                    </div>
                    <div className="work">
                        <span className="glyphicon glyphicon-briefcase"></span>
                        <span className="header">Work</span>
                        <span className="value">{Person.work}</span>
                    </div>
                </div>
                <div className="socmed-holder">
                    <div className="wrapper">
                        <a className="icon facebook" href="facebook.com/user"></a>
                        <a className="icon twitter" href="twitter.com/user"></a>
                        <a className="icon linkedin" href="linkedin.com/in/user"></a>
                        <a className="icon instagram disabled" href="instagram.com/user"></a>
                    </div>
                </div>
            </div>
        );
    }
});

var MainContent = React.createClass({
    render: function(){
        var rows = [];
        if(typeof this.props.resultSet === 'object') {
            this.props.resultSet.forEach(function(person){
                rows.push(
                    <NameCards person={person} />
                );
            });
        }

        return (
            <div className="main-content row">
                {rows}
            </div>
        );
    }
});

var ListContainer = React.createClass({
    getInitialState: function(){
        return {
            resultSet: 'Loading data..',
        }
    },

    componentDidMount: function(){
        $.get('/data/birthday.json', function(result) {
            this.setState({
                birthdayJSON: result.data,
                resultSet: result.data
            });
        }.bind(this));
    },

    handleInputChange: function(e){
        var query = e.target.value,
            filteredResult = _.filter(this.state.birthdayJSON, function(current) {
                return _.any(filterConditions, _.invokeWith(current, query));
            });

        this.setState({resultSet: filteredResult});
    },

    render: function() {
        var placeholderText = "Type a name..";

        return (
            <div>
                <InputBox
                    placeHolderText={placeholderText}
                    handleInputChange={this.handleInputChange}
                />
                <MainContent resultSet={this.state.resultSet} />
            </div>
        );
    }
});

React.renderComponent(
    <ListContainer />,
    document.getElementById('container')
);
