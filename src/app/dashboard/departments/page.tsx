'use client';
import { Card } from "@/components/ui/card";
import FormCreateDepartment from "./components/formCreateDepartment";
import SeeDepartments from "./components/seeDepartments";
import { DepartmentProvider } from "@/providers/departmentContetx";

const Department = () => {
    return (
        <div className="p-5 flex flex-col gap-5 max-w-screen-xl mx-auto w-full">
            <DepartmentProvider>
                <Card className="p-5">
                    <FormCreateDepartment />
                </Card>
                <Card className="p-5">
                    Departamentos
                    <SeeDepartments />
                </Card>
            </DepartmentProvider>
        </div>
    );
}

export default Department;