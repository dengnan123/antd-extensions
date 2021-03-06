import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import { isString } from '../helpers/object'

import 'antd/lib/tooltip/style/css'

function AuthWrapper(props) {
  const { value, children, noMatch, noMatchFeedback, matchKey, authorities } = props

  if (!authorities || !authorities.length) {
    return children
  }

  if (matchAuth(authorities, matchKey, value)) {
    return children
  }

  if (!noMatch) {
    return null
  }
  if (!noMatchFeedback) {
    return noMatch
  }

  return <Tooltip title={noMatchFeedback}>{noMatch}</Tooltip>
}

AuthWrapper.propTypes = {
  authorities: PropTypes.array,
  value: PropTypes.string,
  matchKey: PropTypes.string,
  noMatch: PropTypes.object,
  noMatchFeedback: PropTypes.string,
  children: PropTypes.any
}

export default AuthWrapper

export function matchAuth(authorities, matchKey, value) {
  return authorities.some(au => {
    if (isString(au)) {
      return au === value
    }

    if (!matchKey) {
      throw new Error(`matchKey cannot be empty if authorities isn't Array<String>`)
    }

    return au[matchKey] === value || (au.children && matchAuth(au.children, matchKey, value))
  })
}
