import React from 'react';
import { Col, Infobox } from 'adminlte-2-react';

const data = [
  {
    icon: 'ion-ios-gear-outline',
    color: 'aqua',
    number: [90, <small key="temp">%</small>],
    text: 'CPU TRAFFIC',
  },
  {
    icon: 'fab-google-plus-g',
    color: 'red',
    number: '41,410',
    text: 'Likes',
  },
  {
    icon: 'ion-ios-cart-outline',
    color: 'green',
    number: '760',
    text: 'Sales',
  },
  {
    icon: 'ion-ios-people-outline',
    color: 'yellow',
    number: '2,000',
    text: 'New Members',
  },
];

const UpperInfoBoxes = () =>
  data.map((props, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Col key={`upperInfoBox${index}`} xs={12} sm={6} md={3}>
      <Infobox {...props} />
    </Col>
  ));

export default UpperInfoBoxes;
