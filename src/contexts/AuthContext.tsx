import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  sendPhoneOTP: (
    phoneNumber: string,
    recaptchaVerifier: RecaptchaVerifier,
  ) => Promise<ConfirmationResult>;
  verifyPhoneOTP: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (oobCode: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only setup auth listener if Firebase is properly initialized
    if (auth && typeof onAuthStateChanged === 'function') {
      try {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.warn("Auth state listener not available:", error);
        setLoading(false);
      }
    } else {
      // Firebase not initialized, continue without auth
      setLoading(false);
    }
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    if (!auth) throw new Error("Authentication not available");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async (email: string, password: string) => {
    if (!auth) throw new Error("Authentication not available");
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const sendPhoneOTP = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
    if (!auth) throw new Error("Authentication not available");
    return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const verifyPhoneOTP = async (confirmationResult: ConfirmationResult, otp: string) => {
    if (!confirmationResult) throw new Error("Invalid confirmation result");
    await confirmationResult.confirm(otp);
  };

  const sendPasswordReset = async (email: string) => {
    if (!auth) throw new Error("Authentication not available");
    await sendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = async (oobCode: string, newPassword: string) => {
    if (!auth) throw new Error("Authentication not available");
    // Use imported function with different name to avoid collision
    const { confirmPasswordReset: firebaseConfirmPasswordReset } = await import("firebase/auth");
    await firebaseConfirmPasswordReset(auth, oobCode, newPassword);
  };

  const logout = async () => {
    if (!auth) throw new Error("Authentication not available");
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    sendPhoneOTP,
    verifyPhoneOTP,
    sendPasswordReset,
    confirmPasswordReset,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
