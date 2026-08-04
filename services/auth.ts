import { ApiLocal } from "./apiLocal";
import {
  loginWithFirebaseEmail,
  loginWithGooglePopup,
  sendFirebasePasswordReset,
  signOutFirebase,
} from "./firebaseClient";
import { clearToken, saveToken } from "../utils/LocalStorage";

const getFriendlyFirebaseError = (errorCode?: string) => {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha inválidos.";
    case "auth/popup-closed-by-user":
      return "Login com Google cancelado.";
    case "auth/network-request-failed":
      return "Falha de conexão. Tente novamente.";
    default:
      return "Não foi possível autenticar. Tente novamente.";
  }
};

const getApiError = (error: any, fallback: string) => {
  const message = error?.response?.data?.message;
  if (typeof message === "string" && message.length) {
    return message;
  }
  return fallback;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const credential = await loginWithFirebaseEmail(email, password);
    const idToken = await credential.user.getIdToken();

    const api = new ApiLocal();
    const response = await api.authByIdToken(idToken);

    saveToken(response.accessToken);
    return response.accessToken;
  } catch (error: any) {
    if (error?.code) {
      throw new Error(getFriendlyFirebaseError(error.code));
    }

    throw new Error(getApiError(error, "Não foi possível concluir o login."));
  }
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  const api = new ApiLocal();

  try {
    await api.createAccount({ name, email, password });
  } catch (error: any) {
    throw new Error(getApiError(error, "Não foi possível criar sua conta."));
  }

  return loginWithEmailAndPassword(email, password);
};

export const loginWithGoogle = async () => {
  try {
    const credential = await loginWithGooglePopup();
    const idToken = await credential.user.getIdToken();

    const api = new ApiLocal();
    const response = await api.authWithThirdParty({
      idToken,
      provider: "google",
    });

    saveToken(response.accessToken);
    return response.accessToken;
  } catch (error: any) {
    if (error?.code) {
      throw new Error(getFriendlyFirebaseError(error.code));
    }

    throw new Error(getApiError(error, "Não foi possível concluir o login com Google."));
  }
};

export const logoutUser = () => {
  clearToken();
  // Sem sessão Firebase ativa (ex.: token recebido do app nativo via deep
  // link), signOut rejeita — não deve impedir o logout do accessToken local.
  signOutFirebase().catch(() => {});
};

// Troca o idToken atual do Firebase (já renovado por ele, via refresh
// token) pelo accessToken do backend, mantendo a sessão sem novo login.
export const refreshAccessTokenFromFirebase = async (idToken: string) => {
  const api = new ApiLocal();
  const response = await api.authByIdToken(idToken);

  saveToken(response.accessToken);
  return response.accessToken;
};

export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendFirebasePasswordReset(email);
  } catch (error: any) {
    if (error?.code) {
      throw new Error(getFriendlyFirebaseError(error.code));
    }
    throw new Error("Não foi possível enviar o e-mail de recuperação. Tente novamente.");
  }
};
