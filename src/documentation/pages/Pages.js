import React, {Component} from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/styles/prism';
import ProductCard from '../../pages/products/components/ProductCard/ProductCard';
import products from '../../pages/products/mock'
import { Link } from 'react-router-dom';

import Widget from '../../components/Widget/Widget';
import Scrollspy from "./ScrollSpyComponent";

export default class Pages extends Component {
  render() {
    return (
      <Row>
        <Col md={10}>
          <Breadcrumb>
            <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
            <BreadcrumbItem>Documentation</BreadcrumbItem>
            <BreadcrumbItem active>Pages</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col lg={9}>
          <Widget id="Auth">
            <h3>Auth</h3>
            <p>Auth is a built-in module for an admin template dashboard. It contains all actions and handlers for any token authorization for your application.</p>
            <p>All logic is in <code>src/actions/user.js</code> and <code>src/reducers/user.js</code>. You need to change <code>loginUser</code> function to get this work with your backend. <code>Creds</code> variable contains user login and password entered in the login form. You should do request to your server to get token and save it in <code>localStorage</code>.</p>
            <p><b>Important note.</b> Credentials validation must be on the server side.</p>
            <p>Another important part of authentication is <code>PrivateRoute</code> component. That’s how it looks like.</p>
            <SyntaxHighlighter language='javascript' style={tomorrow}>{'const PrivateRoute = ({ component, ...rest }) => {\n' +
            '  return (\n' +
            '    <Route {...rest} render={props => (\n' +
            '      localStorage.getItem(\'id_token\') ? (\n' +
            '        React.createElement(component, props)\n' +
            '      ) : (\n' +
            '        <Redirect\n' +
            '          to={{\n' +
            '            pathname: \'/login\',\n' +
            '            state: { from: props.location }, \n' +
            '          }}\n' +
            '        />\n' +
            '      )\n' +
            '    )}\n' +
            '  />\n' +
            ')};'}</SyntaxHighlighter>
            <p>We are getting id_token from local storage, that must be saved in local storage after successful loginUser function completion. Depends on the result of this action, we <code>PrivateRoute</code> returns page (react component) or redirect to the login page. If you don’t need login functionality in your app, you can use Route instead of <code>PrivateRoute</code>.</p>
          </Widget>
          <Widget id="Inbox">
            <h3>Inbox</h3>
            <p>Inbox is a ready-to-use application with all needed features. It’s easy to understand and customize. The code is divided into components, so you can easily change the layout of your application.</p>
            <ul>
              <li>Messages filter & search</li>
              <li>Compose</li>
              <li>Read/unread, star/unstar, delete actionsy</li>
              <li>Message attachments</li>
              <li>Reply functionality</li>
            </ul>
            <Link className="btn btn-primary" to="/app/inbox">Demo</Link>
          </Widget>
          <Widget id="Dashboards">
            <h3>Dashboards</h3>
            <p>The main screen of any application built on the top of the admin dashboard template. That is more informative pages of all application. There are 2 types of dashboards: analytics and visits.</p>
            <p>Analytics one. There you can find a lot of chart and statistics, calendar, todo manager, table with any data you need, notifications block.</p>
            <p>Main chart made with D3.js library, most powerful charts library. Other components are just a plain markup with state</p>
            <p>Visits dashboard page can be used for real-time displaying users & traffic data. It is a big vector map made with mapael in the center of this dashboard, that can display any region of the world with any data you want on hover action.</p>
            <p>All of this component can be used on any page of the application.</p>
            <p>
              <Link className="btn btn-primary mr-sm" to="/app/inbox">Analytics</Link>
              <Link className="btn btn-primary" to="/app/inbox">Visits</Link>
            </p>
          </Widget>
          <Widget id="E-Commerce">
            <h3>E-commerce</h3>
            <p>E-commerce is a group of two pages: product list and product details. Must have a page if you are doing something similar to marketplace or shop.</p>
            <p>Analytics one. There you can find a lot of chart and statistics, calendar, todo manager, table with any data you need, notifications block.</p>
            <p>Products page is a list of ProductCard component. <code>ProductCard</code>  component used to display product image, price, label, the small description in a proper way.</p>
            <p>Product details is a detailed product card with a lot informative description.</p>
            <p>Examples of <code>ProductCard</code> component</p>
            <Row>
              <Col md={6}>
                <ProductCard {...products[1]} />
              </Col>
              <Col md={6}>
                <ProductCard {...products[3]} />
              </Col>
            </Row>
            <p>
              <Link className="btn btn-primary mr-sm" to="/app/ecommerce/products">List</Link>
              <Link className="btn btn-primary" to="/app/ecommerce/product">Details</Link>
            </p>
          </Widget>
        </Col>
        <Col lg={3}>
          <Scrollspy
            title="PAGES"
            prefix="pages"
            ids={[
            'Auth',
            'Inbox',
            'Dashboards',
            'E-Commerce',
          ]} />
        </Col>
      </Row>
    )
  }
}
