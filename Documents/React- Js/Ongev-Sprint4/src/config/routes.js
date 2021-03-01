/* eslint-disable react/jsx-key */
import React, {lazy} from 'react'
import {Route} from 'react-router-dom'
import PrivateRoute from "../components/PrivateRoute";



const SignIn = lazy(() => import('../pages/auth/Signin'))
const About = lazy(() => import('../pages/About'))
const Register = lazy(() => import('../pages/auth/Register'))
const CompanyRegister = lazy(() => import('../pages/auth/CompanyRegister'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const ConnectHealthcareNetwork = lazy( () => import('../pages/ConnectHealthcareNetwork'))
const AccountUpdate = lazy( () => import('../pages/AccountUpdate'))
const TreatmentInformation = lazy( () => import('../pages/TreatmentInformation'))
const TrialSearch = lazy( () => import('../pages/TrialSearch'))
const DiagnosisAdd = lazy( () => import('../pages/DiagnosisAdd'))
const EHRShow = lazy( () => import('../pages/EHRShow'))
const ConnectNetworkSuccess = lazy( () => import('../pages/successPages/ConnectNetworkSuccess'))
const ManualDiagnosisSuccess = lazy( () => import('../pages/successPages/ManualDiagnosisSuccess'))
const SentVerification = lazy( () => import('../pages/successPages/SentVerification'))
const HealthTimeline = lazy( () => import('../pages/HealthTimeline'))
const Notifications = lazy( () => import('../pages/Notifications'))
const HealthDetails = lazy( () => import('../pages/HealthDetails'))
const HealthRecordUpload = lazy( () => import('../pages/HealthRecordUpload'))
const Verify = lazy( () => import('../pages/auth/Verify'))
const SentPasswordReset = lazy( () => import('../pages/successPages/SentPasswordReset'))
const NewPassword = lazy( () => import('../pages/auth/NewPassword'))
const ResetPasswordSuccess = lazy( () => import('../pages/successPages/ResetPasswordSuccess'))
const NetworkFeedbackSuccess = lazy( () => import('../pages/successPages/NetworkFeedbackSuccess'))
const NoMatchPage = lazy( () => import('../pages/NoMatchPage'))
const InterestsAdd = lazy( () => import('../pages/InterestsAdd'))


const routes = [
    <Route key="/signin" path="/signin" redirectTo="/" exact component={SignIn}/>,
    <Route key="/path" path="/about" exact component={About}/>,
    <PrivateRoute key="/home" path="/home" exact component={Dashboard}/>,
    <Route key={"/verification/sent"} path={"/verification/sent"} exact component={SentVerification} />,
    <Route key={"/password/sent"} path={"/password/sent"} exact component={SentPasswordReset} />,
    <Route key={"/register/company/:code"} path={"/register/company/:code"} component={CompanyRegister} />,
    <Route key={"/register/company"} path={"/register/company"} exact component={CompanyRegister} />,
    <Route key={"/register"} path={"/register"} exact component={Register} />,
    <Route key={"/verify/email/:code"} path={"/verify/email/:code"} component={Verify} />,
    <Route key={"/verify/email"} path={"/verify/email"} exact component={Verify} />,
    <Route key={"/password/reset/:code"} path={"/password/reset/:code"} component={NewPassword} />,
    <Route key={"/password-success"} path={"/password-success"} exact component={ResetPasswordSuccess} />,
    <PrivateRoute key="/dashboard" path={"/dashboard"} exact component={Dashboard}/>,
    <PrivateRoute key={"/patient/healthcare/register"} path={"/patient/healthcare/register"} component={ConnectHealthcareNetwork}/>,
    <PrivateRoute key={"/patient/interests/add"} path={"/patient/interests/add"} component={InterestsAdd}/>,
    <PrivateRoute key={"/account/update"} path={"/account/update"} component={AccountUpdate}/>,
    <PrivateRoute key={"/diagnosis/information"} path={"/diagnosis/information"} component={TreatmentInformation}/>,
    <PrivateRoute key={"/trial/treatment-search"} path={"/trial/treatment-search"} component={TrialSearch}/>,
    <PrivateRoute key={"/patient/diagnosis/edit"} path={"/patient/diagnosis/edit"} component={DiagnosisAdd}/>,
    <PrivateRoute key={"/patient/diagnosis/success"} path={"/patient/diagnosis/success"} component={ManualDiagnosisSuccess}/>,
    <PrivateRoute key={"/EHR/show"} path={"/EHR/show"} component={EHRShow}/>,
    <PrivateRoute key={"/patient/healthcare/connect/success"} path={"/patient/healthcare/connect/success"} component={ConnectNetworkSuccess}/>,
    <PrivateRoute key={"/health-timeline"} path={"/health-timeline"} component={HealthTimeline}/>,
    <PrivateRoute key={"/notifications"} path={"/notifications"} component={Notifications}/>,
    <PrivateRoute key={"/health/details"} path={"/health/details"} component={HealthDetails}/>,
    <PrivateRoute key={"/patient/ehr/upload"} path={"/patient/ehr/upload"} component={HealthRecordUpload}/>,
    <PrivateRoute key={"/network/feedback/success"} path={"/network/feedback/success"} component={NetworkFeedbackSuccess}/>,
    <PrivateRoute key={"/"} path={"/"} exact component={Dashboard} />,
    <PrivateRoute key='404' exact component={NoMatchPage}/>
]

export default routes
