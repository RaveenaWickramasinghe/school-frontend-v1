import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import { getAllStudents } from '../../../actions/student_actions';
import Student from '../add/student';

const { SearchBar } = Search;

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.getAllStudents();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getallstudents !== nextProps.getallstudents) {
      this.setState({ students: nextProps.getallstudents });
    }
  };

  tableColumData = [
    {
      dataField: '_id',
      text: 'Student ID',
      formatter: (cell) => this.setIdFormatter(cell),
      headerStyle: () => {
        return { width: '150px' };
      },
    },
    {
      dataField: 'firstname',
      text: 'Name',
      formatter: (cell, row) => this.setNameFormatter(cell, row),
    },
    {
      dataField: 'lastname',
      text: 'Last Name',
      formatter: (cell, row) => this.setNameFormatter(cell, row),
    },
    {
      dataField: 'email',
      text: 'Email',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: 'phonenumber',
      text: 'Phone number',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: 'username',
      text: 'Username',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
  ];

  setIdFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-warning text-dark">
        {cell}
      </p>
    );
  }

  setNameFormatter(cell, row) {
    return (
      <div>
        <img src={row.imageurl} className="user-img" />
        &nbsp;&nbsp;
        <p className="m-0 badge user-badge rounded-pill bg-custom-light text-dark">
          {row.firstname}&nbsp;&nbsp;{row.lastname}
        </p>
      </div>
    );
  }

  setFieldFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-custom-light text-dark">
        {cell}
      </p>
    );
  }

  setDateFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-custom-light text-dark">
        {moment(cell).format('lll')}
      </p>
    );
  }

  expandRow = {
    showExpandColumn: true,
    renderer: (row) => (
      <div className="row">
        <div className="col-md-6">
          <h6>Student Information</h6>
          <div className="row">
            {row.students.length < 0 &&
              row.students.map((student, index) => {
                <div className="mb-1 col-md-4" key={index}>
                  <img src={student.imageurl} className="student-img" />
                  &nbsp;&nbsp;&nbsp;
                  <h6 className="person-info m-0">
                    {student.firstname}&nbsp;{student.lastname}
                  </h6>
                  <p>
                    <i className="fas fa-at"></i>&nbsp;&nbsp;{student.username}
                  </p>
                  <p>
                    <i className="fas fa-at"></i>&nbsp;&nbsp;{student.password}
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i>&nbsp;&nbsp;
                    {student.achievements}
                  </p>
                  <p>
                    <i className="fas fa-phone"></i>&nbsp;&nbsp;{student.parent}
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i>&nbsp;&nbsp;
                    {student.email}
                  </p>
                  <p>
                    <i className="fas fa-phone"></i>&nbsp;&nbsp;{student.phone}
                  </p>
                </div>;
              })}
          </div>
        </div>
      </div>
    ),
  };

  render() {
    return (
      <div className="container p-4">
        <div className="card p-3">
          <h3 className="users-title">Students Page</h3>
          <button
            className="btn btn-primary btn-rounded btn-no-shadow"
            data-mdb-toggle="modal"
            data-mdb-target="#create-student"
          >
            Create a new Student
          </button>
          <ToolkitProvider
            keyField="_id"
            data={this.state.students}
            columns={this.tableColumData}
            search
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search students by name"
                  className="mb-3"
                />
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  bordered={false}
                  striped
                  hover
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  expandRow={this.expandRow}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <Student />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getallstudents: state.studentReducer.getallstudents,
});

const mapDispatchToProps = (dispatch) => ({
  getAllStudents: () => {
    dispatch(getAllStudents());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentView);
