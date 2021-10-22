import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'

const Routes = ({ storeUser, loggedUser, handleAlert, updateCartNumber }) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/validate/:token" render={() => <Home />} />
            {/* <Route path="/signup" exact render={props => <InitialSignup  />} />
            <Route path="/login" exact render={props => <Login storeUser={storeUser}  />} /> */}
        </Switch>
    )
}

export default Routes