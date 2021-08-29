import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import businessModule from "./modules/business";
import personsModule from "./modules/persons";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={businessModule.containers.BusinessContainer} />
          <Route path="/persons/:businessId" component={personsModule.containers.PersonsContainer} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;