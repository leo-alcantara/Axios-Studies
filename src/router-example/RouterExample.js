import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useLocation, Redirect } from 'react-router-dom';

//<Router> is responsible to create a history object
//<Switch> component is responsible to render only the first child or <Rout> the matches the path
const RouterExample = () => {
    return (
        <div className="container">
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/welcome" component={Welcome}/>
                    <Route path="/form" component={RegisterForm}/>
                    <Route path="/home" component={Home}/>
                    <Redirect from="/contactUs" to="about"/>

                    <Route path="/about" component={About}/>
                    <Redirect from="/personInformation/:id" to="data/:id"/>
                    <Route path="/data/:id" component={ShowData}/>
                    <Route path="/error" component={ErrorPage}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
};

const Header = () => {
    return(
        <Fragment>
           <ul className="nav nav-pills nav-fill bg-dark text-white">
               <li className="nav-item">
                <Link className="nav-link text-white" to="/home">Home</Link>
               </li>
               <li className="nav-item">
               <Link className="nav-link text-white" to="/welcome">Welcome</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-white" to="/form">Register</Link>
                </li>
           </ul>
        </Fragment>
    )
};


const Home = () => {
    const history = useHistory();
return(
    <Fragment>
        Home Page
        <br/>
        <a href="#" className="btn btn-outline-danger" onClick={() => history.goBack()}>Back</a>
        <a href="#" className="btn btn-outline-primary" onClick={() => history.push('/about')}>To About Us</a>

    </Fragment>
)
};

const Welcome = () => {
    return(
        <Fragment>
            Welcome Page
        </Fragment>
    )
};



const About = () => {
    return(
        <Fragment>
            About Us
        </Fragment>
    )
};

const NotFound = () => {
    return(
        <Fragment>
            Page Not Found
        </Fragment>
    )
};


const RegisterForm = () => {
    const [id, setId] = useState(0);
    const history = useHistory();

    const redirectToData = () => {
        //const data = {id: id, name: 'Test'};
        history.push('/data/' + id);

    };

    return(
        <Fragment>
            <div className="row">
                <div className="col-6">
                    <input type="text" name="id" className="form-control" onChange={(e) => setId(e.target.value)} placeholder="Enter ID"/>
                </div>
                <div className="col-6">
                    <button type="button" className="btn btn-info" onClick={redirectToData}>Submit</button>
                </div>
            </div>
        </Fragment>
    )
};

const ShowData = () => {
    let params = useParams();
    //const location = useLocation();
   const [id, setId] = useState();
   const [person, setPerson] = useState({id: 0, name: ''});

   useEffect(()=>{
       setId(params.id);
       //console.log(location.state);
       //setPerson({id: location.state.id, name: location.state.name});
   }, []);

   if(id == 0){
       return <Redirect to={
           {
           pathname: "/error",
           state: {message: "Param is not valid!"}
       }
    } />
   }
    return (
        <Fragment>
        <b>Id number is: {id}</b>
        </Fragment>
    );
};

const ErrorPage = () => {
    const location = useLocation();
    return (
        <b>Error: {location.state.message}</b>
    );
};




export default RouterExample;