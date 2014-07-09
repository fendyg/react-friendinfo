var SPREADSHEET_KEY = '1VDG_nQPLKLkOvdAb9b4_DKA34fBuob7MYiE27y8sGkA',
    SITE_TITLE = 'ReactFriendlist',
    INPUT_PLACEHOLDER_TXT = 'Type a name..',
    LOADING_STRING = 'loading',
    filterConditions= [
        function inName(num, query) {return num.fullname.toLowerCase().indexOf(query.toLowerCase()) >= 0; },
        function inNick(num, query) {return num.nickname.toLowerCase().indexOf(query.toLowerCase()) >= 0;}
    ];

_.mixin({
    invokeWith: function() {
        var args = arguments;
        return function(fn) {
             return fn.apply(null, args);
        };
    }
});
