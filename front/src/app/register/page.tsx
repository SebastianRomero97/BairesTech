import RegisterForm from "@/components/forms/RegisterForms";
import { H3 } from "@/components/Ui/typography";

function RegisterPage() {
    return(
        <div>
         <H3 className="text-2xl font-bold">Registrate para inicar sesion</H3>
        <RegisterForm  />
        </div>
    )
}
export default RegisterPage;