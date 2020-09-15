import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ percentage }) => {
  return (
    //? line-height in progress is wrong in some way! ?
    <div className='progress mb-4 line-height:1.25!important'>
      <div
        className='progress-bar progress-bar-striped bg-success '
        role='progressbar'
        style={{ width: `${percentage}%` }} //lenght of the progressbar
        // aria-valuenow='25'
        // aria-valuemin='0'
        // aria-valuemax='100'
      ></div>
      {percentage}%
    </div>
  )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired, //the props is percentage
}

export default Progress
