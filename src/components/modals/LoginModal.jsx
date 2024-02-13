import { useState } from 'react'
import { Modal } from '@mui/base/Modal'
import {
  signInWithEmail,
  signUpNewUser
} from '../../utils/supabase/auth/session'
import { convertAuthErrorMessage } from '../../utils/constants/errorMessages'
import FormTextInput from './LoginModal/FormTextInput'
import LoadingAnimation from './LoginModal/LoadingAnimation'
import ModalTitleBar from './LoginModal/ModalTitleBar'
import DateOfBirthSelector from './LoginModal/DateOfBirthInputs'
import FormSubmitButtons from './LoginModal/FormSubmitButtons'
import ToggleSignupModeButton from './LoginModal/ToggleSignupModeButton'

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// ! check for missing fields in signup step 1 before continuing to step 2

const LoginModal = ({
  closeLoginModal,
  openLoginModal,
  signupMode = false,
  setSignupMode
}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [username, setUsername] = useState('@')
  const [displayName, setDisplayName] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [dateOfBirthError, setDateOfBirthError] = useState('')
  const [nameError, setNameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [displayNameError, setDisplayNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwdError, setPasswdError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showStep2, setShowStep2] = useState(false)

  const step1IsValid = () => !!(email && passwd)
  const step2IsValid = () =>
    !!(username && displayName && birthDay && birthMonth && birthYear)

  const showMissingStep1Values = () => {
    setEmailError(email ? '' : 'This field is required')
    setPasswdError(passwd ? '' : 'This field is required')
  }

  const showMissingStep2Values = () => {
    setUsernameError(username ? '' : 'This field is required')
    setDisplayNameError(displayName ? '' : 'This field is required')
    setDateOfBirthError(
      !birthDay || !birthMonth || !birthYear ? '' : 'Date of birth is not valid'
    )
  }

  const clearErrorMessages = () => {
    setDateOfBirthError('')
    setEmailError('')
    setErrorMessage('')
    setPasswdError('')
    setUsernameError('')
  }

  const submitLogin = async (e) => {
    clearErrorMessages()
    if (e) e.preventDefault()
    if (email && passwd) {
      setIsSubmitting(true)
      const result = await signInWithEmail(email, passwd)
      console.log('result', result)
      if (result && result.success) {
        if (window && window.location) window.location.reload()
      } else {
        // if (result.error) {
        //   setErrorMessage(convertAuthErrorMessage(result.error))
        // }
        setErrorMessage('Failed to log in')
      }
      setIsSubmitting(false)
    }
  }

  const checkSignupValues = () => {
    console.log('submitSignup', email, username, displayName)
    if (email && passwd && username && displayName) return true
    console.log('missing signup fields')
    return false
  }

  const formatDateOfBirth = (day, month, year) => {
    if (day && month && year) return `${day.value}/${month.value}/${year.value}`
    return null
  }

  // ? make username lowercase, input as lowercase only
  const submitSignup = async (e) => {
    clearErrorMessages()
    if (e) e.preventDefault()

    const dateOfBirth = formatDateOfBirth(birthDay, birthMonth, birthYear)
    console.log('dateOfBirth', dateOfBirth)

    if (checkSignupValues()) {
      setIsSubmitting(true)
      const result = await signUpNewUser(
        email,
        passwd,
        username,
        displayName,
        dateOfBirth
      )

      // console.log('signup result', result)
      if (result) {
        if (result.errorCode) {
          setErrorMessage(convertAuthErrorMessage(result.errorCode))
        }
      } else {
        setErrorMessage('Failed to connect')
      }
      setIsSubmitting(false)
      // switch to a successful signup view giving them the choice to customize their account or continue on the current page i.e reload
      if (window && window.location) window.location.reload()
      return { success: true }
    }
    return { success: false }
  }

  return (
    <Modal
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      onClose={null}
      open={openLoginModal}
      className="fixed inset-0 z-[1300] select-none overflow-y-auto overflow-x-hidden bg-black bg-opacity-70"
    >
      <div className="page_padding_x absolute flex min-h-full w-full items-center justify-center py-8">
        <div className="box_radius modal_shadow w-full max-w-md bg-white">
          {/* section: title and close button ------------------------- */}

          <ModalTitleBar
            signupMode={signupMode}
            setShowStep2={setShowStep2}
            clearErrorMessages={clearErrorMessages}
            closeLoginModal={closeLoginModal}
          />

          {/* section: form ------------------------- */}

          <div className="px-6 pb-6 pt-3">
            <form onSubmit={!signupMode ? submitLogin : submitSignup}>
              {/* section: email and password ------------------------- */}

              <div className={`w-full ${showStep2 && 'hidden'}`}>
                <FormTextInput
                  required
                  type="email"
                  title="Email"
                  value={email}
                  setValue={setEmail}
                  error={emailError}
                />
                <FormTextInput
                  required
                  type="password"
                  title="Password"
                  value={passwd}
                  setValue={setPasswd}
                  error={passwdError}
                />
              </div>

              {/* section: name and username ------------------------- */}

              <div className={`${!showStep2 && 'hidden'}`}>
                <FormTextInput
                  required
                  type="text"
                  title="Name"
                  value={displayName}
                  setValue={setDisplayName}
                  error={displayNameError}
                />
                <FormTextInput
                  required
                  type="text"
                  title="Handle"
                  value={username}
                  setValue={setUsername}
                  error={usernameError}
                />
                <DateOfBirthSelector
                  // birthDay={birthDay}
                  // birthMonth={birthMonth}
                  // birthYear={birthYear}
                  dateOfBirthError={dateOfBirthError}
                  setBirthDay={setBirthDay}
                  setBirthMonth={setBirthMonth}
                  setBirthYear={setBirthYear}
                />
              </div>

              {/* section: password reset text ------------------------- */}

              <div
                className={`flex w-full pt-5 text-xs ${showStep2 && 'hidden'}`}
              >
                {signupMode ? (
                  <p className="py-1">Step 1 of 2</p>
                ) : (
                  <button
                    type="button"
                    className="cursor-pointer py-1 text-accent-main hover:underline"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>

              {/* section: logging in or signing up loader ------------------------- */}

              <LoadingAnimation
                signupMode={signupMode}
                isSubmitting={isSubmitting}
              />

              {/* section: terms and conditions ------------------------- */}
              {/* open terms and policy links in a new tab */}

              <div
                className={`mt-8 pb-2 text-xs text-neutral-500 ${
                  (!signupMode && 'hidden') || (!showStep2 && 'hidden')
                }`}
              >
                By creating an account, I agree to the{' '}
                <span className="cursor-pointer font-semibold text-accent-blue hover:underline">
                  Terms
                </span>{' '}
                and{' '}
                <span className="cursor-pointer font-semibold text-accent-blue hover:underline">
                  Privacy Policy
                </span>
                .
              </div>

              {/* section: main error message ------------------------- */}

              <div
                className={`box_radius mt-6 bg-red-50 px-3 py-2 text-sm text-red-600 ${
                  !errorMessage && 'hidden'
                }`}
              >
                {errorMessage}
              </div>

              {/* section: form submit button ------------------------- */}

              <FormSubmitButtons
                showStep2={showStep2}
                signupMode={signupMode}
                submitLogin={submitLogin}
                isSubmitting={isSubmitting}
                setShowStep2={setShowStep2}
                submitSignup={submitSignup}
                step1IsValid={step1IsValid}
                step2IsValid={step2IsValid}
                showMissingStep2Values={showMissingStep2Values}
                showMissingStep1Values={showMissingStep1Values}
              />
            </form>

            {/* section: toggle signup mode  ------------------------- */}

            <ToggleSignupModeButton
              signupMode={signupMode}
              setShowStep2={setShowStep2}
              setSignupMode={setSignupMode}
              clearErrorMessages={clearErrorMessages}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal
