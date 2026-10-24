import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    user, 
    profile, 
    isAuthModalOpen, 
    closeAuthModal, 
    signInWithGoogle, 
    signOutUser, 
    updateUserProfile,
    switchDemoRole,
    loading 
  } = useAuth();
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    displayName: profile.displayName || '',
    role: profile.role,
    region: profile.region || 'Perú Retail',
    phone: profile.phone || '+51 987 654 321',
    notificationsEnabled: profile.notificationsEnabled
  });

  if (!isAuthModalOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile(formData);
    showToast('Perfil de usuario actualizado en Firebase');
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#171f33] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#131b2e] border-b border-[#222a3d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">manage_accounts</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#dae2fd]">Gestión de Perfil & Firebase Auth</h3>
              <p className="text-xs text-[#d8c3ad]">Control de accesos y credenciales de usuario</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1 rounded-lg text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Auth Status Card */}
          <div className="p-4 rounded-xl bg-[#060e20] border border-[#222a3d] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f59e0b]/50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#dae2fd]">{profile.displayName}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    user ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-[#ffc640]/20 text-[#ffc640]'
                  }`}>
                    {user ? 'Google Firebase OK' : 'Sesión Activa'}
                  </span>
                </div>
                <p className="text-xs text-[#d8c3ad] font-mono">{profile.email}</p>
                <p className="text-[11px] text-[#ffc174] font-medium">{profile.role} • {profile.region}</p>
              </div>
            </div>

            {user ? (
              <button
                type="button"
                onClick={async () => {
                  await signOutUser();
                  showToast('Sesión cerrada');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-rose-900/40 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Cerrar Sesión</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={async () => {
                  await signInWithGoogle();
                  showToast('Autenticado con Google Firebase');
                }}
                disabled={loading}
                className="px-3.5 py-2 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span>Conectar con Google</span>
              </button>
            )}
          </div>

          {/* Quick Persona Switching */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider block">
              Cambiar Rol / Persona de Demostración
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Brand Manager', 'Operations Lead', 'Content Creator', 'Community Lead'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    switchDemoRole(r);
                    setFormData((prev) => ({ ...prev, role: r }));
                    showToast(`Rol cambiado a: ${r}`);
                  }}
                  className={`p-2 rounded-lg text-xs font-medium text-center border transition-all ${
                    profile.role === r
                      ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#ffc640] font-bold'
                      : 'bg-[#131b2e] border-[#222a3d] text-[#dae2fd] hover:bg-[#222a3d]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Edit Form */}
          <form onSubmit={handleSave} className="space-y-4 pt-2 border-t border-[#222a3d]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#d8c3ad] block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div>
                <label className="text-xs text-[#d8c3ad] block mb-1">Teléfono / WhatsApp</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div>
                <label className="text-xs text-[#d8c3ad] block mb-1">Región de Operación</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
                >
                  <option value="Perú Retail">Perú Retail (Nacional)</option>
                  <option value="Lima Metropolitana">Lima Metropolitana</option>
                  <option value="Arequipa & Sur">Arequipa & Sur</option>
                  <option value="La Libertad (Trujillo)">La Libertad (Trujillo)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#d8c3ad] block mb-1">Rol Operativo</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
                >
                  <option value="Brand Manager">Brand Manager</option>
                  <option value="Community Lead">Community Lead</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Operations Lead">Operations Lead</option>
                  <option value="Growth Strategist">Growth Strategist</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#060e20] border border-[#222a3d]">
              <div>
                <span className="text-xs font-semibold text-[#dae2fd] block">Notificaciones en Tiempo Real</span>
                <span className="text-[11px] text-[#d8c3ad]">Alertas de crisis Sentinel y tickets de SLA crítico</span>
              </div>
              <input
                type="checkbox"
                checked={formData.notificationsEnabled}
                onChange={(e) => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
                className="w-4 h-4 accent-[#f59e0b] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeAuthModal}
                className="px-4 py-2 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-medium text-[#dae2fd] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all shadow-md"
              >
                Guardar en Firestore
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
