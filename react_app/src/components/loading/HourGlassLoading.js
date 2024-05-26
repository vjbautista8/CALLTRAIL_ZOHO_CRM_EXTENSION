import React from 'react';
import Wrapper from '../../wrappers/loading/HourGlassLoadingWrapper';
const HourGlassLoading = () => {
  return (
    <Wrapper>
      <div class='hourglassBackground'>
        <div class='hourglassContainer'>
          <div class='hourglassCurves'></div>
          <div class='hourglassCapTop'></div>
          <div class='hourglassGlassTop'></div>
          <div class='hourglassSand'></div>
          <div class='hourglassSandStream'></div>
          <div class='hourglassCapBottom'></div>
          <div class='hourglassGlass'></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default HourGlassLoading;
