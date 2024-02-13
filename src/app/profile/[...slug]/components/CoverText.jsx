const CoverText = ({ text = '' }) => {
  const repeatedText = text ? text.repeat(30) : ''
  return (
    <div className="-mt-28 -rotate-12">
      <div className="cover_text opacity-[.03]">{repeatedText}</div>
      <div className="cover_text opacity-[.06]">{repeatedText}</div>
      <div className="cover_text opacity-[.09]">{repeatedText}</div>
      <div className="cover_text opacity-[.12]">{repeatedText}</div>
      <div className="cover_text opacity-[.15]">{repeatedText}</div>
      <div className="cover_text opacity-[.18]">{repeatedText}</div>
      <div className="cover_text opacity-[.21]">{repeatedText}</div>
      <div className="cover_text opacity-[.18]">{repeatedText}</div>
      <div className="cover_text opacity-[.15]">{repeatedText}</div>
      <div className="cover_text opacity-[.12]">{repeatedText}</div>
      <div className="cover_text opacity-[.09]">{repeatedText}</div>
      <div className="cover_text opacity-[.06]">{repeatedText}</div>
      <div className="cover_text opacity-[.03]">{repeatedText}</div>
    </div>
  )
}

export default CoverText
