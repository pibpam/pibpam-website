import { ApiLocal } from "./apiLocal";
import { loginWithFirebaseEmail, loginWithGooglePopup } from "./firebaseClient";
import { clearToken, saveToken } from "../utils/LocalStorage";

const getFriendlyFirebaseError = (errorCode?: string) => {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha invalidos.";
    case "auth/popup-closed-by-user":
      return "Login com Google cancelado.";
    case "auth/network-request-failed":
      return "Falha de conexao. Tente novamente.";
    default:
      return "Nao foi possivel autenticar. Tente novamente.";
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

    throw new Error(getApiError(error, "Nao foi possivel concluir o login."));
  }
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  const api = new ApiLocal();

  try {
    await api.createAccount({ name, email, password });
  } catch (error: any) {
    throw new Error(getApiError(error, "Nao foi possivel criar sua conta."));
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

    throw new Error(getApiError(error, "Nao foi possivel concluir o login com Google."));
  }
};

export const logoutUser = () => {
  clearToken();
};
