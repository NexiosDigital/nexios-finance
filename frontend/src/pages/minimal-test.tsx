import React from 'react';

export default function MinimalTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste Mínimo do Tailwind</h1>
      
      <div className="flex flex-col space-y-4">
        <div className="p-4 rounded border">Card Básico</div>
        
        <div className="p-4 rounded bg-gradient-primary text-white">
          Gradient Card
        </div>
        
        <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: '#0EAE7B' }}>
          Botão com Estilo Inline
        </button>
      </div>
    </div>
  );
}