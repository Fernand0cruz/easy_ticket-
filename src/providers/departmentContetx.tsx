import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { Department } from '@prisma/client';

// Definindo o tipo do contexto
interface DepartmentContextType {
    // Departamento atual ou nulo
    currentDepartment: Department | null; 
    // Função para atualizar o departamento atual
    setCurrentDepartment: Dispatch<SetStateAction<Department | null>>; 
}

// Criando o contexto do departamento
const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

// Provedor de contexto do departamento
export const DepartmentProvider = ({ children }: { children: ReactNode }) => {
    // Estado do departamento atual
    const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null); 
    
    return (
        <DepartmentContext.Provider value={{ currentDepartment, setCurrentDepartment }}>
            {children}
        </DepartmentContext.Provider>
    );
};

// Hook personalizado para acessar o contexto do departamento
export const useDepartment = () => {
    // Obtendo o contexto do departamento
    const context = useContext(DepartmentContext); 
    if (!context) {
        // Lança um erro se o contexto não estiver definido
        throw new Error('useDepartment deve ser utilizado dentro de um DepartmentProvider'); 
    }
    return context; 
};
