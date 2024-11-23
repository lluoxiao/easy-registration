import React from "react";

function useLocalContext() {
  let context
  return () => {
    if (!context) {
      context = React.createContext(null)
    }
    return context
  }
}

export default useLocalContext()