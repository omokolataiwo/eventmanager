import React from 'react';
import error404Img from '../../images/e404.gif';

export default () => (
  <div className="center" style={{ marginTop: '100px' }}>
    <h3 style={{ marginBottom: '50px' }}>Resource Not Found!</h3>
    <hr />
    <img src={error404Img} />
  </div>
);
