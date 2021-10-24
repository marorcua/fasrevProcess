import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Profile from '../pages/Profile/Profile'

const Routes = ({ storeUser, loggedUser }) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home storeUser={storeUser} />} />
            <Route path="/validate/:token" render={() => <Home />} />
            <Route path="/profile" exact render={props => <Profile loggedUser={loggedUser} {...props} />} />
        </Switch>
    )
}

export default Routes