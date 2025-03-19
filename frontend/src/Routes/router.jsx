import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(()=>import('../pages/Login'))
const Register = lazy(()=>import('../pages/Register'))
const TaskPage = lazy(()=>import('../pages/Tasks'))
const Feedback = lazy(()=>import('../pages/Feedback'))
const PageNotFound = lazy(()=>import('../pages/page404'))
const Onboarding = lazy(()=>import('../pages/Onboarding'))

export const MainRouter = ()=>{
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element = {<Onboarding/>}/>
                <Route path="/login" element = {<Login/>}/>
                <Route path="/register" element = {<Register/>}/>
                <Route path="/tasks" element = {<TaskPage/>}/>
                <Route path="/feedback" element = {<Feedback/>}/>
                <Route path="*" element = {<PageNotFound/>}/>
            </Routes>
        </Suspense>
    )
}