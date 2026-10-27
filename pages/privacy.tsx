import type {NextPage} from 'next'
import React from "react";
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import Reveal from "../components/Reveal";

const Privacy: NextPage = () => {
    return (
        <Website title={"Política de Privacidade"} hasTabNavigator={false}>
            <>
                <AppHeader title="Privacidade" />
                <Container className="pt-6 pb-16">
                    <Reveal className="mx-auto max-w-[700px]">
                        <h1 className="text-3xl font-extrabold tracking-tight text-balance">Política de Privacidade</h1>
            <p className="mt-3 leading-relaxed text-ink-muted">O aplicativo da Primeira Igreja Batista de Pará de Minas é projetado para ser usado por pessoas com idade
                igual ou superior a 13 anos. Esta política de privacidade descreve como coletamos, usamos e divulgamos
                informações pessoais no contexto do uso do aplicativo.</p>

            <h2 className="mt-8 text-xl font-extrabold tracking-tight">Coleta de Informações Pessoais</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">Este aplicativo não coleta informações pessoais dos usuários. Nós respeitamos a privacidade dos nossos
                usuários e não coletamos informações desnecessárias ou irrelevantes para o propósito do aplicativo.</p>

            <h2 className="mt-8 text-xl font-extrabold tracking-tight">Uso de Informações Pessoais</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">Como não coletamos informações pessoais dos usuários, não as usamos para qualquer finalidade.</p>

            <h2 className="mt-8 text-xl font-extrabold tracking-tight">Divulgação de Informações Pessoais</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">Não há divulgação de informações pessoais, já que não as coletamos.</p>

            <h2 className="mt-8 text-xl font-extrabold tracking-tight">Segurança de Informações Pessoais</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">Embora não coletemos informações pessoais, adotamos medidas de segurança para proteger quaisquer
                informações que possam ser fornecidas pelos usuários do aplicativo.</p>

            <h2 className="mt-8 text-xl font-extrabold tracking-tight">Atualizações da Política de Privacidade</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">Podemos atualizar esta política de privacidade de tempos em tempos. Se fizermos alterações
                significativas, informaremos os usuários por meio de notificações dentro do aplicativo ou por
                e-mail.</p>

            <h2 className="mt-8 text-xl font-extrabold tracking-tight">Contato</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">Se você tiver alguma dúvida ou preocupação sobre esta política de privacidade ou sobre nossas práticas de
                coleta e uso de informações pessoais, entre em contato conosco através do endereço de e-mail fornecido
                no aplicativo.</p>
                    </Reveal>
                </Container>
            </>
        </Website>
    )
}


export default Privacy
