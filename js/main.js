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

var MainContent = React.createClass({
    render: function(){
        return (
            <div className="results">
                {this.props.resultSet}
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
            filteredResult = _.filter(this.state.birthdayJSON, function(num){
                return num.name.toLowerCase().indexOf(query) >= 0;
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
