
var RunText = React.createClass({

    loadLastRunFromServer: function() {

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,

            success: function(data) {
                this.setState({data: data});
            }.bind(this),

            error: function(xhr, status, err) {
                console.error(this.props.url, status, err);
            }.bind(this)
        });
    },

    getInitialState: function() {
        return { data: {} };
    },

    componentDidMount: function() {
        this.loadLastRunFromServer();
    },

    render: function() {
        return (
            <div className="runText">
                <p>Bobby ran <span className="runText__number">{this.state.data.distance}</span> <span className="runText__unit">km</span></p>
            </div>
        );
    },
});

React.render(
    <RunText url="/runs" />,
    document.getElementById('content')
);