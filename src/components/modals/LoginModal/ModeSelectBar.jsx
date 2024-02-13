const ModeSelectBar = ({
  isSubmitting,
  signupMode,
  showStep2,
  setSignupMode,
  setShowStep2,
  clearErrorMessages
}) => (
    <div className="px-6 pt-6">
      <div className="main_border_color flex w-full items-start justify-start space-x-6 border-b text-sm font-semibold">
        <button
          type="button"
          aria-label="Login"
          disabled={isSubmitting}
          onClick={() => {
            setShowStep2(false)
            clearErrorMessages()
            setSignupMode(false)
          }}
          className="whitespace-nowrap"
        >
          Log in
          <div
            style={{ opacity: signupMode ? 0 : 1 }}
            className="pointer-events-none relative mt-1.5 h-0.5 w-full bg-accent-main"
          />
        </button>
        <button
          type="button"
          aria-label="Signup"
          disabled={isSubmitting}
          onClick={() => {
            setShowStep2(false)
            clearErrorMessages()
            setSignupMode(true)
          }}
          className="whitespace-nowrap"
        >
          Sign up
          <div
            style={{ opacity: signupMode ? 1 : 0 }}
            className="pointer-events-none relative mt-1.5 h-0.5 w-full bg-accent-main"
          />
        </button>
        <div
          className={`${
            !signupMode && 'hidden'
          } mt-2 w-full text-end text-xs font-normal`}
        >
          Step {showStep2 ? '2' : '1'} of 2
        </div>
      </div>
    </div>
  )

export default ModeSelectBar
