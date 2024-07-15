
import React, { createContext, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducers'

// Creating context with a default value
export const DataContext = createContext({
  data: {
    registered: false
  },
  dispatch: () => null // Providing a noop function as a default dispatch
})

const initialState = {
  registered: false
}

const DataContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialState)

  // Value object clearly defined for context provider
  const value = { data, dispatch }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataContextProvider
