import { Routes, Route } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import SignInForm from '@/_auth/forms/SigninForm'
import SignUpForm from '@/_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
// import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from '../_root/pages'
import { Toaster } from "@/components/ui/toaster"
import  './global.css'
// import RequireAuth from './components/shared/RequiredAuth/index'

import Explore from './_root/pages/Explore'
import Saved from './_root/pages/Saved'
import CreatePost from './_root/pages/CreatePost'
import EditPost from './_root/pages/EditPost'
import UpdateProfile from './_root/pages/UpdateProfile'
import PostDetails from './_root/pages/PostDetails'
import AllUsers from './_root/pages/AllUsers'
import Profile from './_root/pages/Profile'
import { Home } from './_root/pages'
const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App