import { FirebaseError } from "firebase/app";
import { ActionCodeInfo, EmailAuthProvider, MultiFactorError, User, applyActionCode, checkActionCode, confirmPasswordReset, getAuth, getMultiFactorResolver, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth";
import { Notifiable } from "../errors/Notifiable";
import { logger } from "./logger";
import { LoggerError } from "../errors/LoggerError";
import { MfaRequired } from "../errors/MfaRequired";


export const updateUserProfile = async (user: User, name: string) => {
  try {
    await updateProfile(user, { displayName: name })
  } catch (error) {
    throw new Notifiable({ message: "Não foi possível salvar os seus dados." })
  }
}

export const sendPasswordRecoveryEmail = async (email: string) => {
  const auth = getAuth();

  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    if (error instanceof FirebaseError) {
      logger(error.code)

      const errors = {
        "auth/invalid-credential": "Credenciais inválidas",
        "auth/too-many-requests": "Você solicitou muitos envios para recuperação de senha! Aguarde alguns instantes."
      } as Record<string, string>

      throw new Notifiable({ message: errors[error.code] || "Ocorreu um erro ao enviar o e-mail para recuperação da sua senha. Tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Ocorreu um erro ao enviar o e-mail para recuperação da sua senha. Tente novamente." })
  }
}

export const checkActionCodeApp = async (oobCode: string): Promise<ActionCodeInfo> => {
  const auth = getAuth();

  try {
    const data = await checkActionCode(auth, oobCode)
    return data
  } catch (error) {
    if (error instanceof FirebaseError) {
      logger(error.code)

      const errors = {
        'auth/invalid-action-code': 'Link de verificação é inválido ou já foi utilizado!',
        'auth/expired-action-code': 'O seu link de verificação expirou!'
      } as Record<string, string>
      throw new Notifiable({ message: errors[error.code] || "Ocorreu um erro verificar a sua conta. Tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Ocorreu um erro verificar a sua conta. Tente novamente." })
  }
}

export const applyActionCodeAccount = async (oobCode: string) => {
  const auth = getAuth();

  try {
    await applyActionCode(auth, oobCode)
  } catch (error) {
    if (error instanceof FirebaseError) {
      logger(error.code)

      const errors = {
        'auth/invalid-action-code': 'Link de recuperação é inválido ou já foi utilizado!',
        'auth/expired-action-code': 'O seu link de recuperação expirou!'
      } as Record<string, string>
      throw new Notifiable({ message: errors[error.code] || "Ocorreu um erro ao enviar o e-mail para recuperação da sua senha. Tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Ocorreu um erro ao enviar o e-mail para recuperação da sua senha. Tente novamente." })
  }
}

export const sendEmailVerificationAccount = async (user: User) => {
  try {
    await sendEmailVerification(user)
  } catch (error) {
    if (error instanceof FirebaseError) {
      logger(error.code)

      const errors = {
        "auth/too-many-requests": "Você solicitou o envio de muitos e-mails. Aguarde alguns instantes ou verifique o seu e-mail."
      } as Record<string, string>
      throw new Notifiable({ message: errors[error.code] || "Ocorreu um erro ao enviar o e-mail para ativar a sua conta. Tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Ocorreu um erro ao enviar o e-mail para ativar a sua conta. Tente novamente." })
  }
}

export const reauthenticateUser = async (user: User, password: string) => {
  if (!user.email) {
    throw new LoggerError({ message: "User does not have email." })
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)
  } catch (error) {
    if (error instanceof FirebaseError) {
      logger(error.code)

      if (error.code === 'auth/multi-factor-auth-required') {
        const mfaResolver = getMultiFactorResolver(getAuth(), error as MultiFactorError);
        throw new MfaRequired({ multiFactorResolver: mfaResolver })
      }

      const errors = {
        "auth/invalid-credential": "Credenciais inválidas",
        "auth/too-many-requests": "Opção temporariamente suspensa. Tente novamente mais tarde."
      } as Record<string, string>

      throw new Notifiable({ message: errors[error.code] || "Não foi possível reautenticar o usuário. Tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Não foi possível reautenticar o usuário. Tente novamente." })
  }

}

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return data.user

  } catch (error) {
    if (error instanceof FirebaseError) {
      logger(error.code)

      if (error.code === 'auth/multi-factor-auth-required') {
        const mfaResolver = getMultiFactorResolver(getAuth(), error as MultiFactorError);
        throw new MfaRequired({ multiFactorResolver: mfaResolver })
      }

      const errors = {
        "auth/invalid-credential": "Credenciais inválidas",
        "auth/too-many-requests": "Seu login está temporariamente suspenso. Tente novamente mais tarde ou utilize o recurso de recuperação de senha."
      } as Record<string, string>

      throw new Notifiable({ message: errors[error.code] || "Ocorreu um erro ao realizar o seu login. Tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Ocorreu um erro ao realizar o seu login. Tente novamente." })
  }
}

export const resetPassword = async (user: User, newPassword: string) => {
  if (!user.email) {
    throw new LoggerError({ message: "User does not have email." })
  }

  try {
    await updatePassword(user, newPassword)
  } catch (error) {

    if (error instanceof FirebaseError) {
      logger(error.code)

      const errorsMessage = {
        "auth/invalid-credential": "A senha atual informada, está incorreta.",
        "auth/timeout": "Ocorreu um erro ao alterar a sua senha, tente novamente.",
        "auth/weak-password": "A senha informada não cumpre os requisitos mínimos de segurança.",
        "auth/too-many-requests": "Ação bloqueada. Tente novamente mais tarde ou utilize o recurso de recuperação de senha."
      } as Record<string, string>

      throw new Notifiable({ message: errorsMessage[error.code] || "Não conseguimos alterar a sua senha. Verifique os dados e tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Não conseguimos alterar a sua senha. Verifique os dados e tente novamente." })
  }
}

export const finishPasswordReset = async (oobCode: string, newPassword: string) => {

  try {
    const auth = getAuth();
    const data = await confirmPasswordReset(auth, oobCode, newPassword)
    return data
  } catch (error) {

    if (error instanceof FirebaseError) {
      logger(error.code)

      const errorsMessage = {
        "auth/timeout": "Ocorreu um erro ao alterar a sua senha, tente novamente.",
        "auth/weak-password": "A senha informada não cumpre os requisitos mínimos de segurança.",
        "auth/invalid-action-code": "O seu link de recuperação é inválido ou já foi utilizado.",
        'auth/expired-action-code': 'O seu link de recuperação expirou!'
      } as Record<string, string>

      throw new Notifiable({ message: errorsMessage[error.code] || "Não conseguimos alterar a sua senha. Verifique os dados e tente novamente.", code: error.code })
    }

    throw new Notifiable({ message: "Não conseguimos alterar a sua senha. Verifique os dados e tente novamente." })
  }
}

export const signOutUser = async () => {
  const auth = getAuth();
  await signOut(auth)
}

export const getCurrentUser = (): User | null => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user
}