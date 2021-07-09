import { BrowserRouter as Router, Route } from 'react-router-dom';

//routing
import PrivateRoute from './component/routing/PrivateRoute';

//Pages
import Login from './component/Pages/Login';
import Register from './component/Pages/Register';
import ResetPassword from './component/Pages/ResetPassword';
import ForgotPassword from './component/Pages/ForgotPassword';
import PrivatePage from './component/Pages/PrivatePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <PrivateRoute exact path="/" component={PrivatePage}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />
        <Route exact path='/resetPassword/:resetToken' component={ResetPassword} />
      </div>
    </Router>
  );
}

export default App;
