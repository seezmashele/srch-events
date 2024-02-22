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
    className="base_button_styles text-accent-bluef mt-5 w-full text-center hover:bg-neutral-100"
  >
    <p>
      {signupMode
        ? 'Already have an account? Log in'
        : "Don't have an account? Sign up"}
    </p>
  </button>
)

export default ToggleSignupModeButton
