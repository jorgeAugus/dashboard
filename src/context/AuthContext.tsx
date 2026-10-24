import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  switchDemoRole: (role: UserProfile['role']) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  userId: 'usr_brand_lead_pe',
  email: 'retail@kajel.pe',
  displayName: 'Brand Manager',
  role: 'Brand Manager',
  region: 'Perú Retail',
  assignedCampaign: 'Kajel Perú - Campaña Primavera / Flores Amarillas',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXpUnsIRItTquH23ywd23_xs9kdclB_-IjEuD48aFcHp0PqhorJkHLBY7XNHnnfKoq2YmAzJrRzDCW8AS-Z2zzdva7Nlilld_R9YDHe_8QFlA8bbApQ1QCKvhhFzyEVkEXiWEwNDkWzGPbBc4_q6cyMLPrR2i5Voxso9KRTIUfvV9Bme-O3tvM6u5sxBEfFRFKd7n4mGa13Sn4ahwHO_AofIKRhfCLWLpQLzUaC7dyzWvMCWRAcNv9MQ',
  notificationsEnabled: true,
  team: 'E-commerce & Growth Ops Lima',
  phone: '+51 987 654 321',
  updatedAt: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check saved local profile for persistence
    const saved = localStorage.getItem('kajel_active_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cached profile:', e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            setProfile(data);
            localStorage.setItem('kajel_active_profile', JSON.stringify(data));
          } else {
            // Seed new profile from Firebase auth
            const newProfile: UserProfile = {
              userId: firebaseUser.uid,
              email: firebaseUser.email || 'retail@kajel.pe',
              displayName: firebaseUser.displayName || 'Kajel Bloom Operator',
              role: 'Brand Manager',
              region: 'Perú Retail',
              assignedCampaign: 'Kajel Perú - Campaña Primavera / Flores Amarillas',
              avatarUrl: firebaseUser.photoURL || DEFAULT_PROFILE.avatarUrl,
              notificationsEnabled: true,
              team: 'Operaciones Retail Lima',
              updatedAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
            localStorage.setItem('kajel_active_profile', JSON.stringify(newProfile));
          }
        } catch (err) {
          console.warn('Firestore user fetch note:', err);
          // Keep active profile
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        const userDocRef = doc(db, 'users', res.user.uid);
        const newProf: UserProfile = {
          userId: res.user.uid,
          email: res.user.email || 'retail@kajel.pe',
          displayName: res.user.displayName || 'Brand Specialist',
          role: profile.role || 'Brand Manager',
          region: 'Perú Retail',
          assignedCampaign: 'Kajel Perú - Campaña Primavera / Flores Amarillas',
          avatarUrl: res.user.photoURL || DEFAULT_PROFILE.avatarUrl,
          notificationsEnabled: true,
          updatedAt: new Date().toISOString()
        };
        try {
          await setDoc(userDocRef, newProf, { merge: true });
        } catch (dbErr) {
          handleFirestoreError(dbErr, OperationType.WRITE, `users/${res.user.uid}`);
        }
        setProfile(newProf);
        localStorage.setItem('kajel_active_profile', JSON.stringify(newProf));
      }
    } catch (error) {
      console.warn('Google Popup interaction note:', error);
      // Fallback stays active for user
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    const updated = {
      ...profile,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setProfile(updated);
    localStorage.setItem('kajel_active_profile', JSON.stringify(updated));

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, updates as any);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
    }
  };

  const switchDemoRole = (role: UserProfile['role']) => {
    const avatars: Record<UserProfile['role'], string> = {
      'Brand Manager': DEFAULT_PROFILE.avatarUrl,
      'Community Lead': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtfcPoh6_iI3XYsIqUPvyszC63LafU5xZ4vuFTnO645GS2H4wgZ3HijBApYl9NkLebg0xVwQrk3tmQYD46Emq5-OAkBvrjiYSdspDsf813znZ-CA1AUl5Ee7C7iy6p5NyK8_adVvdYrunKuwnyPwKXIoKeSV_l7aZVU_flYU4Na1chPID6IglaG8JdFQj_Ew5GtCMiu-niJ-hyJjPR8_DVNdlMNBmwJMkdUY4OQsPotydRkhoBMW7hwQ',
      'Operations Lead': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBclQifSvSd1CYS9vlOY-5AN2X5NpuXO8ChqcvAjcoTZ8d4sX3-ZJtb7dXd7if7PN5Yl8N4dfN1gZFz7eVReVdmb_XOmq4EkEruZRIlt0W4IvCix8z3h0945_JP7bKB0uN_dvuaTW4Q8RdUGF124zKEzp41t0mpgU4YwEmrav_NYHytw4kHwHtd2ehdnvQtkQpr_B7pEPFwErrRhfuWs8vkvy4hBv-6TTDQ2g0Ytp27kGeWeTRAS-EdrA',
      'Content Creator': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs10ew7_fQ2xi3TQm8zn-RwoID2hgHvhHM3t2hvueqApDQtScRWT3fYV30ZQNz0Kn-7CDRL0Gut6nftjKm-R36yfYz5ECMQprSmyqVXc7Yk4Ewxfa4z5UClsrGiL-ZHIuhUUpXSIcB4iyVgHgoLer_gwJdWt1s3kNvxE6qN2mCCfHnL1TxIgNotcB_gIOfJ_kTktViwHJW-RPYmLGQHOlkmeDF41ydLobG7_tOv87cXW506qV36mzv1Q',
      'Growth Strategist': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0skp6MzjdQrhmsjVlsCn610PZ1D3PeTDAdEzHBlbwy6Y-M3Mx402rdLNwWINsApdeV2k7MY_dPiVjirEmkm7ad2muhHO2V1OCZDOXV37dPqp_94EF4tEyL5hQrr2xIaObN63JjltLFx_KywK6vXoTDby454kKTAiNdFZIqldEysnalY-YaM0xk8I6kcQw8IB771A10geQs8pHdl37FjFIYEMQ-RYbXcNm-G_pWizaYZ8fzXbxItljHw'
    };

    updateUserProfile({
      role,
      displayName: `${role} (${role === 'Brand Manager' ? 'Diego V.' : role === 'Operations Lead' ? 'Rodrigo P.' : 'Camila R.'})`,
      avatarUrl: avatars[role] || DEFAULT_PROFILE.avatarUrl
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signOutUser,
        updateUserProfile,
        switchDemoRole,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
