// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import SearchModal from './components/SearchModal';
import styles from './App.module.scss';
import { ViaCepResponse } from './hooks/useCep';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<Partial<ViaCepResponse> | null>(null);

  return (
    <div className={styles.app}>
      <Header onOpenSearch={() => setIsOpen(true)} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Digital Solution</h1>
          <p>Implementação simplificada para o teste Noweb</p>
        </section>

        {address && (
          <section className={styles.selected}>
            <h2>Endereço selecionado</h2>
            <pre>{JSON.stringify(address, null, 2)}</pre>
          </section>
        )}
      </main>

      <SearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddressFound={(addr) => {
          setAddress(addr);
        }}
      />
    </div>
  );
}
