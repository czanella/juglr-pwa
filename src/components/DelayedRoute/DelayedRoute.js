import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';

const isEmptyChildren = children => React.Children.count(children) === 0;

/**
 * The public API for matching a single path and rendering.
 */
class DelayedRoute extends React.Component {
    static propTypes = {
        computedMatch: PropTypes.object, // private, from <Switch>
        path: PropTypes.string,
        exact: PropTypes.bool,
        strict: PropTypes.bool,
        sensitive: PropTypes.bool,
        component: PropTypes.func,
        render: PropTypes.func,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        location: PropTypes.object
    };

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
            route: PropTypes.object.isRequired,
            staticContext: PropTypes.object
        })
    };

    static childContextTypes = {
        router: PropTypes.object.isRequired
    };

    initialMatch = this.computeMatch(this.props, this.context.router)

    state = {
        match: this.initialMatch,
        shouldDisassemble: !this.initialMatch,
        previousMatch: null,
        disassembleDone: !this.initialMatch,
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            match: this.computeMatch(nextProps, nextContext.router)
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.match && !this.state.match) {
            this.setState({
                shouldDisassemble: true,
                previousMatch: prevState.match,
            });
        } else if (!prevState.match && this.state.match) {
            this.setState({
                shouldDisassemble: false,
                previousMatch: null,
                disassembleDone: false,
            });
        }
    }

    getChildContext() {
        return {
            router: {
                ...this.context.router,
                route: {
                    location: this.props.location || this.context.router.route.location,
                    match: this.state.match
                }
            }
        };
    }

    computeMatch(
        { computedMatch, location, path, strict, exact, sensitive },
        router
    ) {
        if (computedMatch) return computedMatch; // <Switch> already computed the match for us

        const { route } = router;
        const pathname = (location || route.location).pathname;

        return matchPath(pathname, { path, strict, exact, sensitive }, route.match);
    }

    notifyDisassembleFinish = () => {
        this.setState({ disassembleDone: true });
    }

    render() {
        const { match, previousMatch, shouldDisassemble, disassembleDone } = this.state;
        const { children, component, render } = this.props;
        const { history, route, staticContext } = this.context.router;
        const location = this.props.location || route.location;
        const props = {
            match: match || previousMatch,
            location,
            history,
            staticContext,
            shouldDisassemble,
            notifyDisassembleFinish: this.notifyDisassembleFinish,
        };

        if (component) return !disassembleDone ? React.createElement(component, props) : null;

        if (render) return !disassembleDone ? render(props) : null;

        if (typeof children === "function") return children(props);

        if (children && !isEmptyChildren(children))
            return React.Children.only(children);

        return null;
    }
}

export default DelayedRoute;
