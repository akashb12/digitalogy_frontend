import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoPage from "./components/TodoPage";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <div>
            <Route exact path="/" component={TodoPage} />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
