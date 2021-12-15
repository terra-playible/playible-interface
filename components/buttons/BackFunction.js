import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import {BrowserView, MobileView} from 'react-device-detect'
import Image from 'next/image'

const BackFunction = (props) => {
  const { prev } = props;
return(
    <div className="ml-7 text-indigo-buttonblue flex flex-row">
      <a href={`${prev}`} className="flex flex-row">
        <img src='/images/navicons/icon_back.png' />
        <div className="mt-0.25">Back</div>
      </a>  
    </div>
)};

BackFunction.defaultProps = {
  imagesrc: '/images/navicons/icon_back.png',
};

export default BackFunction;