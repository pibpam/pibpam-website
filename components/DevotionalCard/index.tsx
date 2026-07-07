import React from "react";
import {IDevotinal} from "../../interfaces/Devotinal";
import {DateUtils} from "../../utils/Date";
import { Backdrop, Container, Content, TagDate, Thumb } from "./styles";

interface IDevotionalCard {
    onClick: () => void
    devotional: IDevotinal
}

const DevotionalCard: React.FC<IDevotionalCard> = ({onClick, devotional}) => {
    return (
        <Container onClick={onClick}>
            <TagDate>
                {DateUtils.formatDateDefault(devotional.contentDate)}
            </TagDate>
            <Thumb>
                <Content>
                    <p>{devotional.title}</p>
                    {devotional?.author && (
                        <p>{devotional.author.name}</p>
                    )}
                </Content>

                <Backdrop style={{background: "url('" + devotional.image + "') center/cover"}}/>
            </Thumb>
        </Container>
    )
}

export default DevotionalCard
