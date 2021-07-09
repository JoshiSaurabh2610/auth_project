import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(localStorage.getItem("authToken"));
    return (
        <div>
            <Route
                {...rest}
                render = { (props) => {
                        return localStorage.getItem("authToken") ? (
                            <Component {...props} />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                }
            />
        </div>
    )
}

export default PrivateRoute;