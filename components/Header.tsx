
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 text-center border-b border-fuchsia-500/30 shadow-[0_5px_15px_-5px_rgba(217,70,239,0.2)]">
      <h1 className="text-3xl font-bold text-fuchsia-400" style={{ textShadow: '0 0 5px #d946ef, 0 0 10px #d946ef' }}>
        AgentiCore
      </h1>
      <p className="text-sm text-cyan-400/80">Your Advanced AI Agent Interface</p>
    </header>
  );
};

export default Header;
