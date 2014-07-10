/**
 * @jsx React.DOM
 */

var cx = React.addons.classSet,
    reactTransition = React.addons.CSSTransitionGroup;

var InputBox = React.createClass({
    render: function() {
        return (
            <div className="input-group">
                <input type="text"
                    className="form-control"
                    placeholder={INPUT_PLACEHOLDER_TXT}
                    onChange={this.props.handleInputChange}
                />
                <span className="input-group-addon">
                    <span className="glyphicon glyphicon-search"></span>
                </span>
            </div>
        );
    }
});

var HeaderBar = React.createClass({
    render: function() {
        return (
            <section className="header-bar">
                <h1>{SITE_TITLE}</h1>
            </section>
        );
    }
});

var SocMedAnchor = React.createClass({
    classGetter: function(isDisabled) {
        var obj = {},
            type = this.props.type;

        obj.icon = true;
        obj[type] = true;
        obj.disabled = isDisabled;

        return obj;
    },
    render: function(){
        var classHolder,
            anchorHolder = [],
            isDisabled = this.props.link.length === 0,
            link = "http://"+this.props.type+".com/"+this.props.link;

        classHolder = cx(this.classGetter(isDisabled));

        if(isDisabled) {
            anchorHolder.push(
                <span className={classHolder}></span>
            );
        } else {
            anchorHolder.push(
                <a className={classHolder} href={link}></a>
            );
        }

        return (
            <div className="socmed-link-wrapper">{anchorHolder}</div>
        );
    }
});

var NameCards = React.createClass({
    checkExists: function(param, def) {
        if(param) return param;
        else return def;
    },
    render: function() {
        var Person = {},
            nameHolderClass;

        Person.name = this.props.person.fullname;
        Person.nickname = this.props.person.nickname;
        Person.birthday = this.props.person.birthday;
        Person.title = this.checkExists(this.props.person.title, ' ');
        Person.email = this.checkExists(this.props.person.email, '-');
        Person.phone = this.checkExists(this.props.person.phone, '-');
        Person.location = this.checkExists(this.props.person.location, '-');
        Person.work = this.checkExists(this.props.person.work, '-');
        Person.facebook = this.props.person.facebook;
        Person.twitter = this.props.person.twitter;
        Person.linkedin = this.props.person.linkedin;
        Person.instagram = this.props.person.instagram;

        nameHolderClass = cx({
            'name-holder': true,
            'longname': Person.name.length > 15
        });

        return (
            <div className="namecards-container col-xs-12 col-md-6">
                <div className={nameHolderClass}>
                    <div className="nickname">{'{'+Person.nickname+'}'}</div>
                    <div className="fullname">{Person.name}</div>
                    <div className="title">{Person.title}</div>
                </div>
                <div className="info-holder">
                    <div className="birthday">
                        <span className="glyphicon glyphicon-gift"></span>
                        <span className="header">Birthday</span>
                        <span className="value">{Person.birthday}</span>
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
                        <SocMedAnchor type="facebook" link={Person.facebook}/>
                        <SocMedAnchor type="twitter" link={Person.twitter}/>
                        <SocMedAnchor type="linkedin" link={Person.linkedin}/>
                        <SocMedAnchor type="instagram" link={Person.instagram}/>
                    </div>
                </div>
            </div>
        );
    }
});

var Pagination = React.createClass({
    render: function(){
        var maxPage = this.props.maxPage,
            currentPage = this.props.currentPage,
            numbers = [],
            numbersClass;

        //Render back arrow, if current page is at one, then disable click
        if (currentPage===1) {
            numbers.push(
                <li className="disabled">
                    <a>&laquo;</a>
                </li>
            );
        } else {
            numbers.push(
                <li>
                    <a onClick={this.props.onClick}>&laquo;</a>
                </li>
            );
        }

        //Render pagination numbers
        for (var i = 1; i <= maxPage; i++) {
            numbersClass = cx({
                'pagination-items': true,
                'active': i === currentPage
            });

            numbers.push(
                <li className={numbersClass}>
                    <a onClick={this.props.onClick}>{i}</a>
                </li>
            );
        };

        //Render forward arrow, if current page == max page, then disable click
        if(currentPage === maxPage) {
            numbers.push(
                <li className="disabled">
                    <a>&raquo;</a>
                </li>
            );
        } else {
            numbers.push(
                <li>
                    <a onClick={this.props.onClick}>&raquo;</a>
                </li>
            );
        }

        return (
            <div className="row">
                <ul className="main-pagination pagination">
                    {numbers}
                </ul>
            </div>
        );
    }
});

var MainContent = React.createClass({
    render: function(){
        var rows = [],
            pagination = [],
            visibleItemsArray,
            resultSet = this.props.resultSet,
            currentPage = this.props.currentPage,
            count = resultSet.length,
            endIndex = currentPage * 20,
            startIndex = endIndex - 20,
            lastPage = Math.ceil(count/20);

        if (currentPage === lastPage) {
            visibleItemsArray = resultSet.slice(startIndex);
        } else {
            visibleItemsArray=resultSet.slice(startIndex, endIndex);
        }

        if (typeof resultSet === 'string') {
            rows.push(
                <div className="loading-animation">
                    <div className="gif"></div>
                </div>
            );
        }
        else if(typeof resultSet === 'object') {
            visibleItemsArray.forEach(function(person){
                rows.push(
                    <NameCards person={person} />
                );
            });
        }

        if(count>20){
            pagination.push(
                <Pagination
                    onClick={this.props.handlePaginationChange}
                    currentPage = {currentPage}
                    maxPage={lastPage}
                />
            );
        }

        return (
            <div className="main-content row">
                <reactTransition transitionName="namecards">
                    {pagination}
                    {rows}
                </reactTransition>
            </div>
        );
    }
});

var ListContainer = React.createClass({
    getInitialState: function(){
        return {
            resultSet: LOADING_STRING,
            currentPage: 1
        }
    },

    handleInputChange: function(e){
        var query = e.target.value,
            filteredResult = _.filter(this.state.birthdayJSON, function(current) {
                return _.any(filterConditions, _.invokeWith(current, query));
            });

        this.setState({currentPage: 1});
        this.setState({resultSet: filteredResult});
    },

    handlePaginationChange: function(e){
        var newPage = e.target.innerHTML,
            currentPage = this.state.currentPage;

        e.preventDefault();
        if(newPage === '«' && currentPage !== 1) {
            this.setState({currentPage: (currentPage-1) });
        } else if(newPage==='»' && currentPage >= 1) {
            this.setState({currentPage: (currentPage+1) });
        } else {
            this.setState({currentPage: parseInt(newPage)});
        }
    },

    componentDidMount: function(){
        var that = this;

        function onDataLoad(data){
            that.setState({
                birthdayJSON: data,
                resultSet: data
            });
        }

        Tabletop.init({
            key: SPREADSHEET_KEY,
            callback: onDataLoad,
            simpleSheet: true
        });
    },

    render: function() {
        return (
            <div>
                <header>
                    <HeaderBar />
                    <InputBox
                        handleInputChange={this.handleInputChange}
                    />
                </header>
                <section className="container-fluid">
                    <MainContent
                        resultSet={this.state.resultSet}
                        currentPage={this.state.currentPage}
                        handlePaginationChange={this.handlePaginationChange}
                    />
                </section>
            </div>
        );
    }
});

React.renderComponent(
    <ListContainer />,
    document.body
);
