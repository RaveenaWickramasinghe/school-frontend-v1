import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Student from './pages/student/add/student';
import StudentView from './pages/student/view/student_view';
import ExaminationPage from './pages/examination/teacher/view/examination_page';
import Examination from './pages/examination/teacher/view/examination';

function PageRoutes() {
  return (
    <div>
      <div className="container">
        <Router>
          <section>
            <Switch>
              <Route path="/student/view" component={StudentView} exact />
              <Route path="/examination/:id" component={Examination} />
              <Route path="/examination" component={ExaminationPage} />
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default PageRoutes;
