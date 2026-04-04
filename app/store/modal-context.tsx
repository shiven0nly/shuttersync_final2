'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type ModalType = 'LOGIN' | 'SUCCESS' | 'ERROR' | 'NONE';

interface ModalState {
  type: ModalType;
  title?: string;
  message?: string;
  isOpen: boolean;
  onConfirm?: () => void;
}

type ModalAction = 
  | { type: 'OPEN_MODAL'; payload: Omit<ModalState, 'isOpen'> }
  | { type: 'CLOSE_MODAL' };

const initialState: ModalState = {
  type: 'NONE',
  isOpen: false,
};

const ModalContext = createContext<{
  state: ModalState;
  dispatch: React.Dispatch<ModalAction>;
} | undefined>(undefined);

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...action.payload, isOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
