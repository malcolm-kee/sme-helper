import React from 'react';
import { Link } from 'react-router-dom';

import StackedPage from '../../../components/StackedPage';

const AwesomeDetails = () => (
  <StackedPage navTitle="Awesome Details">
    <div>
      <h1>Details heading1</h1>
      <p>
        <Link to="/overview/bad-details">See not awesome details</Link>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, minima!
        Assumenda architecto, fugiat porro, vel quod, doloremque dolore odit cupiditate ex
        voluptatum cumque necessitatibus. Repellat maiores hic vero eius minus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam laboriosam
        explicabo mollitia nobis est illo culpa illum doloribus animi. Culpa eveniet
        doloribus porro consequatur expedita rerum voluptate. A, molestias asperiores!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ducimus
        laborum natus officiis excepturi ipsam hic similique, tempore minus, qui, iure
        sequi deleniti culpa numquam porro in eos? Inventore, nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad consequuntur porro
        vero distinctio quibusdam tempore quia explicabo, cupiditate ab aliquid laudantium
        beatae dolorum expedita incidunt placeat. Delectus, corporis! Sint, praesentium!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, tempore sunt.
        Nesciunt perspiciatis aperiam odio cupiditate voluptatum ea, reiciendis cum,
        laudantium iure, commodi recusandae! Illum tempora ipsam quis eaque sint.
      </p>
    </div>
  </StackedPage>
);

export default AwesomeDetails;
