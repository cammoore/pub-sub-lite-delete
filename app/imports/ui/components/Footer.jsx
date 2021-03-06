import React from 'react';

const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
          Department of Information and Computer Sciences <br />
          University of Hawaii<br />
          Honolulu, HI 96822 <br />
        </div>
      </footer>
  );
};

export default Footer;
