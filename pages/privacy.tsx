import type {NextPage} from 'next'
import React from "react";
import styles from "../styles/Privacy.module.scss"

const Privacy: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1>Política de Privacidade</h1>
            <p>O aplicativo da Primeira Igreja Batista de Pará de Minas é projetado para ser usado por pessoas com idade
                igual ou superior a 13 anos. Esta política de privacidade descreve como coletamos, usamos e divulgamos
                informações pessoais no contexto do uso do aplicativo.</p>

            <h2>Coleta de Informações Pessoais</h2>
            <p>Este aplicativo não coleta informações pessoais dos usuários. Nós respeitamos a privacidade dos nossos
                usuários e não coletamos informações desnecessárias ou irrelevantes para o propósito do aplicativo.</p>

            <h2>Uso de Informações Pessoais</h2>
            <p>Como não coletamos informações pessoais dos usuários, não as usamos para qualquer finalidade.</p>

            <h2>Divulgação de Informações Pessoais</h2>
            <p>Não há divulgação de informações pessoais, já que não as coletamos.</p>

            <h2>Segurança de Informações Pessoais</h2>
            <p>Embora não coletemos informações pessoais, adotamos medidas de segurança para proteger quaisquer
                informações que possam ser fornecidas pelos usuários do aplicativo.</p>

            <h2>Atualizações da Política de Privacidade</h2>
            <p>Podemos atualizar esta política de privacidade de tempos em tempos. Se fizermos alterações
                significativas, informaremos os usuários por meio de notificações dentro do aplicativo ou por
                e-mail.</p>

            <h2>Contato</h2>
            <p>Se você tiver alguma dúvida ou preocupação sobre esta política de privacidade ou sobre nossas práticas de
                coleta e uso de informações pessoais, entre em contato conosco através do endereço de e-mail fornecido
                no aplicativo.</p>
        </div>
    )
}


export default Privacy
