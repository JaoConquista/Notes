import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const succesNotify = () => toast.success("Conta Criada !")
export const welcomeNotify = () => toast.success("Bem vindo !")
export const errorEmail = () => toast.error("Email não encontrado :(")
export const errorPassword = () => toast.error("Senha incorreta :(")