const ToggleSignupModeButton = ({
  signupMode,
  setSignupMode,
  setShowStep2,
  clearErrorMessages
}) => (
  <button
    type="button"
    onClick={() => {
      clearErrorMessages()
      setSignupMode(!signupMode)
      setShowStep2(false)
    }}
    className="mt-5 w-full cursor-pointer rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-accent-main hover:bg-neutral-100"
  >
    <p>
      {signupMode
        ? 'Already have an account? Log in'
        : "Don't have an account? Sign up"}
    </p>
  </button>
)

export default ToggleSignupModeButton
