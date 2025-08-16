import React, { useState } from 'react';
import styles from './SearchModal.module.scss';
import { fetchCep, ViaCepResponse } from '../hooks/useCep';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddressFound?: (addr: Partial<ViaCepResponse>) => void;
};

export default function SearchModal({ isOpen, onClose, onAddressFound }: Props) {
  const [cepInput, setCepInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<Partial<ViaCepResponse> | null>(null);

  function normalizeCep(value: string) {
    return value.replace(/\D/g, '');
  }

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);

    const cep = normalizeCep(cepInput);
    if (cep.length !== 8) {
      setError('CEP deve ter 8 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchCep(cep);
      const addr: Partial<ViaCepResponse> = {
        logradouro: data.logradouro || '',
        complemento: data.complemento || '',
        bairro: data.bairro || '',
        uf: data.uf || '',
        localidade: data.localidade || '',
      };
      setAddress(addr);
      onAddressFound?.(addr);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao consultar ViaCEP.');
      }
      setAddress(null);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Pesquisar CEP</h2>
          <button onClick={onClose} aria-label="Fechar" className={styles.close}>✕</button>
        </header>

        <form onSubmit={handleSearch} className={styles.form}>
          <label className={styles.label}>
            CEP
            <input
              value={cepInput}
              onChange={(e) => setCepInput(e.target.value)}
              placeholder="Ex: 03323-000 ou 03323000"
              className={styles.input}
            />
          </label>

          <div className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.btnPrimary}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button
              type="button"
              onClick={() => {
                setCepInput('');
                setAddress(null);
                setError(null);
              }}
              className={styles.btn}
            >
              Limpar
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          {address && (
            <div className={styles.grid}>
              <div>
                <label className={styles.smallLabel}>Logradouro</label>
                <input value={address.logradouro || ''} disabled className={styles.disabledInput} />
              </div>
              <div>
                <label className={styles.smallLabel}>Complemento</label>
                <input value={address.complemento || ''} disabled className={styles.disabledInput} />
              </div>
              <div>
                <label className={styles.smallLabel}>Bairro</label>
                <input value={address.bairro || ''} disabled className={styles.disabledInput} />
              </div>
              <div>
                <label className={styles.smallLabel}>UF</label>
                <input value={address.uf || ''} disabled className={styles.disabledInput} />
              </div>
              <div className={styles.full}>
                <label className={styles.smallLabel}>Cidade / Estado</label>
                <input
                  value={`${address.localidade || ''}${address.uf ? ` - ${address.uf}` : ''}`}
                  disabled
                  className={styles.disabledInput}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
