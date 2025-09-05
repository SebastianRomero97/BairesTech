import LoginForm from '@/components/forms/LoginForms'
import {H1} from '../../components/typography'



export default function Landing () {

    return (
    <div className="bg-custom-wihte">
    <H1 className="text-3xl font-semibold text-black">Lo mejor para vos, en BairesTech hoy!</H1>
    <LoginForm></LoginForm>
    </div>
    )
}