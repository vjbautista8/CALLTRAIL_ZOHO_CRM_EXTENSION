import React from 'react';

const Card = ({ data }) => {
  return (
    <>
      <div className={data?.className}>
        {data?.title}
        {data?.content}
      </div>
    </>
  );
};

export default Card;
