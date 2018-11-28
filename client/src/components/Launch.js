import React, { Component, Fragment } from 'react';
import Spinner from './Spinner';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number){
                flight_number
                mission_name
                launch_year
                launch_success
                rocket{
                  rocket_id
                  rocket_name
                  rocket_type
                }
        }
    }
`;

export class Launch extends Component {
  render() {
      let { flight_number } = this.props.match.params;
      flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{flight_number}}>
            {
                ({loading, error, data}) => {
                    if(loading) return <Spinner />;
                    if(error) console.log(error);
                    const {
                        mission_name,
                        flight_number,
                        launch_year,
                        launch_success,
                        rocket: {
                            rocket_id,
                            rocket_name,
                            rocket_type
                        }
                    } = data.launch;
                    return <div>
                        <h1 className="dispaly-4 my-3"><span className="text-light">Mission: </span>
                            {mission_name}
                        </h1>
                        <h4 className="mb-3">Launch Details</h4>
                        <ul className="list-group">
                        <li className="list-group-item">
                            Flight Number: {flight_number}
                        </li>
                        <li className="list-group-item">
                            Launch Year: {launch_year}
                        </li>
                        <li className="list-group-item">
                            Launch Successfull: <span className={classNames({
                                'text-success': launch_success,
                                'text-danger': !launch_success
                            })}>{launch_success ? 'Yes' : 'No'}</span>
                        </li>
                        </ul>
                        <h4 className="my-3">Rocket Details</h4>
                        <ul className="list-group">
                        <li className="list-group-item">
                            Rocket Id: {rocket_id}
                        </li>
                        <li className="list-group-item">
                            Rocket Name: {rocket_name}
                        </li>
                        <li className="list-group-item">
                            Rocket Type: {rocket_type}
                        </li>
                        </ul>
                        <hr />
                        <Link to="/" className="btn btn-primary">Back</Link>
                    </div>
                }
            }
        </Query>
      </Fragment>
    )
  }
}

export default Launch
