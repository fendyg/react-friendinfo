/**
 * @jsx React.DOM
 */

var InputBox = React.createClass({
    getInitialState: function(){
        return {
            resultSet: 'Loading data..',
        }
    },

    onInputChange: function(e){
        var query = e.target.value,
            filteredResult = _.filter(this.state.birthdayJSON, function(num){
                return num.name.toLowerCase().indexOf(query) >= 0;
            });

        this.setState({resultSet: filteredResult});
    },

    componentDidMount: function(){
        $.get('/data/birthday.json', function(result) {
            this.setState({
                birthdayJSON: result.data,
                resultSet: result.data
            });
        }.bind(this));
    },

    render: function() {
        return new React.DOM.div({},
            new React.DOM.input({
                placeholder: this.props.placeholderText,
                onChange: this.onInputChange
            }),
            new React.DOM.p({}, this.state.resultSet)
        )
    }
});

React.renderComponent(
    InputBox({
        placeholderText: 'Type a name..',
    }),
    document.getElementById('container')
);