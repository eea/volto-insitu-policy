import React from 'react';

import { Image } from 'semantic-ui-react';

const SubFooter = (props) => {
  if (props.children) {
    return <div>{props.children}</div>;
  }

  return (
    <div className={'subfooter'}>
      <div className="subfooter-logo-container">
        {props.managedBy &&
          props.managedBy.map((manager) => (
            <a href={manager.url} key={manager.src}>
              <Image src={manager.src} alt={manager.alt} loading="lazy"></Image>
            </a>
          ))}
      </div>
    </div>
  );
};

export default SubFooter;
