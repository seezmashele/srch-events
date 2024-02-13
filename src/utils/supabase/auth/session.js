import supabase from '../../config/supabase'

export const signInWithEmail = async (email, passwd) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: passwd
    })
    if (error) return error
    return { success: true, data }
  } catch (error) {
    return error
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) return error
  return { success: true }
}

export const signUpNewUser = async (
  email,
  passwd,
  username,
  displayName,
  dateOfBirth
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: passwd,
    options: {
      data: {
        username,
        display_name: displayName,
        date_of_birth: dateOfBirth
      }
    }
  })
  if (error) return error
  return { success: true, data }
}
