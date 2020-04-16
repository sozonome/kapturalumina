import React from 'react'
import { IonRouterOutlet } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

export default function AuthOnlyRouting() {
  return (
    <IonRouterOutlet id="auth">
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </IonRouterOutlet>
  )
}
