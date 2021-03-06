import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { PatientListFromApi } from "./state/reducer";
import PatientListPage from "./PatientListPage";
import PatientInfo from "./components/PatientInfo";
import { Diagnosis } from "./types";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void PatientListFromApi().then((data) => {
      if (data != undefined) {
        dispatch(data);
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    async function fetchDiagnosis() {
      try {
        const { data: diagnosisData } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch({
          type: "GET_DIAGNOSIS",
          payload: diagnosisData,
        });
      } catch (error) {
        console.log(error);
      }
    }
    void fetchDiagnosis();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientInfo />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
