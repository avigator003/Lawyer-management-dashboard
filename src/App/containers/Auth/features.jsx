import React, { Component } from 'react'
import Navigation from '../../components/HomePage/navigation'
import Footer from '../../components/HomePage/footer'
import Contactimg from '../../components/img/Lawyer-Blog.png'
import dashboard from '../../components/img/dashboard.png'
import Case from '../../components/img/case.png'
import calendar from '../../components/img/calendar.png'
import contact from '../../components/img/contact.png'
import account from '../../components/img/account.png'
import axios from 'axios'
import api, { apiUrl } from '../../../resources/api'

export class Features extends Component {
  state = {
    features: [],
    data: {}
  };

  componentDidMount() {
    axios.get(`${apiUrl}/features/showall`)
      .then(res => {
        this.setState({
          features: res.data.data,
        });
      })
    api.get(`/footer/showall/`).then((res) => {
      //console.log(res.data.data[res.data.data.length - 1],'.........features')
      if (!res.data.data[res.data.data.length - 1].featuresTitle) {
        res.data.data[res.data.data.length - 1].featuresTitle = "";
      }
      this.setState({
        ...this.state, data: res.data.data[res.data.data.length - 1]
      });
    })
  }

  render() {
    const handleRoute = (route) => {
      console.log(route)
      this.props.history.push(route)
    }
    return (
      <>
        <Navigation />
        <div className="container">
          <div className="row mb-5">
            <div className="banner-text col-lg-8 p-5 section-title">
              <h2 className="text-center">FEATURES</h2>
              <p className="pt-3 text">{this.state.data.featuresTitle}</p>
            </div>
            <div className="banner-img col-lg-4">
              <img src={Contactimg} width="90%" alt="Banner Img" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <img className="img-fluid" src="https://legodesk.com/intro_css_js/images/feature-laptop.png" alt="img" />
            </div>
            <div className="work_inner row d-flex justify-content-between mx-2">
              {this.state.features.map(feature =>
                <div className="col-lg-4 d-flex align-items-stretch overflow-hidden" key={feature.id}>
                  <div className="work_item w-100 align-items-center">
                    <img className="img-fluid" src={dashboard} alt="img" />
                    <a><h4 className="text-break">{feature.title}</h4></a>
                    <p className="text-break">{feature.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer handleRoute={handleRoute} />
      </>
    )
  }
}
export default Features