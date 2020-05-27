import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error:any){
    return {error:error}
  }
  componentDidCatch(error:any, info:any){
    console.log(error)
    console.log(info)
  }
  render() {
    if(this.state.error){
      return <p>Something Broke</p>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
