import React, { Component } from 'react';
import {BrowserRouter as  Router, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


// *****Pages
//Authentication
const Login = React.lazy(() => import('./Authentication/SignIn'));
const Logout = React.lazy(() => import('./Authentication/Signout'));
const Err404= React.lazy(() => import('./Authentication/Err404'));
const Forgotpassword= React.lazy(() => import('./Authentication/Forgot_password'));
const Recoverpassword= React.lazy(() => import('./Authentication/Recover_password'));
//Admin
const Admindashboard= React.lazy(() => import('./Admin/App'));
const Users= React.lazy(() => import('./Admin/views/Users'));
// //Redactor
const Redactordashboard= React.lazy(() => import('./Redactor/App'));
const Articles= React.lazy(() => import('./Redactor/views/Articles'));
// //Moderator
const Moderatordashboard= React.lazy(() => import('./Moderator/App'));
const ModeratorArticles= React.lazy(() => import('./Moderator/views/Articles'));
const Robots= React.lazy(() => import('./Moderator/views/Robots'));
const Robots_facebook= React.lazy(() => import('./Moderator/views/Robots_facebook'));
const Robots_youtube= React.lazy(() => import('./Moderator/views/Robots_youtube'));
const Robots_webSites= React.lazy(() => import('./Moderator/views/Robots_webSites'));
const Inbox= React.lazy(() => import('./Moderator/views/Inbox'));
const HealthAgentStatistics= React.lazy(() => import('./Moderator/views/HealthAgent_statistics'));
const RiskZones= React.lazy(() => import('./Moderator/views/RiskZones'));
const ClientVideos= React.lazy(() => import('./Moderator/views/Client_videos'));
const LogFile= React.lazy(() => import('./Moderator/views/Log_file'));

// //Health Agent
const HealthAgentdashboard= React.lazy(() => import('./HealthAgent/App'));
const HealthAgenthistoric= React.lazy(() => import('./HealthAgent/views/Historic'));

class App extends Component {

  render() {
    return (
      <Router>
          <React.Suspense fallback={loading()}>
            <Switch>
            {/*Authentication*/}
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/logout" name="Logout Page" component={Logout} />
            <Route exact path="/forgot_password" name="Forgot_password" component={ Forgotpassword}/>
            <Route exact path="/recover_password" name="Recover_password" component={ Recoverpassword}/>
            <Route exact path="/err404" name="ERR404" component={Err404}/> 
            {/*SuperAdmin*/}
            <Route exact path="/admin_dashboard" name="Admin_dashboard" component={ Admindashboard}/>
            <Route exact path="/admin_dashboard/home" name="Admin_home" component={Admindashboard}/>
            <Route exact path="/admin_dashboard/users" name="Admin_users" component={ Users}/> 
            {/*Redactor*/}
            <Route exact path="/redactor_dashboard" name="Redactor_dashboard" component={Redactordashboard}/>
            <Route exact path="/redactor_dashboard/home" name="Redactor_home" component={Redactordashboard}/>
            <Route exact path="/redactor_dashboard/articles" name="Redactor_articles" component={ Articles}/>
            {/*Moderator*/}
            <Route exact path="/moderator_dashboard" name="Moderator_dashboard" component={Moderatordashboard}/>
            <Route exact path="/moderator_dashboard/home" name="Moderator_home" component={Moderatordashboard}/>
            <Route exact path="/moderator_dashboard/articles" name="Moderator_articles" component={ModeratorArticles}/>
            <Route exact path="/moderator_dashboard/robots" name="Moderator_robots" component={Robots}/>
            <Route exact path="/moderator_dashboard/robots/robots_facebook" name="Moderator_robots_facebook" component={Robots_facebook}/>
            <Route exact path="/moderator_dashboard/robots/robots_youtube" name="Moderator_robots_youtube" component={Robots_youtube}/>
            <Route exact path="/moderator_dashboard/robots/robots_webSites" name="Moderator_robots_webSites" component={Robots_webSites}/>
            <Route exact path="/moderator_dashboard/inbox" name="Moderator_inbox" component={Inbox}/>
            <Route exact path="/moderator_dashboard/healthAgent_statistics" name="Moderator_healthAgent_statistics" component={HealthAgentStatistics}/>
            <Route exact path="/moderator_dashboard/riskZones" name="Moderator_risk_zones" component={RiskZones}/>
            <Route exact path="/moderator_dashboard/client_videos" name="Moderator_client_videos" component={ClientVideos}/>
            <Route exact path="/moderator_dashboard/log_file" name="Moderator_log_file" component={LogFile}/>
            {/*Health Agent*/}
            <Route exact path="/healthAgent_dashboard" name="HealthAgent_dashboard" component={HealthAgentdashboard}/>
            <Route exact path="/healthAgent_dashboard/historic" name="Historic" component={HealthAgenthistoric}/>
  
            {/*General*/}
            <Route exact path="/" name="Home" component={Login}  />
            <Route component={Login}/> 
            </Switch>
          </React.Suspense>
      </Router>
    );
  }
}

export default App;
