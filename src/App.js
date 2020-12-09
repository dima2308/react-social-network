import './App.css';
import React from 'react'
import { connect } from 'react-redux'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import { BrowserRouter, Route } from 'react-router-dom'
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader';
import { WithSuspense } from './hoc/WithSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    } else {
      return (
        <BrowserRouter>
          <HeaderContainer />
          <div className="app-wrapper">
            <Navbar />
            <main className="app-wrapper-content">
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/dialogs' render={WithSuspense(DialogsContainer)} />
              <Route path='/news' component={News} />
              <Route path='/music' component={Music} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/login' render={() => <Login />} />
            </main>
          </div>
          <Footer />
        </BrowserRouter>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App)