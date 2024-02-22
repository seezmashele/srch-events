import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'

const FormSubmitButtons = ({
  signupMode,
  showStep2,
  submitLogin,
  submitSignup,
  isSubmitting,
  setShowStep2,
  step1IsValid,
  step2IsValid,
  showMissingStep1Values,
  showMissingStep2Values
}) => (
  <div className="mt-6 flex w-full justify-end">
    {signupMode ? (
      <>
        <button
          type="button"
          aria-label="Login or sign up"
          disabled={!showStep2}
          onClick={() => {
            setShowStep2(false)
          }}
          className={`${
            showStep2
              ? 'bg-neutral-200 text-neutral-900'
              : 'pointer-events-none bg-neutral-100 text-neutral-300'
          } input_button_styles mr-2 flex items-center hover:bg-neutral-300 `}
        >
          <ArrowLeft className="mr-2.5" />
          Back
        </button>
        <button
          type="button"
          aria-label="Login or sign up"
          disabled={isSubmitting}
          onClick={(e) => {
            if (showStep2) {
              showMissingStep2Values()
              if (step2IsValid()) submitSignup(e)
            } else {
              showMissingStep1Values()
              if (step1IsValid()) setShowStep2(true)
            }
          }}
          className="button_colors--filled input_button_styles flex w-full items-center justify-center text-center"
        >
          {showStep2 ? 'Sign up' : 'Next step'}
          <ArrowRight className={`${showStep2 && 'hidden'} ml-2.5`} />
        </button>
      </>
    ) : (
      <button
        type="button"
        aria-label="Login or sign up"
        disabled={isSubmitting}
        className="button_colors--filled input_button_styles w-full"
        onClick={() => {
          showMissingStep1Values()
          if (step1IsValid()) submitLogin()
        }}
      >
        Log in
      </button>
    )}
  </div>
)

export default FormSubmitButtons
