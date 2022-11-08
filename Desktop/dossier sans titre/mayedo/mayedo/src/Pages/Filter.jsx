import React from 'react';
import {Link} from 'react-router-dom';

function  Filter () {
            
    return (
      <div>
        <div className="filter--home">
            <div className="filter--home--content">
                  <div className="filter--home--content--box">
                  <Link className= "liste" to="/appartement"><p>APPARTEMENTS</p></Link>
                  </div>
                  <div className="filter--home--content--box">
                  <Link className= "liste" to="/villa"><p>VILLAS</p></Link>
                  </div>
            </div>
          </div>
        </div>

    );
}

export default Filter;
