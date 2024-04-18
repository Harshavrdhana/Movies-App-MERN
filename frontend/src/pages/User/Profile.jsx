import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { useProfileMutation } from "../../redux/api/users"
import { setCredentials } from "../../redux/features/auth/authSlice"

const Profile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading: LoadingUpdateProfile }] = useProfileMutation() // isLoading renaming

  useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.email, userInfo.userName])

  const dispatch = useDispatch()

  const submitHandler=async (e)=>{
    e.preventDefault()

    if(password !== confirmPassword){
      toast.error("Passwords do not match")
    }else{
      try{
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          userInfo,
          email,
          password
        }).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('Profile updated successfully')
      }catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (

    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Confirm Password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600"
              >
                Update
              </button>
              {LoadingUpdateProfile && <Loader/>}
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Profile