import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        let styles = {
            bannerText: {
                color: "#000000",
                fontSize: "20px"
            },
            button: {
                marginTop: "1em",
                cursor: "pointer"
            }
        }
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row">
                            <div className="col s4">
                                <h3>Recent Work</h3>
                                {data.logos.sort(function(a, b){return b.lastUpdate > a.lastUpdate}).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    GoLogoLo<br />
                                   <div id="home_subbanner_container" style={styles.bannerText}> 
                                   Interactive Logo Maker</div>
                                </div>
                                <button
                                    style={styles.button}>
                                    <Link id="add_logo_button" to="/create" style={{ textDecoration: 'none', color: "#000000" }}>Create a Logo</Link>
                                </button>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
