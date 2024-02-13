import { XLg } from 'react-bootstrap-icons'

const ModalTitleBar = ({
  signupMode,
  clearErrorMessages,
  setShowStep2,
  closeLoginModal
}) => (
  <div className="flex flex-col p-2">
    <div className="flex items-center pl-3">
      <h3 className="w-full pl-10 pt-4 text-center text-2xl font-semibold leading-6 text-neutral-900">
        {signupMode ? 'Create an account' : 'Log in'}
      </h3>
      <button
        type="button"
        aria-label="Close"
        className="box_radius flex h-10 w-10 flex-shrink-0 items-center justify-center hover:bg-neutral-100"
        onClick={() => {
          clearErrorMessages()
          setShowStep2(false)
          closeLoginModal()
        }}
      >
        <XLg />
      </button>
    </div>
    {/* <p className="mt-3 px-3 text-center text-sm">
      Enter your email below to create your account
    </p> */}
  </div>
)

export default ModalTitleBar
